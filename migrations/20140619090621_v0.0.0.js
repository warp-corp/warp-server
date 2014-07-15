
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

      // Relations
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('sector_id').references('id').inTable('sectors');

      // Propriétés du bot
      table.integer('hp').defaultTo(100);
      table.integer('base_armoring').defaultTo(5);
      table.integer('base_max_hp').defaultTo(100);
      table.integer('base_max_cargo').defaultTo(10);
      table.integer('base_cpus').defaultTo(5);
      table.integer('base_ram').defaultTo(128);

    }),

    //  Création de la table 'cooldowns'
    knex.schema.createTable('cooldowns', function(table) {

      table.charset('utf8');

      table.increments('id').primary();
      table.integer('bot_id').references('id').inTable('bots').onDelete('CASCADE');
      table.string('action');
      table.dateTime('timestamp');

    }),

    //  Création de la table 'resources'
    knex.schema.createTable('resources', function(table) {

      table.charset('utf8');
      table.timestamps();
      table.increments('id').primary();
      table.string('type');
      table.integer('amount');
      table.integer('bot_id').references('id').inTable('bots').onDelete('CASCADE');

    }),

    //  Création de la table 'modules'
    knex.schema.createTable('modules', function(table) {

      table.charset('utf8');

      table.increments('id').primary();
      table.timestamps();
      table.integer('bot_id').references('id').inTable('bots').onDelete('CASCADE');

    }),

    //  Création de la table 'sectors'
    knex.schema.createTable('sectors', function(table) {

      table.charset('utf8');

      table.increments('id').primary();
      table.timestamps();
      table.integer('x');
      table.integer('y');
      table.integer('altitude');
      table.string('type');
      table.string('special_actions');
      table.string('banned_actions');

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

    }),

    /* Seeding */


  ]).then(function() {

    var sectors = require('../lib/game/sectors');

    var origin = sectors.getSector(0, 0);
    origin.id = 0;
    origin.special_actions = ['unload', 'build'].join(',');
    origin.banned_actions = ['basic_strike', 'scanbot'].join(',');
    origin.updated_at = Date.now();
    origin.created_at = Date.now();

    return knex('sectors').insert(origin);

  });

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
