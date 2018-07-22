const R = require('ramda');

const isProp1One = R.propEq('prop1', 1);
const isNameOne = R.propEq('name', 'One');

const slug = R.compose(
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
    'either': R.either(isProp1One, isNameOne),
    'both': R.both(isProp1One, isNameOne),
    'slugThroughComposition': slug,
    'pathOr': pathOr,
    'isFirstEleBiggest': isFirstEleBiggest
};
