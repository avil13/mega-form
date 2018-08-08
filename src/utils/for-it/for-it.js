
//
export default function(obj, callback) {
    if (typeof obj === 'object') {
        if (obj === null) {
            return null;
        }

        if (Array.isArray(obj)) {
            for (let i=0; i < obj.length; i++) {
                callback(i, obj[i], true);
            }
        } else {
            for (let k in obj) {
                if (obj.hasOwnProperty(k)) {
                    callback(k, obj[k], false);
                }
            }
        }
    }
}
