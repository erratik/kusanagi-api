/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

// import knex from 'knex';
// const db = knex({
//   client: 'pg',
//   connection: process.env.DATABASE_URL,
//   migrations: {
//     tableName: 'migrations',
//   },
//   debug: process.env.DATABASE_DEBUG === 'true',
// });

// import mongoose from 'mongoose';
const mongodb = require('mongodb');

const db = {};

async function init() {
  db = await mongodb.MongoClient.connect('process.env.DATABASE_URL');

  await db.collection('Movies').drop();
  await db
    .collection('Movies')
    .insertMany([
      { name: 'Enter the Dragon' },
      { name: 'Ip Man' },
      { name: 'Kickboxer' },
    ]);

  // Don't `await`, instead get a cursor
  // const cursor = db.collection('Movies').find();
  // Use `next()` and `await` to exhaust the cursor
  // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  //   console.log(doc.name);
  // }
}

init();

export default db;
