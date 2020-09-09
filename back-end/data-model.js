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

function getVideoInfoForUser(user_id)
{
    return (
        db('riffs')
            .join('videos', 'riffs.video_id', 'videos.id')
            .select('videos.id', 'videos.title')
            .groupBy('video_id', 'videos.id', 'videos.title')
            .where({ user_id })
    );
}

module.exports = {
    getIdAndNameFromEmail,
    getIdFromVideoId,
    getNameFromID,
    getVideoInfoForUser
  };