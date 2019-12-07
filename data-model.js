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
            .select('name')
            .where({ id })
    );
}

function getNameFromId(id) {
    return (
        db('users')
            .select('id')
            .where({ url })
    );
}

module.exports = {
    getIdFromEmail,
    getIdFromVideoId,
    getNameFromId
  };