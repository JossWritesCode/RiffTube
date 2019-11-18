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