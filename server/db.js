const { Client } = require('pg');

const client = new Client({
  user: 'phwujlax',
  host: 'isilo.db.elephantsql.com',
  database: 'phwujlax',
  password: 'iJxOqxlqCBWkx7Bb73_6K2cMiYXEgOEG', // need to hide the password
  port: '5432',
})

client.connect((err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('connected to database');
  }
})

module.exports = client;