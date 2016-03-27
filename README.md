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

`objectDepth` - objects will be analyzed up to the given length

`arrayDepth` - maximal number of elements taken from the arrays
 
`stringDepth` - maximal number of characters taken into account

Bugs and Issues
------------
-

License
------------
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

Enjoy!