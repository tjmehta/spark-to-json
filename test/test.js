var describe = global.describe
var it = global.it

var http = require('http')

var expect = require('chai').expect
var Primus = require('primus')

var sparkToJSON = require('../index.js')

var PORT = process.env.PORT || 3030

describe('spark-to-json', function () {
  describe('primus server', function () {
    beforeEach(function (done) {
      this.httpServer = http.createServer()
      this.primus = new Primus(this.httpServer, {
        transformer: 'websockets'
      })
      this.httpServer.listen(PORT, done)
    })
    afterEach(function (done) {
      this.httpServer.close(done)
    })

    describe('primus spark', function () {
      it('should json a primus spark', function (done) {
        const self = this
        this.primus.on('connection', function (spark) {
          const json = sparkToJSON(spark)
          expect(json).to.deep.equal({
            id: spark.id,
            headers: spark.headers,
            remote: spark.remote
          })
          self.client.end()
          done()
        })
        this.client = new this.primus.Socket('http://localhost:' + PORT)
      })

      it('should json a primus spark w/ additional properties', function (done) {
        const self = this
        this.primus.on('connection', function (spark) {
          spark.foo = 123
          const json = sparkToJSON(spark, ['foo'])
          expect(json).to.deep.equal({
            id: spark.id,
            foo: spark.foo,
            headers: spark.headers,
            remote: spark.remote
          })
          self.client.end()
          done()
        })
        this.client = new this.primus.Socket('http://localhost:' + PORT)
      })
    })
  })
})
