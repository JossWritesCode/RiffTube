
exports.up = function(knex) {
    return knex.schema.table('videos', function (table) {
        table.string('host').defaultTo('youtube.com');
      });
};

exports.down = function(knex) {
    return knex.schema.table('videos', function (table) {
        table.dropColumn('host');
      });
};
