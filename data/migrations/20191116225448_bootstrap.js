exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('name');
      tbl.string('email').unique();
    })
    .createTable('videos', tbl => {
      tbl.increments();
      tbl
        .string('url')
        .notNullable()
        .unique();
    })
    .createTable('riffs', tbl => {
      tbl.increments();
      tbl
        .binary('audio_datum')
        .defaultTo(null);
      tbl.float('duration');
      tbl.float('start_time');
      tbl.text('text');
      tbl.integer('rating');
      tbl
        .boolean('isText')
        .defaultTo(false)
        .notNullable();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('video_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('videos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('videos_users', tbl => {
      tbl.increments();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('video_id')
        .unsigned()
        .references('id')
        .inTable('videos')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
    })
    .createTable('playlists', tbl => {
      tbl.increments();
      tbl
        .integer('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.text('text');
    })
    .createTable('collaborators', tbl => {
      tbl.increments();
      tbl
        .integer('playlist_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('playlists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('collaborations', tbl => {
      tbl.increments();
      tbl
        .integer('playlist_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('playlists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('videos')
    .dropTableIfExists('riffs')
    .dropTableIfExists('videos_users');
};
