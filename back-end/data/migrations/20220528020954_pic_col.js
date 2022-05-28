/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('users', function (table) {
        table.string('pic_url').defaultTo('https://www.rifftube.net/default_pic.png');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('pic_url');
      });
};
