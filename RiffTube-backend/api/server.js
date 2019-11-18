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

server.post('/add-riff', upload.single('blob'), (req, res) => {  
  const body = req.body;
  
  //console.log( 'verify token' );
  console.log( "incoming blob:" );
  console.log( req.file );

  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client(CLIENT_ID);
  async function verify()
  {
    const ticket = await client.verifyIdToken(
      {
        idToken: body.token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      }
    );
    const payload = ticket.getPayload();
    console.log( "payday!");
    console.log( payload );
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    db( 'users' )
      .select()
      .where( 'email', payload.email)
      .then( userList  => {
        if ( userList.length === 0 )
        {
          return db( 'users' )
            .insert( {
              name: 'all are bob',
              email: payload.email
            }, 'id' )
            .then( newUserId =>
              console.log( 'inserted user', newUserId )
            );
        }
        else
          console.log('not inserting user');
        return;
      });

      debugger;
    db( 'riffs' )
      .insert( {
          'audio_datum': req.file,
          'duration': body.duration,
          'user_id': data_model.getIdFromEmail( payload.email ),
          'video_id': 'temp'
        } )
      .then( () => res.status(200).json({'status': 'ok'}) );
  }
  verify().catch(err => res.status(500).json({'error': err}) );
  
  
});

module.exports = server;
