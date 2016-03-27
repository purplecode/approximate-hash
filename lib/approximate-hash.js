"use strict";
var _ = require('lodash');
var md5 = require('js-md5');

var defaults = {
    objectDepth: 7,
    arrayDepth: 7,
    stringDepth: 100
};

function _approximateHash(obj, hash, currentDepth, options) {
    if (currentDepth > options.objectDepth) return;
    if (_.isArguments(obj)) {
        for (var i = 0; i < obj.length; i++) {
            _approximateHash(obj[i], hash, currentDepth + 1, options);
        }
    } else if (_.isArray(obj)) {
        for (var i = 0; i < obj.length && i < options.arrayDepth; i++) {
            _approximateHash(obj[i], hash, currentDepth + 1, options);
        }
    } else if (_.isFunction(obj)) {
        hash.update(String(obj));
    } else if (_.isObject(obj)) {
        _.forEach(obj, function (value, key) {
            hash.update(key);
            _approximateHash(value, hash, currentDepth + 1, options);
        });
    } else if (_.isString(obj)) {
        hash.update(obj.substr(0, options.stringDepth));
    } else {
        hash.update(String(obj));
    }
}

module.exports = function approximateHash(obj, options) {
    options = _.extend({}, defaults, options);
    var hash = md5.create();
    _approximateHash(obj, hash, 0, options);
    return hash.hex();
};