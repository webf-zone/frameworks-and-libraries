const curry = require('./core-javascript-curry');
const basics = require('./basics');

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

// they all are fine
console.log (`Curry function with Core JavaScript.
    Testing signatures:
    (1) fn(a1, a2, a3)
    (2) fn(a1)(a2, a3)
    (3) fn(a1, a2)(a3)
    (4) fn(a1)(a2)(a3)
    Results:\n`,
    curriedAdd(1, 2, 3),
    curriedAdd(1, 2)(3),
    curriedAdd(1)(2, 3),
    curriedAdd(1)(2)(3)
);

console.log('----------- RAMDA -----------');

console.log(`Simple Ramda utilities - either and both.
    Results:\n`,
    basics.either({
        prop1: 1,
        name: 'Not One'
    }), '\n',
    basics.both({
        prop1: 1,
        name: 'One'
    })
);

console.log(`Function composition
    Results:\n`,
    basics.slugThroughComposition('Composition is damn beautiful')
);

console.log(`pathOr to handle uncertain deep object level fields
    Results:\n`,
    basics.pathOr({
        root: {
            lvl1: {
                lvl2: {
                    target: 'Match'
                }
            }
        }
    }), '\n',
    basics.pathOr({root: 'Mismatch'})
);

console.log(`Converge and compose together
    Results:\n`,
    basics.isFirstEleBiggest([4, 2, 1, 3]), '\n',
    basics.isFirstEleBiggest([1, 2, 3, 4])
);
