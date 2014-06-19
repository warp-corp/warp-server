
exports.up = function(knex, Promise) {

  return Promise.all([

    // Création de la table 'users'
    knex.schema.createTable('users', function(table) {

      table.charset('utf8');

      table.increments('id').primary();
      table.timestamps();
      table.string('name').unique();
      table.string('email').unique();
      table.string('hash');
      table.integer('bot_id').references('id').inTable('bots');
      
    }),

    //  Création de la table 'bots'
    knex.schema.createTable('bots', function(table) {

      table.charset('utf8');

      table.increments('id').primary();
      table.timestamps();
      table.integer('user_id').references('id').inTable('users');
      table.integer('sector_id').references('id').inTable('sectors');
      
    }),

    //  Création de la table 'cooldowns'
    knex.schema.createTable('cooldowns', function(table) {

      table.charset('utf8');

      table.increments('id').primary();
      table.timestamps();
      table.integer('bot_id').references('id').inTable('bots');
      table.string('action');
      table.dateTime('ts');
      
    }),

    //  Création de la table 'resources'
    knex.schema.createTable('resources', function(table) {

      table.charset('utf8');
      table.timestamps();
      table.increments('id').primary();
      table.string('type');
      table.integer('amount');
      table.integer('bot_id').references('id').inTable('bots');
      
    }),

    //  Création de la table 'modules'
    knex.schema.createTable('modules', function(table) {

      table.charset('utf8');
      
      table.increments('id').primary();
      table.timestamps();
      table.integer('bot_id').references('id').inTable('bots');
      
    }),

    //  Création de la table 'sectors'
    knex.schema.createTable('sectors', function(table) {

      table.charset('utf8');
      
      table.increments('id').primary();
      table.timestamps();
      table.integer('x');
      table.integer('y');
      table.string('type');

    }),

    /* Tables pivots */

    // Création de la table pivot 'bots' <-> 'resources'
    knex.schema.createTable('bots_resources', function(table) {

      table.charset('utf8');

      table.integer('bot_id').references('id').inTable('bots');
      table.integer('resource_id').references('id').inTable('resources');

    }),

    // Création de la table pivot 'bots' <-> 'modules'
    knex.schema.createTable('bots_modules', function(table) {

      table.charset('utf8');

      table.integer('bot_id').references('id').inTable('bots');
      table.integer('module_id').references('id').inTable('modules');

    })

  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    // Suppression des tables principales
    knex.dropTable('users'),
    knex.dropTable('bots'),
    knex.dropTable('resources'),
    knex.dropTable('modules'),
    knex.dropTable('sectors'),
    // Suppression des tables pivots
    knex.dropTable('bots_modules'),
    knex.dropTable('bots_resources')
  ]);
};
