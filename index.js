var pick = require('101/pick')

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
  return pick(spark, props)
}
