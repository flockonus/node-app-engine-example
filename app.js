/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');
var morgan = require('morgan')

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello, world! v1');
});

// 149% not safe for production
app.get('/env', (req, res) => {
  res.send(process.env);
});

app.get('/error', (req,res)=> {
  // throws critical error
  this.asdasdasdasdaD()
});

app.get('/die', (req,res)=> {
  // throws critical error
  console.error('simulating app exploding 💥');
  process.exit(1);
});

app.get('/slow/:delay', (req, res) => {
  const start = Date.now();
  const delay = parseInt(req.params.delay, 10);
  // put a limit to not break the server
  if (delay > 30) delay = 30;
  let dummy = 0.001;
  while (Date.now() < start + delay * 1000) {
    // a dummy op to stall
    dummy += Math.random() - 0.5;
  }
  console.log('dummy', dummy);
  res.send(`done wating:${delay}`);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;