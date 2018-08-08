// @ts-check
import forIt from '../for-it/for-it';

export default function(obj) {
    return function(path) {
        if (path.indexOf('.') > -1) {
            return parseDotted(obj, path);
        }

        return obj[path];
    }
}


function parseDotted(obj, path) {
    if (typeof obj !== 'object') {
        return;
    }

    const keys = path.split('.');

    let val = Object.assign({}, obj);

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        if (k === '*') {
            val = findWithStar(val, keys.splice(i + 1));
            break;
        }

        if (!val[k]) {
            return;
        }

        val = val[k];
    }

    return val;
}

function findWithStar(value, keys) {
    let is_array;
    let res_arr = [];
    let res_obj = {};
    let res;

    if (keys.length) {
        // поиск после этого элемента будет продолжаться рекурсивно
        const current_key = keys[0];

        forIt(value, (key, val, is_arr) => {
            const v = parseDotted(val, current_key);
            if (v !== undefined) {
                if (is_arr && val[current_key] !== undefined) {
                    // 'list.*.value'
                    is_array = is_arr;
                    res_arr.push(val[current_key]);

                } else
                if (v === val[current_key]) {
                    // '*.age'
                    res = v;
                }
            }
        });
    } else {
        // возвращаем все элементы
        forIt(value, (key, val, is_arr) => {
            is_array = is_arr;

            if (is_arr) {
                res_arr.push(val);
            } else {
                res_obj[key] = val;
            }
        });
    }


    if (is_array === undefined) {
        return res;
    }

    return is_array ? res_arr : res_obj;
}
