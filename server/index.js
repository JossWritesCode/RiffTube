const multer = require('multer');
const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
const upload = multer({ storage: multer.memoryStorage() });

const db = require('../data/db.js');
const data_model = require('../data-model.js');

const CLIENT_ID =
  '941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com';

server.use(express.json());

// might not be needed
server.use(cors());

server.use(express.static(path.join(__dirname, 'react-ui/build')));
server.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'react-ui/build', 'index.html'));
});


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
  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      const payload = ticket.getPayload();

      return db('riffs')
        .select('audio_datum')
        .where({ id: body.id });
    })
    .then(([aud]) => {
      res.status(200).send(aud.audio_datum);
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post('/get-riffs', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      const payload = ticket.getPayload();

      return payload;
    })
    //.then( payload => data_model.getIdFromEmail( payload.email ) )
    .then(payload =>
      Promise.all([payload, data_model.getIdFromEmail(payload.email)])
    )
    .then(([payload, [{ id: uID }]]) => {
      return Promise.all([
        payload,
        uID,
        data_model.getIdFromVideoId(body.videoID)
      ]);
    })
    .then(([payload, uID, [{ id: vID }]]) => {
      return db('riffs')
        .select('id', 'duration', 'start_time', 'isText', 'text')
        .where({ user_id: uID, video_id: vID });
    })
    .then(riffList => {
      res
        .status(200)
        .json({
          status: 'ok',
          body: riffList.map(el => ({ ...el, video_id: body.videoID }))
        });
    })
    .catch(err => res.status(500).json({ error: err, body: [] }));
});

server.post('/save-riff', upload.single('blob'), (req, res) => {
  const body = req.body;

  //console.log( 'verify token' );

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      const payload = ticket.getPayload();

      return payload;
    })
    // make sure that the user exists in the db, or else insert them
    .then(payload => {
      return db('users')
        .select()
        .where('email', payload.email)
        .then(userList => {
          if (userList.length === 0) {
            return db('users')
              .insert(
                {
                  name: 'all are bob',
                  email: payload.email
                },
                'id'
              )
              .then(newUserId => {
                return payload;
              });
          } else console.log('not inserting user');
          return payload;
        });
    })
    // make sure that the video exists in the db, or else insert it
    .then(payload => {
      return db('videos')
        .select()
        .where('url', body.video_id)
        .then(vidList => {
          if (vidList.length === 0) {
            return db('videos')
              .insert(
                {
                  url: body.video_id
                },
                'id'
              )
              .then(newVidId => {
                return payload;
              });
          } else console.log('not inserting video');
          return payload;
        });
    })
    // once we know the user and video exist, insert the riff
    .then(payload => {
      // get the IDs of the user and video, then insert the data
      data_model.getIdFromEmail(payload.email).then(idin => {
        console.log('UID!', idin[0].id);

        data_model.getIdFromVideoId(body.video_id).then(vidid => {
          console.log('VID!', vidid[0].id);

          let dbpayload = {
            audio_datum: body.type == 'text' ? null : req.file.buffer,
            text: body.type == 'text' ? body.text : null,
            isText: body.type == 'text',
            start_time: body.start_time,
            duration: body.duration,
            user_id: idin[0].id,
            video_id: vidid[0].id
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
                    tempId: body.tempId,
                    id: newRiffId
                  })
              );
          } else {
            db('riffs')
              .where('id', body.id)
              .update(dbpayload)
              .then(() => res.status(200).json({ status: 'ok', type: 'edit' }));
          }
        });
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = server;
