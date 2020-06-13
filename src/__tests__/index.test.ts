import Primus, { Socket, Spark } from 'primus'

import { createServer } from 'http'
import sparkToJSON from '../index'

var PORT = process.env.PORT || 3030

async function getSpark(): Promise<Spark> {
  const server = createServer()
  const primus = new Primus(server, {
    transformer: 'websockets',
  })
  await new Promise((resolve) => server.listen(PORT, resolve))
  const spark = await new Promise<Spark>((resolve, reject) => {
    let client: Socket | undefined
    primus.on('connection', (spark) => {
      client.end()
      resolve(spark)
    })
    client = new primus.Socket(`http://localhost:${PORT}`)
  })
  await new Promise((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  )
  return spark
}

describe('sparkToJSON', () => {
  it('should json a primus spark', async () => {
    const spark = await getSpark()

    // assert and replace dynamic spark properties
    expect(typeof spark.id).toBe('string')
    spark.id = 'sparkId'
    expect(typeof spark.address.port).toBe('number')
    spark.address.port = 1000
    expect(typeof spark.headers['sec-websocket-key']).toBe('string')
    spark.headers['sec-websocket-key'] = 'sec-websocket-key'
    expect(typeof spark.query._primuscb).toBe('string')
    spark.query._primuscb = '_primuscb'

    // assert and replace dynamic request properties
    const req = spark.request
    // @ts-ignore
    expect(typeof req.originalUrl).toBe('string')
    // @ts-ignore
    req.originalUrl = 'originalUrl'
    expect(typeof req.url).toBe('string')
    req.url = 'url'

    expect(sparkToJSON(spark)).toMatchInlineSnapshot(`
      Object {
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
          "originalUrl": "originalUrl",
          "trailers": Object {},
          "url": "url",
        },
      }
    `)
  })
})
