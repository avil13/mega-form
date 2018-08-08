import test from 'ava';
import forIt from './for-it';

test('Object', t => {
    const mock = {
        '1': 1,
        '2': 2
    };

    forIt(mock, (key, val, is_array) => {
        t.is(+key, val);
        t.false(is_array);
    });
});

test('Array', t => {
    const mock = [0, 1, 2];

    forIt(mock, (key, val, is_array) => {
        t.is(key, val);
        t.true(is_array);
    });
});
