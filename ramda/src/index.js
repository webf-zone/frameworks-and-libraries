const curry = require('./core-javascript-curry');

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

// they all are fine
console.log (
    curriedAdd(1, 2, 3),
    curriedAdd(1, 2)(3),
    curriedAdd(1)(2, 3),
    curriedAdd(1)(2)(3)
);
