import reqToJSON, { IncomingMessageJSON } from 'request-to-json'

import { IncomingHttpHeaders } from 'http'
import { Spark } from 'primus'
import stringify from 'fast-safe-stringify'

/**
 * return a json representation of a spark
 * @param spark
 * @param [additional] additional properties to pick
 * @return {[type]} [description]
 */
export default function sparkToJSON(spark: Spark) {
  let {
    id,
    headers,
    address,
    query,
    //@ts-ignore
    alive,
  } = spark
  const reqJSON = reqToJSON(spark.request) as IncomingMessageJSON
  delete reqJSON.headers
  delete reqJSON.query
  return JSON.parse(
    stringify({
      id,
      headers: filterOutPrimusHeaders(headers),
      address,
      query,
      alive,
      request: reqJSON,
    }),
  )
}

function filterOutPrimusHeaders(
  headers: IncomingHttpHeaders,
): IncomingHttpHeaders {
  const filteredHeaders = { ...headers }
  for (let key in filteredHeaders) {
    if (/^primus::/.test(key)) delete filteredHeaders[key]
  }
  return filteredHeaders
}
