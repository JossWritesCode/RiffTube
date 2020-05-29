exports.up = function(knex) {
    return knex.schema.table('videos', function(table) {
      table
      .string('title')
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.table('videos', function(table) {
      table.dropColumn('title')
    })
  }
  