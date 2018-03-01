/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

const server = new Server(process.env.HOSTNAME, process.env.PORT);
const mongoClient = new MongoClient(server, { native_parser: true });

const options = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};
const url = process.env.DATABASE_URL;

function open() {
  // Connection URL. This is where your mongodb server is running.
  return mongoClient.connect(url, options, (resolve, reject) => {
    if (resolve) {
      reject(reject);
    } else {
      resolve(resolve);
    }
  });
}

function close(db: any) {
  // Close connection
  if (db) {
    db.close();
  }
}

const db = { open, close };

export default db;

// import knex from 'knex';

// const db = knex({
//   client: 'pg',
//   connection: process.env.DATABASE_URL,
//   migrations: {
//     tableName: 'migrations',
//   },
//   debug: process.env.DATABASE_DEBUG === 'true',
// });

// const MongoClient = require('mongodb').MongoClient;
// const Server = MongoClient.Server;

// const url = process.env.DATABASE_URL;

// const server = new Server(process.env.HOSTNAME, process.env.PORT);
// const client = new MongoClient(server, { native_parser: true });

// // mongoDB
// //   .then(db => {
// //     // db as first argument
// //     console.log(db);
// //   })
// //   .catch(err => ({ error: err, reason: {} }));

// // Open the connection to the server
// client.open((err, mongoclient) => {
//   // Get the first db and do an update document on it
//   const db = mongoclient.db('datawhore');
//   db
//     .collection('system.users')
//     .find({}, (err, result) => {
//       // assert.equal(null, err);
//       // assert.equal(1, result);
//     });
// });

// async function asyncCall() {
//   console.log('calling');
//   const result = await mongoDB();
//   console.log(result);
//   return result;
//   // expected output: "resolved"
// }

// const db = asyncCall();

// export default db;

// // const db = mongodb.MongoClient.connect(process.env.DATABASE_URL, config)
// //   .then(res => res)
// //   .catch(err => err);
// // function resolveAfter2Seconds() {
// //   return new Promise(resolve => {
// //     setTimeout(() => {
// //       resolve('resolved');
// //     }, 2000);
// //   });
// // }

// // const mongoToKnex = require('mongo-to-knex');

// // // knex main object
// // const knex = require('knex')({ /* knex config */ });

// // // knex query builder object
// // const knexQuery = knex('movies');
