var filter = require('object-loops/filter')
var pick = require('101/pick')

var primusHeaderRegExp = /^primus::/

module.exports = sparkToJSON

/**
 * return a json representation of a spark
 * @param spark
 * @param [additional] additional properties to pick
 * @return {[type]} [description]
 */
function sparkToJSON (spark, additional) {
  additional = additional || []
  var props = [
    'id',
    'headers',
    'remote'
  ]
  props = props.concat(additional)
  var out = pick(spark, props)
  out.headers = filter(out.headers, function (val, key) {
    return !primusHeaderRegExp.test(key)
  })
  return out
}
