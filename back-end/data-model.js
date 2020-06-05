const db = require('./data/db.js');

function getIdAndNameFromEmail(email) {
    return (
        db('users')
            .select('id', 'name')
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
    getIdAndNameFromEmail,
    getIdFromVideoId,
    getNameFromID
  };