/**
 * Copyright © 2018-present @erratik
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

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
      // eslint-disable-next-line no-unused-vars
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
