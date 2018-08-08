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
    const keys = path.split('.');

    let val = Object.assign({}, obj);

    for (let i=0; i < keys.length; i++) {
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
    let res_arr= [];
    let res_obj= {};

    if (keys.length) {
        // поиск после этого элемента будет продолжаться рекурсивно
        forIt(value, (key, val, _is_array) => {
            //
        });
    } else {
        // возвращаем все элементы
        forIt(value, (key, val, _is_array) => {
            is_array = _is_array;

            if (_is_array) {
                res_arr.push(val);
            } else {
                res_obj[key] = val;
            }
        });
    }

    return is_array ? res_arr : res_obj;
}
