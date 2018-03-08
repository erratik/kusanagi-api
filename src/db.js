/**
<<<<<<< HEAD
 * Copyright © 2016-present Kriasoft.
=======
 * Copyright © 2018-present @erratik
>>>>>>> [kusanagi-api] deleted my git history like a moron...; mongo works, working with the dataloader & graphql now
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

<<<<<<< HEAD
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
=======
import { Logger } from 'mongodb';
import mongoose from 'mongoose';

const MONGO_URL = process.env.DATABASE_URL;

const db = async () => {
  console.log('🍃  connecting to mongoDB...');
  const myDB = await mongoose
    .connect(MONGO_URL)
    .then(cnx => cnx.connections[0])
    .then(dbx => {
      let logCount = 0;
      Logger.setCurrentLogger((msg, state) => {
        logCount += 1;
        console.log(`MONGO DB REQUEST ${logCount}: ${msg}`);
      });
      Logger.setLevel(process.env.NODE_ENV === 'staging' ? 'error' : 'debug');
      Logger.filter('class', ['NativeCollection', 'Cursor']);

      console.log('   📚  fetching collections...');
      return Object.keys(dbx.collections).map(collectionName =>
        dbx.collection(collectionName),
      );
    })
    .then(collections => collections);

  return {
    collections: myDB,
  };
};

const mongoDB = {};
(async () => {
  mongoDB.collections = await db().then(({ collections }) => {
    const niceCollections = {};
    for (let i = 0; i < collections.length; i++) {
      niceCollections[collections[i].collectionName] = collections[i];
    }
    return niceCollections;
  });
  return new Promise(resolve => {
    resolve(mongoDB.collections);
    console.log('   🏁  done...');
  });
})();

const mongoCXN = {
  close: (cxn: any) => {
    // Close connection
    if (cxn) {
      cxn.close();
    }
  },
};

export default db;
export { mongoDB, mongoCXN };
>>>>>>> [kusanagi-api] deleted my git history like a moron...; mongo works, working with the dataloader & graphql now
