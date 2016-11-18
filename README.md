# spark-to-json
Returns a JSON representation of a Primus spark

# Installation
```bash
npm i --save spark-to-json
```

# Usage
toJSON a primus spark
```js
const sparkToJSON = require('spark-to-json')
const primus = new Primus({/* ... */})

primus.on('connection', function (spark) {
  const json = sparkToJSON(spark)
  /*
  {
    id: <sparkId>,
    headers: {
      <headers...>
    },
    remote: <socketRemoteAddress>
  }
  */

  // want to pluck additional properties?
  const json2 = sparkToJSON(spark, ['foo1', 'foo2'])
  /*
  {
    id: <sparkId>,
    headers: {
      <headers...>
    },
    remote: <socketRemoteAddress>,
    // additional properties
    foo1: <foo1>,
    foo2: <foo2>
  }
  */
})
```

# License
MIT
