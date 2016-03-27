"use strict";

const assert = require('assert');
const approximateHash = require('../lib/approximate-hash');

describe('Approximate hash test', () => {

    it('should return hash for different types', () => {
        // given
        let obj = [{
            string: `
                    “But I don’t want to go among mad people," Alice remarked.
                    "Oh, you can’t help that," said the Cat: "we’re all mad here. I’m mad. You’re mad."
                    "How do you know I’m mad?" said Alice.
                    "You must be," said the Cat, "or you wouldn’t have come here.”
                `,
            date: new Date(),
            functionn: function () {
                return -0;
            },
            array: [123, {}, []]
        }];

        // when
        let given = approximateHash(obj);

        // then
        assert.equal('c0d76cd9b4a1e343e284456ab4471825', given);
    });

    it('should return different hash for different functions', function () {
        // given
        let f1 = function () {
            return 1;
        };
        let f2 = function () {
            return 2;
        };

        // then
        assert.notEqual(approximateHash(f1), approximateHash(f2));
    });

    it('should use short string prefix', function () {
        // given
        let long = 'aaaaaaaaaaaaaaaaaaaaaa';
        let short = 'aaaaaa';
        let other = 'aaaaab';

        let options = {
            stringDepth: 6
        };

        // then
        assert.equal(approximateHash(long, options), approximateHash(short, options));
        assert.notEqual(approximateHash(other, options), approximateHash(short, options));
    });

    it('should hash object shallowly', function () {
        // given
        let deep = {a: {b: {c: {d: 1}}}};
        let shallow = {a: {b: {c: 'whatever'}}};
        let other = {a: {b: {d: 'whatever-2'}}};

        let options = {
            objectDepth: 2
        };

        // then
        assert.equal(approximateHash(deep, options), approximateHash(shallow, options));
        assert.notEqual(approximateHash(other, options), approximateHash(shallow, options));
    });

    it('should hash arrays shallowly', function () {
        // given
        let deep = [1, 2, 3, 4, 5, 6, 7];
        let shallow = [1, 2, 3, 4];
        let other = [1, 2, 3, 5];

        let options = {
            arrayDepth: 4
        };

        // then
        assert.equal(approximateHash(deep, options), approximateHash(shallow, options));
        assert.notEqual(approximateHash(other, options), approximateHash(shallow, options));
    });

    it('should not fail on undefined', function () {
        // then
        assert.equal(approximateHash(null), approximateHash('null'));
        assert.equal(approximateHash(), approximateHash('undefined'));
    });

});
