module.exports = function curry (fn) {
    const argsLen = fn.length;

    return function curried (...args) {
        if (args.length >= argsLen) {
            return fn(...args);
        } else {
            return function (...nextArgs) {
                return curried(...args.concat(nextArgs));
            }
        }
    }
}
