# approximate-hash

Super fast approximate hashing function for large, deeply nested objects and arrays, also with circular dependencies.  
It does not use all of the objects but is just sampling them up to the given depth or length.


Installation
------------
For node.js:
```
npm install approximate-hash
```

For bower:
```
bower install approximate-hash
```

Usage
------------
```
var approximateHash = require('approximate-hash');

var obj = {
    ...large, deeply nested object or array
};

console.log(approximateHash(obj));

// c0d76cd9b4a1e343e284456ab4471825
```

API
------------
```
var approximateHash = require('approximate-hash');

var options = {
    objectDepth: 7,
    arrayDepth: 7,
    stringDepth: 100
};

console.log(approximateHash(obj, options));
```

`objectDepth` - argument object will be analyzed up to the given depth

`arrayDepth` - maximal number of elements taken from each array
 
`stringDepth` - maximal number of characters taken from each string

Bugs and Issues
------------
-

License
------------
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

Enjoy!