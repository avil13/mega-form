import test from 'ava';
import valueByKey from './value-by-key';

// Base validation object
const mock_base = {
    name: 'Jon',
    person: {
        age: 27
    },
    list: [
        { value: 1 },
        { value: 2 }
    ]
};

const mocks_good = {
    'name': 'Jon',
    'person.age': 27,
    'person.*': { age: 27 },
    '*.age': { age: 27 },
    // 'list.*.value': [1, 2]
};

const mocks_bad = {
    'x_name': null,
    'person.x_age': null,
    'x_person.*': null,
    // 'person.*.age': 27,
    '*.x_age': null,
    // 'list.*.value': 1
};

let getVal;


test.before(() => {
    getVal = valueByKey(mock_base);
});

test('truthy', t => {
    t.is(typeof valueByKey, 'function');

    t.is(typeof getVal, 'function');
});

test('good', t => {
    for (const key in mocks_good) {
        if (mocks_good.hasOwnProperty(key)) {
            const val = mocks_good[key];

            t.deepEqual(getVal(key), val);
        }
    }
});

test('bad', t => {
    for (const key in mocks_bad) {
        if (mocks_bad.hasOwnProperty(key)) {
            const val = mocks_bad[key];

            t.is(getVal(key), undefined);
        }
    }
});
