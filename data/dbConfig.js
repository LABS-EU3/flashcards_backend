const knex = require('knex');

const env = process.env.NODE_ENV || 'development';
const configOptions = knex[env];

module.exports = knex(configOptions);
