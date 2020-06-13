# spark-to-json [![Build Status](https://travis-ci.org/tjmehta/spark-to-json.svg?branch=master)](https://travis-ci.org/tjmehta/spark-to-json)

Returns a JSON representation of a Primus spark

# Installation

```bash
npm i --save spark-to-json
```

# Usage

#### Supports both ESM and CommonJS

```js
// esm
import sparkToJSON from 'spark-to-json'
// commonjs
const sparkToJSON = require('spark-to-json')
```

#### toJSON a primus spark

```js
import sparkToJSON from 'spark-to-json'
const primus = new Primus({
  /* ... */
})

primus.on('connection', function (spark) {
  const json = sparkToJSON(spark)
  /*
  {
    "address": Object {
      "ip": "::ffff:127.0.0.1",
      "port": 1000,
      "secure": false,
    },
    "alive": true,
    "headers": Object {
      "connection": "Upgrade",
      "host": "localhost:3030",
      "sec-websocket-extensions": "permessage-deflate; client_max_window_bits",
      "sec-websocket-key": "sec-websocket-key",
      "sec-websocket-version": "13",
      "upgrade": "websocket",
    },
    "id": "sparkId",
    "query": Object {
      "_primuscb": "_primuscb",
    },
    "request": Object {
      "aborted": false,
      "complete": true,
      "httpVersion": "1.1",
      "method": "GET",
      "originalUrl": "/primus?_primuscb=NAlT-Zb",
      "trailers": Object {},
      "url": "/primus?_primuscb=NAlT-Zb",
    },
  }
  */
})
```

# License

MIT
