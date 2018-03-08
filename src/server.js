/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */
/* eslint-disable no-console, no-shadow, import/no-named-as-default */

import app from './app';
import { mongoCXN } from './db';
import redis from './redis';
import errors from './errors';

const port = process.env.PORT || 8080;
const host = process.env.HOSTNAME || '0.0.0.0';

// Launch Node.js server
const server = app.listen(port, () => {
  console.log(`👂  node.js API server is listening on http://${host}:${port}/`);
});
// db().then(db => console.log(db));

// Shutdown Node.js app gracefully
async function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close, mongoCXN.close, redis.quit];
    actions.forEach((close, i) => {
      console.log(`☠ exiting (${i})...`);
      try {
        close(() => {
          if (i === actions.length - 1) process.exit();
        });
      } catch (err) {
        if (i === actions.length - 1) process.exit();
      }
    });
  }
  if (err) errors.report(err);
  if (options.exit) process.exit();
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
