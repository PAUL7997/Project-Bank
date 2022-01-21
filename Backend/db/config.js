const { Model } = require('objection');

console.log('SQLDB')


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'password',
      database : 'project_d'
    },
    pool: { min: 0, max: 7 },

    acquireConnectionTimeout: 10000
  });

Model.knex(knex);
