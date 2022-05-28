/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('pic_url');
        table.binary('riff_pic').defaultTo(null);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('users', function (table) {
        table.string('pic_url').defaultTo('https://www.rifftube.net/default_pic.png');
        table.dropColumn('riff_pic');
      });
};
