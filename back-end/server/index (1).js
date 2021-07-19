const multer = require('multer');
const express = require('express');
const cors = require('cors'); // may ultimately not be needed
const path = require('path');

// for web sockets:
const url = require('url');
const http = require('http');
const WebSocket = require('ws');

// to get youtube video names
const SimpleYouTubeAPI = require('simple-youtube-api');

// was used for duration -- no longer needed
const ytapi = new SimpleYouTubeAPI('AIzaSyB1drUN9ne_NHwFxv0YFEeGmuVRqV6cKJQ');

const server = express();
const upload = multer({ storage: multer.memoryStorage() });

const db = require('../data/db.js');
const data_model = require('../data-model.js');

const CLIENT_ID =
  '941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com';

server.use(express.json());

// needed only for localhost (remove for production)
server.use(cors());

// enforce HTTPS
if (process.env.NODE_ENV === 'production') {
  server.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

server.get('/api-status', (req, res) => {
  res.status(200).json({ api: 'running', updated: '5.29' });
});

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// function to verify the google token
function verify(token) {
  return client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
}

// return given riff's audio data
server.post('/load-riff', (req, res) => {
  const body = req.body;
  return db('riffs')
    .select('audio_datum')
    .where({ id: body.id })
    .then(([aud]) => {
      res.status(200).send(aud.audio_datum);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// delete riff
server.delete('/riff-remove/:id', (req, res) => {
  const { token } = req.body;
  const id = req.params.id;

  verify(req.body.token)
    // once verified, get and pass on payload
    .then((ticket) => {
      return db('riffs').where('id', id).del();
    })

    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
    });
});

// sets the "riffer name" for a given user
server.post('/set-name', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then((ticket) => {
      payload = ticket.getPayload();

      return data_model.getIdAndNameFromEmail(payload.email);
    })
    .then((emailArr) => {
      var [{ id: uID }] = emailArr;

      let dbpayload = {
        name: body.newName,
      };

      db('users')
        .where('id', uID)
        .update(dbpayload)
        .then(() => res.status(200).json({ status: 'ok', name: body.newName }));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// get riffs returns the riffs of a given user for a given video
server.post('/get-riffs', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then((ticket) => {
      payload = ticket.getPayload();

      return Promise.all([
        data_model.getIdAndNameFromEmail(payload.email),
        data_model.getIdFromVideoId(body.videoID),
      ]);
    })
    .then(([emailArr, vIDArr]) => {
      if (emailArr.length === 0 || vIDArr.length === 0) {
        res.status(200).json({ info: 'no riffs yet', body: [] });
      } else {
        var [{ id: uID, name }] = emailArr;
        var [{ id: vID }] = vIDArr;

        return db('riffs')
          .join('videos', 'riffs.video_id', 'videos.id')
          .select(
            'riffs.id as id',
            'riffs.user_id as user_id',
            //'riffs.video_id',
            'videos.url as video_id',
            'riffs.duration as duration',
            'riffs.start_time as start_time',
            'riffs.isText as isText',
            'riffs.text as text'
          )
          .where({ user_id: uID, video_id: vID })
          .then((riffList) => {
            res.status(200).json({
              status: 'ok',
              body: riffList,
              name,
              user_id: uID,
            });
          })
          .catch((err) => res.status(500).json({ error: err }));
      }
    });
});

// save riff does as it name suggests.
// in addition, if this is the first riff ever for a video,
// this function will also add that video to the video table.
// likewise if it happens to be the users first riff ever,
// this will add the user to the users table.
server.post('/save-riff', upload.single('blob'), (req, res) => {
  const body = req.body;

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then((ticket) => {
      payload = ticket.getPayload();

      // make sure that the user exists in the db, or else insert them
      // and
      // make sure that the video exists in the db, or else insert it

      return Promise.all([
        db('users')
          .select('id')
          .where('email', payload.email)
          .then((userList) => {
            /* TODO: fix this*/

            if (userList.length === 0) {
              return db('users').insert(
                {
                  name: 'all are bob',
                  email: payload.email,
                },
                ['id']
              );
            }

            return Promise.resolve(userList);
          }),

        db('videos')
          .select('id')
          .where('url', body.video_id)
          .then((vidList) => {
            if (vidList.length === 0) {
              return ytapi
                .getVideoByID(body.video_id)
                .then((video) => {
                  return db('videos').insert(
                    {
                      url: body.video_id,
                      title: video.title,
                      duration: 0, // duration no longer used
                    },
                    ['id']
                  );
                })
                .catch(console.log);
            }
            return Promise.resolve(vidList);
          }),
      ]);
    })
    // once we know the user and video exist, insert the riff
    .then(([[{ id: idin }], [{ id: vidid }]]) => {
      let dbpayload = {
        audio_datum: body.type == 'text' ? null : req.file.buffer,
        text: body.type == 'text' ? body.text : null,
        isText: body.type == 'text',
        start_time: body.start_time,
        duration: body.duration,
        user_id: idin,
        video_id: vidid,
      };

      if (body.id === 'undefined') {
        db('riffs')
          .insert(dbpayload, 'id')
          .then(([newRiffId]) =>
            res.status(200).json({
              status: 'ok',
              type: 'add',
              tempId: Number(body.tempId),
              id: newRiffId,
            })
          );
      } else {
        db('riffs')
          .where('id', body.id)
          .update(dbpayload)
          .then(() => res.status(200).json({ status: 'ok', type: 'edit' }));
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// get view riffs essentially returns riff meta for a video.
// it is used in both the edit and view interfaces,
// but the reducer behaves differently, depending.
server.post('/get-view-riffs', (req, res) => {
  const body = req.body;

  data_model
    .getIdFromVideoId(body.videoID)
    .then(([{ id: vID }]) => {
      return db('riffs')
        .join('users', 'riffs.user_id', 'users.id')
        .select(
          'riffs.id',
          'riffs.user_id',
          //'riffs.video_id', // unneeded?
          'riffs.duration',
          'riffs.start_time',
          'riffs.isText',
          'riffs.text',
          'users.name'
        )
        .where({ video_id: vID });
    })
    .then((riffList) => {
      res.status(200).json({
        status: 'ok',
        body: riffList.map((el) => ({ ...el, video_id: body.videoID })),
        timestamp: Date.now(),
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// get info for profile
server.get('/get-user-data', (req, res) => {
  const body = req.body;

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then((ticket) => {
      payload = ticket.getPayload();
      return data_model.getIdAndNameFromEmail(payload.email);
    })
    .then(([{ id: uID }]) => {
      return data_model.getVideoInfoForUser(uID);
    })
    .then((body) => {
      res.status(200).json({
        status: 'ok',
        body,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// serve up the base directory
server.use(express.static('/app/front-end/build/'));

// send all otherwise uncaught requests to index.html (?)
server.get('/*', function (req, res) {
  res.sendFile('/app/front-end/build/index.html');
});

/***********************************************************
 * WEB SOCKET SHIT
 */

const websockmap = new Map();

const websockhttp = http.createServer(server);

websockhttp.on('upgrade', function upgrade(request, socket, head) {
  const sockurl = url.parse(request.url, true);

  verify(sockurl.query.googleToken)
    // once verified, get and pass on payload
    .then((ticket) => {
      if (sockurl.pathname === '/riff') {
        var wss = websockmap.get(sockurl.query.videoID);
        if (!wss) {
          wss = new WebSocket.Server({ noServer: true });
          websockmap.set(sockurl.query.videoID, wss);
          wss.on('connection', (ws, request) => {
            //connection is up, let's add a simple simple event
            ws.on('message', (message) => {
              let data = JSON.parse(message);

              if (data.type === 'update') {
                wss.clients.forEach(function each(client) {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                  }
                });
              }

              //log the received message and send it back to the client

              //ws.send(`Hello, you sent -> ${message}`);
            });

            //send immediatly a feedback to the incoming connection
            ws.send(`Hi there, I am a WebSocket server ${request.url}`);
          });
        }

        wss.handleUpgrade(request, socket, head, function done(ws) {
          wss.emit('connection', ws, request);
        });
      } else {
        socket.destroy();
      }
    })
    .catch((err) => console.log('google verify error', err));
});

/************************************************************ */

module.exports = websockhttp; // was: server;
