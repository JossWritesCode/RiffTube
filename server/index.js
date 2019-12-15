const multer = require('multer');
const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
const upload = multer({ storage: multer.memoryStorage() });

const db = require('../data/db.js');
const data_model = require('../data-model.js');

const CLIENT_ID = '941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com';

server.use(express.json());

// might not be needed
server.use(cors());


server.get('/api-status', (req, res) => {
  res.status(200).json({ api: 'up' });
});

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// function to verify the google token
function verify(token) {
  return client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
}

server.post('/load-riff', (req, res) => {
  const body = req.body;
  return (
    db('riffs')
      .select('audio_datum')
      .where({ id: body.id })
      .then(([aud]) => {
        res.status(200).send(aud.audio_datum);
      })
      .catch(err => res.status(500).json({ error: err }))
  );
});

server.post('/set-name', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  console.log( "set name", body );

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log( "SN then", body.newName );

      console.log( payload.email );

      return data_model.getIdAndNameFromEmail(payload.email);
    })
    .then( emailArr => {

      var [{ id: uID }] = emailArr;
      console.log( "SN then again", uID, emailArr );

      let dbpayload = {
        name: body.newName
      };

      db('users')
        .where('id', uID)
        .update(dbpayload)
        .then(() => res.status(200).json({ status: 'ok', name: body.newName }))
    })
    .catch(err => res.status(500).json({ error: err }));
  });

server.post('/get-riffs', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  console.log( "get riffs" );

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log( "GR then 1" );

      console.log( payload.email );

      return Promise.all([
        data_model.getIdAndNameFromEmail(payload.email),
        data_model.getIdFromVideoId(body.videoID)
      ]);
    })
    .then( ([emailArr, vIDArr]) => {
      console.log( "GR then again", emailArr, vIDArr );
      if ( emailArr.length === 0 || vIDArr.length === 0 )
      {
        res.status(200).json({ info: "no riffs yet", body: [] })
      }
      else
      {
        var [{ id: uID, name }] = emailArr;
        var [{ id: vID }] = vIDArr;
        
          console.log( "GR then 2" );

          return db('riffs')
            .select('id', 'user_id', 'video_id', 'duration', 'start_time', 'isText', 'text')
            .where({ user_id: uID, video_id: vID })
            .then(riffList => {

              console.log( "GF then 3" );
          
              res
                .status(200)
                .json({
                  status: 'ok',
                  body: riffList,
                  name
                });
              })
              .catch(err => res.status(500).json({ error: err }));
        }
      })
    });

server.post('/save-riff', upload.single('blob'), (req, res) => {
  const body = req.body;

  console.log( 'verify token' );

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log( "VT then 1" );

      // make sure that the user exists in the db, or else insert them
      // and 
      // make sure that the video exists in the db, or else insert it

      return Promise.all([

        db('users')
          .select()
          .where('email', payload.email)
          .then(userList => {

            console.log( "SR get email", userList );

            if (userList.length === 0) {
              return db('users')
                .insert(
                  {
                    name: 'all are bob',
                    email: payload.email
                  },
                  ['id']
                );
            } else console.log('not inserting user');

            return Promise.resolve( userList[0].id );
          }),

        db('videos')
          .select()
          .where('url', body.video_id)
          .then(vidList => {

            console.log( "SR get vidlist", vidList );

            if (vidList.length === 0) {
              return db('videos')
                .insert(
                  {
                    url: body.video_id
                  },
                  ['id']
                );
            } else console.log('not inserting video');

            return Promise.resolve( vidList[0].id );
          })

      ]);
    })
    // once we know the user and video exist, insert the riff
    /*.then(() => {
      // get the IDs of the user and video, then insert the data
      return Promise.all([data_model.getIdFromEmail(payload.email), data_model.getIdFromVideoId(body.video_id)]);
    })*/
    .then( ([idin, vidid]) => {

      console.log('UID!', idin);
      console.log('VID!', vidid);

      let dbpayload = {
        audio_datum: body.type == 'text' ? null : req.file.buffer,
        text: body.type == 'text' ? body.text : null,
        isText: body.type == 'text',
        start_time: body.start_time,
        duration: body.duration,
        user_id: idin,
        video_id: vidid
      };

      if (body.id === 'undefined') {
        db('riffs')
          .insert(dbpayload, 'id')
          .then(([newRiffId]) =>
            res
              .status(200)
              .json({
                status: 'ok',
                type: 'add',
                tempId: Number( body.tempId ),
                id: newRiffId
              })
          );
      } else {
        db('riffs')
          .where('id', body.id)
          .update(dbpayload)
          .then(() => res.status(200).json({ status: 'ok', type: 'edit' }));
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post('/get-view-riffs', (req, res) => {
  const body = req.body;

  console.log( "get view riffs", body.videoID );

  data_model.getIdFromVideoId(body.videoID)
  .then( ([{id:vID}]) => {

    console.log( vID );

    console.log( "GVR then 1" );

    return db('riffs')
      .join('users', 'riffs.user_id', 'users.id')
      .select('riffs.id', 'riffs.user_id', 'riffs.video_id', 'riffs.duration', 'riffs.start_time', 'riffs.isText', 'riffs.text', 'users.name')
      .where({ video_id: vID });
  })
  .then(riffList =>
  {
    console.log( "GVR then 2" );

    res
      .status(200)
      .json({
        status: 'ok',
        body: riffList.map(el => ({ ...el, video_id: body.videoID }))
      });
  })
  .catch(err => res.status(500).json({ error: err }));
});

server.use(express.static(path.join(__dirname, '../react-ui/build')));
server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../react-ui/build', 'index.html'));
});

module.exports = server;
