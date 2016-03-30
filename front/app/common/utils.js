
import _ from 'lodash';

export function hasExactMatch(array, value) {
    return _.chain(array).filter(function(item) { return (item && item === value); }).value().length > 0;
}

