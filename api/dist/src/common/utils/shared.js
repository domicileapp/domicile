"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToBoolean = exports.chunks = exports.isNullOrUndefined = exports.removeDuplicates = exports.ucFirst = exports.retrieveNameFromEmail = exports.ArraySum = exports.average = exports.isJsObject = exports.isEmpty = exports.isNotEmpty = exports.isClassInstance = exports.isObjectOrFunction = exports.isObject = exports.isFunction = void 0;
function isFunction(item) {
    return item && typeof item === 'function' && !Array.isArray(item);
}
exports.isFunction = isFunction;
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
exports.isObject = isObject;
function isObjectOrFunction(item) {
    return isFunction(item) || isObject(item);
}
exports.isObjectOrFunction = isObjectOrFunction;
function isClassInstance(item) {
    return isObject(item) && item.constructor.name !== 'Object';
}
exports.isClassInstance = isClassInstance;
function isNotEmpty(item) {
    return !isEmpty(item);
}
exports.isNotEmpty = isNotEmpty;
function isEmpty(item) {
    if (item instanceof Array) {
        item = item.filter((val) => !isEmpty(val));
        return item.length === 0;
    }
    else if (item && typeof item === 'object') {
        for (const key in item) {
            if (item[key] === null || item[key] === undefined || item[key] === '') {
                delete item[key];
            }
        }
        return Object.keys(item).length === 0;
    }
    else {
        return (!item ||
            (item + '').toLocaleLowerCase() === 'null' ||
            (item + '').toLocaleLowerCase() === 'undefined');
    }
}
exports.isEmpty = isEmpty;
function isJsObject(object) {
    return object !== null && object !== undefined && typeof object === 'object';
}
exports.isJsObject = isJsObject;
function average(items, column) {
    let sum = 0;
    if (items.length > 0) {
        items.forEach((item) => {
            sum += parseFloat(item[column]);
        });
    }
    return sum / items.length;
}
exports.average = average;
const ArraySum = function (t, n) {
    return parseFloat(t) + parseFloat(n);
};
exports.ArraySum = ArraySum;
function retrieveNameFromEmail(email) {
    if (email) {
        return ucFirst(email.substring(0, email.lastIndexOf('@')), true);
    }
    return;
}
exports.retrieveNameFromEmail = retrieveNameFromEmail;
function ucFirst(str, force) {
    str = force ? str.toLowerCase() : str;
    return str.replace(/(\b)([a-zA-Z])/, function (firstLetter) {
        return firstLetter.toUpperCase();
    });
}
exports.ucFirst = ucFirst;
function removeDuplicates(data) {
    return [...new Set(data)];
}
exports.removeDuplicates = removeDuplicates;
function isNullOrUndefined(string) {
    return typeof string === 'undefined' || string === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function chunks(items, size) {
    const chunks = [];
    items = [].concat(...items);
    while (items.length) {
        chunks.push(items.splice(0, size));
    }
    return chunks;
}
exports.chunks = chunks;
function parseToBoolean(val) {
    return typeof val === 'string' ? JSON.parse(val) : val;
}
exports.parseToBoolean = parseToBoolean;
//# sourceMappingURL=shared.js.map