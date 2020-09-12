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

function getRifferNameFromID(id) {
    return (
        db('users')
            .select('name')
            .where({ id })
    );
}

function getVideoInfoForUser(user_id)
{
    return (
        db('riffs')
            .join('videos', 'riffs.video_id', 'videos.id')
            .select('videos.url', 'videos.title')
            .groupBy('videos.id')
            .where({ user_id })
            .count('videos.url')
    );
}

function getGlobalVideoList()
{
    return (
        db('riffs')
            .join('videos', 'riffs.video_id', 'videos.id')
            .select('videos.url', 'videos.title')
            .groupBy('videos.id')
            .count('videos.url')
    );
}

module.exports = {
    getIdAndNameFromEmail,
    getIdFromVideoId,
    getRifferNameFromID,
    getVideoInfoForUser,
    getGlobalVideoList,
  };