import { assert } from 'chai';
import _ from 'lodash';
import { hasExactMatch } from '../../common/utils.js';

// TODO move this to app/common/test/
describe('Tulokset', function() {
    describe('Utils', function () {

        it('gives no exact match if item not found', function () {
            assert.strictEqual(hasExactMatch(['abc'], 'bca'), false);
        });

        it('gives no exact match if only partial item found', function () {
            assert.strictEqual(hasExactMatch(['abc', 'foobar'], 'ab'), false);
        });

        it('gives exact match if exact item found', function () {
            assert.strictEqual(hasExactMatch(['abc', 'bca', 'abcdefg'], 'abc'), true);
        });
    });
});
