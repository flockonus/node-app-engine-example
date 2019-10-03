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

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// 149% not safe for production
app.get('/env', (req, res) => {
  res.send(process.env);
});

// SOOOOPER not safe for production!
app.get('/env/:key', (req, res) => {
    res.send({[req.params.key]: process.env[req.params.key]});
});

app.get('/slow/:delay', (req, res) => {
    const start = Date.now();
    const delay = parseInt(req.params.delay, 10);
    let dummy = 0.001;
    while(Date.now() < start + delay * 1000) {
        // a dummy op to stall
        dummy += Math.random() - 0.5;
    }
    res.send(`kiki:${dummy}`);
  });

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;