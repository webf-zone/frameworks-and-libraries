const R = require('ramda');

const isProp1One = R.propEq('prop1', 1);
const isNameOne = R.propEq('name', 'One');

const either = R.either(isProp1One, isNameOne);
const both = R.both(isProp1One, isNameOne);

const slugThroughComposition = R.compose(
    encodeURIComponent,
    R.join('-'),
    R.map(R.toLower),
    R.split(' ')
);

const pathOr = R.pathOr('Error - Field Missing', ['root', 'lvl1', 'lvl2', 'target']);

const sortDescending = R.sort(R.descend(R.identity));
const isFirstEleBiggest = R.converge(
    R.equals,
    [
        R.head,
        R.compose(R.head, sortDescending)
    ]
);

module.exports = {
    either,
    both,
    slugThroughComposition,
    pathOr,
    isFirstEleBiggest
};
