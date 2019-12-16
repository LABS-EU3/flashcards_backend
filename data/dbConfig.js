const knex = require('knex');

// const knexfile = require('../knexfile');
console.log(process.env.DATABASE_URL);

const env = process.env.NODE_ENV || 'development';
const configOptions = knex[env];

module.exports = knex(configOptions);
