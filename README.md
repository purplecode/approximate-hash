# approximate-hash

Super fast approximate hashing function for large, deeply nested objects and arrays, also with circular dependencies.  
It does not use all of the objects but is just sampling them up to the given depth or length.


Installation
------------
```
npm install approximate-hash

```

Usage
------------
```
var approximateHash = require('approximate-hash');

var obj = {
    ...large, deeply nested object
};

console.log(approximateHash(obj));
```

API
------------
```
var approximateHash = require('approximate-hash');

var options = {
    encoding: 'hex', // 'hex', 'binary' or 'base64'
    algorithm: 'md5', // 'md5', 'sha256', 'sha512'
    objectDepth: 7,
    arrayDepth: 7,
    stringDepth: 100
};

console.log(approximateHash(obj, options));
```