const db = require('./data/db.js');

function getIdFromEmail(email) {
    return (
        db('users')
            .select('id')
            .where({ email })
    );
}

function getIdFromVideoId(url) {
    return (
        db('videos')
            .select('id')
            .where({ url })
    );
}

function getNameFromID(id) {
    return (
        db('videos')
            .select('name')
            .where({ id })
    );
}

module.exports = {
    getIdFromEmail,
    getIdFromVideoId,
    getNameFromID
  };