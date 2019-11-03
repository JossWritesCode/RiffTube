// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');

// creates an express application using the express module
const server = express();

const port = 8000;

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(port, () => console.log(`API running on port ${port}`));

/* 
Following code copied from:
https://developers.google.com/identity/sign-in/web/backend-auth?fbclid=IwAR0NqceTfxKRpVlQK9cXAnVXRMHn9Rni569_f03LOaQ4DLrkovaLIUUbofg
*/
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
//     // Or, if multiple clients access the backend:
//     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   //const domain = payload['hd'];
// }
// verify().catch(console.error);
//
/* 
Above code copied from:
https://developers.google.com/identity/sign-in/web/backend-auth?fbclid=IwAR0NqceTfxKRpVlQK9cXAnVXRMHn9Rni569_f03LOaQ4DLrkovaLIUUbofg
*/
