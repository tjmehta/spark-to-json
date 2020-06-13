"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_to_json_1 = __importDefault(require("request-to-json"));
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
/**
 * return a json representation of a spark
 * @param spark
 * @param [additional] additional properties to pick
 * @return {[type]} [description]
 */
function sparkToJSON(spark) {
    let { id, headers, address, query, 
    //@ts-ignore
    alive, } = spark;
    const reqJSON = request_to_json_1.default(spark.request);
    delete reqJSON.headers;
    delete reqJSON.query;
    return JSON.parse(fast_safe_stringify_1.default({
        id,
        headers: filterOutPrimusHeaders(headers),
        address,
        query,
        alive,
        request: reqJSON,
    }));
}
exports.default = sparkToJSON;
function filterOutPrimusHeaders(headers) {
    const filteredHeaders = Object.assign({}, headers);
    for (let key in filteredHeaders) {
        if (/^primus::/.test(key))
            delete filteredHeaders[key];
    }
    return filteredHeaders;
}
//# sourceMappingURL=index.js.map