const multer  = require('multer');  
const express = require('express');
const cors = require('cors');

const server = express();
const upload  = multer({ storage: multer.memoryStorage() });

const db = require( '../data/db.js' );
const data_model = require( '../data-model.js');

const CLIENT_ID = '941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com';

server.use(express.json());

server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// function to verify the google token
function verify( token )
{
  console.log( "verify" );
  return client.verifyIdToken(
    {
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    }
  );
}

server.post('/get-riffs', (req, res) => {  
  const body = req.body;

  console.log( 'get riffs request', body );

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  verify( body.token )
    // once verified, get and pass on payload
    .then( ticket => {
      const payload = ticket.getPayload();
      console.log( "payday!" );
      console.log( payload );
      return payload;
    } )
    //.then( payload => data_model.getIdFromEmail( payload.email ) )
    .then( payload => Promise.all( [ payload, data_model.getIdFromEmail( payload.email ) ] ) )
    .then( ([payload, [ { id: uID } ] ]) => {
      console.log( "pp", uID );
      return Promise.all( [payload, uID, data_model.getIdFromVideoId( body.videoID )] );
    } )
    .then( ([ payload, uID, [ { id: vID } ] ]) => {
        console.log( "IDs!", vID, uID );
        console.log( "get riff payload", payload );
        return db( 'riffs' )
          .select( 'id' ) // 'id', 'duration', 'start_time' 
          .where( { 'user_id': uID, 'video_id': vID } )
    } )
    .then( riffList  => {
      res.status(200).json({status: 'ok', body: riffList});
    } )
    .catch(err => res.status(500).json({'error': err}) );
} );

server.post('/add-riff', upload.single('blob'), (req, res) => {  
  const body = req.body;
  
  //console.log( 'verify token' );
  console.log( "incoming blob:" );
  console.log( req.file );

  verify( body.token )
    // once verified, get and pass on payload
    .then( ticket => {
      const payload = ticket.getPayload();
      console.log( "payday!" );
      console.log( payload );
      return payload;
    } )
    // make sure that the user exists in the db, or else insert them
    .then( payload => {
      console.log( "then1", payload );
      return db( 'users' )
        .select()
        .where( 'email', payload.email )
        .then( userList  => {
          if ( userList.length === 0 )
          {
            return db( 'users' )
              .insert( {
                name: 'all are bob',
                email: payload.email
              }, 'id' )
              .then( newUserId => {
                console.log( 'inserted user', newUserId );
                return payload;
              } );
          }
          else
            console.log('not inserting user');
          return payload;
        }); } )
    // make sure that the video exists in the db, or else insert it
    .then( payload => {
      console.log( "then2" );
      return db( 'videos' )
        .select()
        .where( 'url', body.video_id )
        .then( vidList  => {
          if ( vidList.length === 0 )
          {
            return db( 'videos' )
              .insert( {
                url: body.video_id
              }, 'id' )
              .then( newVidId => {
                console.log( 'inserted video', newVidId );
                return payload;
              } );
          }
          else
            console.log('not inserting video');
          return payload;
        }); } )
    
    // once we know the user and video exist, insert the riff
    .then( payload => {

      console.log( "EML\n", payload.email );
      console.log( "DAT\n", data_model );
      console.log( "FIL\n", req.file );
      console.log( "BOD\n", body );

      // get the IDs of the user and video, then insert the data
      data_model.getIdFromEmail( payload.email ).then( idin => {
        console.log( "UID!", idin[0].id );

        data_model.getIdFromVideoId( body.video_id ).then( vidid => {
          console.log( "VID!", vidid[0].id );

          db( 'riffs' )
            .insert( {
                'audio_datum': req.file.buffer,
                'duration': body.duration,
                'user_id': idin[0].id,
                'video_id': vidid[0].id,
              }, 'id' )
            .then( newRiffId => res.status(200).json({ status: 'ok', id: newRiffId }) );
          } );
      } );
    } )
    .catch(err => res.status(500).json({'error': err}) );
});

module.exports = server;
