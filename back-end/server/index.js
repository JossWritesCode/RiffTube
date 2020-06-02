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
//const ytapi = new SimpleYouTubeAPI('AIzaSyB1drUN9ne_NHwFxv0YFEeGmuVRqV6cKJQ');

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
    audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
}

server.post('/load-riff', (req, res) => {
  const body = req.body;
  return db('riffs')
    .select('audio_datum')
    .where({ id: body.id })
    .then(([aud]) => {
      res.status(200).send(aud.audio_datum);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// delete riff
server.delete('/riff-remove/:id', (req, res) => {
  const { token } = req.body;
  const id = req.params.id;

  console.log('deleting riff 1');

  verify(req.body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      return db('riffs')
        .where('id', id)
        .del();
    })

    .then(() => {
      res.status(204).end();
      console.log('deleting riff 2');
    })
    .catch(err => {
      console.log(err);
    });
});

server.post('/set-name', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  console.log('set name', body);

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log('SN then', body.newName);

      console.log(payload.email);

      return data_model.getIdAndNameFromEmail(payload.email);
    })
    .then(emailArr => {
      var [{ id: uID }] = emailArr;
      console.log('SN then again', uID, emailArr);

      let dbpayload = {
        name: body.newName
      };

      db('users')
        .where('id', uID)
        .update(dbpayload)
        .then(() => res.status(200).json({ status: 'ok', name: body.newName }));
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post('/get-riffs', (req, res) => {
  const body = req.body;

  // thanks to https://2ality.com/2017/08/promise-callback-data-flow.html for pointing out Promise.all as used below

  console.log('get riffs');

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log('GR then 1');

      console.log(payload.email);

      return Promise.all([
        data_model.getIdAndNameFromEmail(payload.email),
        data_model.getIdFromVideoId(body.videoID)
      ]);
    })
    .then(([emailArr, vIDArr]) => {
      console.log('GR then again', emailArr, vIDArr);
      if (emailArr.length === 0 || vIDArr.length === 0) {
        res.status(200).json({ info: 'no riffs yet', body: [] });
      } else {
        var [{ id: uID, name }] = emailArr;
        var [{ id: vID }] = vIDArr;

        console.log(`GR then 2 ${uID} = ${name} and ${vID}`);

        return (
          db('riffs')
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
            /*
        return db('riffs')
          .select(
            'id',
            'user_id',
            'video_id',
            'duration',
            'start_time',
            'isText',
            'text'
          )
          */
            .where({ user_id: uID, video_id: vID })
            .then(riffList => {
              console.log('GF then 3');

              res.status(200).json({
                status: 'ok',
                body: riffList,
                name,
                user_id: uID
              });
            })
            .catch(err => res.status(500).json({ error: err }))
        );
      }
    });
});

server.post('/save-riff', upload.single('blob'), (req, res) => {
  const body = req.body;

  console.log('save riff');

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log('VT then 1');

      console.log(`SR `);

      // make sure that the user exists in the db, or else insert them
      // and
      // make sure that the video exists in the db, or else insert it

      return Promise.all([
        db('users')
          .select('id')
          .where('email', payload.email)
          .then(userList => {
            /* TODO: fix this*/
            console.log('SR get email', userList);

            if (userList.length === 0) {
              return db('users').insert(
                {
                  name: 'all are bob',
                  email: payload.email
                },
                ['id']
              );
            } else console.log('not inserting user');

            return Promise.resolve(userList);
          }),

        db('videos')
          .select('id')
          .where('url', body.video_id)
          .then(vidList => {
            console.log('SR get vidlist', vidList);

            if (vidList.length === 0) {
              console.log( `The video's title is ${video.title}` );

              return db('videos').insert(
                {
                  url: body.video_id,
                  title: video.title,
                  duration: 0 // duration unneeded -- TBD: remove column from table
                },
                ['id']
              );
              
              /*
              // duration stuff moved to front-end
              return ytapi
                .getVideoByID(body.video_id)
                .then(video => {
                  console.log(
                    `The video's title is ${video.title}, duration: ${video.durationSeconds}`
                  );

                  return db('videos').insert(
                    {
                      url: body.video_id,
                      title: video.title,
                      duration: video.durationSeconds
                    },
                    ['id', 'duration']
                  );
                })
                .catch(console.log);
                */
            } else console.log('not inserting video');
            return Promise.resolve(vidList);
          })
      ]);
    })
    // once we know the user and video exist, insert the riff
    /*.then(() => {
      // get the IDs of the user and video, then insert the data
      return Promise.all([data_model.getIdFromEmail(payload.email), data_model.getIdFromVideoId(body.video_id)]);
    })*/
    .then(([[{ id: idin }], [{ id: vidid }]]) => {
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
            res.status(200).json({
              status: 'ok',
              type: 'add',
              tempId: Number(body.tempId),
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

  console.log('get view riffs', body.videoID);

  data_model
    .getIdFromVideoId(body.videoID)
    .then(([{ id: vID }]) => {
      console.log(vID);

      console.log('GVR then 1');

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
    .then(riffList => {
      console.log('GVR then 2');

      res.status(200).json({
        status: 'ok',
        body: riffList.map(el => ({ ...el, video_id: body.videoID })),
        timestamp: Date.now()
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

/************ collaboration: not yet implemented */

// start collaboration (and create websocket)
server.post('/collaboration/start', (req, res) => {
  const body = req.body;

  console.log('collaboration start');

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log('VT then 1');

      return data_model.getIdAndNameFromEmail(payload.email);
    })
    .then(emailArr => {
      var [{ id: uID }] = emailArr;
      console.log('CS then again', uID, emailArr);

      return db('collaborations').insert(
        {
          owner_id: uID
        },
        'id'
      );
    })
    .then(collabArr => {
      var [cID] = collabArr;
      console.log('CS then again', cID, collabArr);

      res.status(200).json({ status: 'ok', id: cID });
    })
    .catch(err => res.status(500).json({ error: err }));
});

// check if collaboration exists
server.post('/collaboration/status', (req, res) => {
  const body = req.body;

  console.log('collaboration status check');

  var payload;

  verify(body.token)
    // once verified, get and pass on payload
    .then(ticket => {
      payload = ticket.getPayload();

      console.log('VT then 1');

      return data_model.getIdAndNameFromEmail(payload.email);
    })
    .then(emailArr => {
      var [{ id: uID }] = emailArr;
      console.log('CE then again', uID, emailArr);

      return Promise.all([
        db('collaborations')
          .select()
          .where('owner_id', uID),
        db('collaborators')
          .join(
            'collaborations',
            'collaborators.user_id',
            'collaborations.owner_id'
          )
          .join('users', 'collaborations.owner_id', 'users.name')
          .select()
          .where('collaboration_id', uID)
      ]);
    })
    .then(([colationsList, colatorsList]) => {
      res.status(200).json({
        status: 'ok',
        collaboration: colationsList.length > 0 ? colationsList[0].id : null,
        collaborators: colatorsList
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

// this seems to be necessary! even with the .get below
server.use(express.static('/app/front-end/build/'));

server.get('/*', function(req, res) {
  res.sendFile('/app/front-end/build/index.html');
});

/***********************************************************
 * WEB SOCKET SHIT
 */

const websockmap = new Map();

const websockhttp = http.createServer(server);

websockhttp.on('upgrade', function upgrade(request, socket, head) {
  const sockurl = url.parse(request.url, true);

  console.log( "query", sockurl.query );

  verify( sockurl.query.googleToken )
  // once verified, get and pass on payload
  .then(ticket => {
    console.log('upgrade');

    if (sockurl.pathname === '/riff') {

      var wss = websockmap.get( sockurl.query.videoID );
      if ( !wss )
      {
        wss = new WebSocket.Server({ noServer: true });
        websockmap.set( sockurl.query.videoID, wss );
        wss.on('connection', (ws, request) => {

          //connection is up, let's add a simple simple event
          ws.on('message', (message) => {
        
            let data = JSON.parse( message );
        
            if ( data.type === 'update' )
            {
              wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send( message );
                }
              });
            }
        
              //log the received message and send it back to the client
              console.log('received: %s', message);
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
  .catch(err => console.log( "google verify error", err ));
});

/************************************************************ */

module.exports = websockhttp; // was: server;
