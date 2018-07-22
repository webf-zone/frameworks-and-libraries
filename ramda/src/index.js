const curry = require('./core-javascript-curry');
const basics = require('./basics');
const intermediate = require('./intermediate');
const advanced = require('./advanced');

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

console.log(`Filtering array of objects with 'where'
    Results:\n`,
    intermediate.filterWithWhere([
        { prop1: 'Mismatch', prop2: 1000 },
        { prop1: 'Another mismatch', prop2: 200 },
        { prop1: 'Match', prop2: 10 },
        { prop1: 'No match', prop2: 100 }
    ])
);

console.log(`ifElse with string concatination
    Results:\n`,
    intermediate.ifElseConcat({
        condition: 'Match',
        truthy: 'Positive',
        falsy: 'Negative'
    }), '\n',
    intermediate.ifElseConcat({
        condition: 'Mismatch',
        truthy: 'Positive',
        falsy: 'Negative'
    })
);

console.log(`Truncate string 'when' lengthy
    Results:\n`,
    intermediate.whenLengthyTruncate('I am Short'), '\n',
    intermediate.whenLengthyTruncate('Truncate me')
);

console.log(`Lens to upperCase an Object property
    Results:\n`,
    intermediate.lensUppercase({ target: 'name is kumar' })
)

console.log(`Updating state with useWith
    Results:\n`,
    advanced.useWithReducer(
        [1, 2, 3],
        { payload: 4 }
    )
);

const students = [
    { name: 'John', score: 10 },
    { name: 'Lisa', score: 60 },
    { name: 'Betty', score: 20 },
    { name: 'James', score: 10 },
    { name: 'Arthur', score: 70 }
];

console.log(`Grouping students by scoring results
    Results:\n`,
    advanced.groupByScore(students)
);

console.log(`Sorting an array of objects on multiple fields
    Results:\n`,
    advanced.sortWithMultipleFields(students)
);

console.log(`Using predicates to check multiple conditions
    Results:\n`,
    advanced.hasJohnScoredTen({ name: 'John', score: 10 })
)
