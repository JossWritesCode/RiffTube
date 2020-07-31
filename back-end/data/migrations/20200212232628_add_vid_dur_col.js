exports.up = function (knex) {
  return knex.schema.table('videos', function (table) {
    table.float('duration');
  });
};

exports.down = function (knex) {
  return knex.schema.table('videos', function (table) {
    table.dropColumn('duration');
  });
};
