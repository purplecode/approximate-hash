/* Copyright (c) 2016 Mateusz Jaworski, MIT License */
/* jshint node:true */

;(function () {
    "use strict";

    var root = this;

    var hasRequire = typeof require !== 'undefined';

    var _ = root._ || hasRequire && require('lodash');
    if (!_) {
        throw new Error('approximateHash requires lodash, see https://lodash.com/');
    }

    var md5 = root.md5 || hasRequire && require('js-md5');
    if (!md5) {
        throw new Error('approximateHash requires js-md5, see https://github.com/emn178/js-md5');
    }

    /**************** library ****************/

    var defaults = {
        objectDepth: 7,
        arrayDepth: 7,
        stringDepth: 100
    };

    function _approximateHash(obj, hash, currentDepth, options) {
        if (currentDepth > options.objectDepth) {
            return;
        }

        if (!obj || _.isFunction(obj)) {
            hash.update(String(obj));
            return;
        }

        if (_.isArguments(obj)) {
            for (var i = 0; i < obj.length; i++) {
                _approximateHash(obj[i], hash, currentDepth + 1, options);
            }
            return;
        }

        if (_.isArray(obj)) {
            hash.update(String(obj.length));
            for (var j = 0; j < obj.length && j < options.arrayDepth; j++) {
                _approximateHash(obj[j], hash, currentDepth + 1, options);
            }
            return;
        }

        if (_.isObject(obj)) {
            _.forEach(obj, function (value, key) {
                hash.update(key);
                _approximateHash(value, hash, currentDepth + 1, options);
            });
            return;
        }

        if (_.isString(obj)) {
            hash.update(String(obj.length));
            hash.update(obj.substr(0, options.stringDepth));
            return;

        }

        hash.update(String(obj));
    }

    function approximateHash(obj, options) {
        options = _.extend({}, defaults, options);
        var hash = md5.create();
        _approximateHash(obj, hash, 0, options);
        return hash.hex();
    }

    /**************** end of library ****************/

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = approximateHash;
        }
        exports.approximateHash = approximateHash;
    } else {
        root.approximateHash = approximateHash;
    }

}).call(this);