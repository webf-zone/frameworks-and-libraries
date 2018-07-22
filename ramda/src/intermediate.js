const R = require('ramda');

const filterWithWhere = R.compose(
    R.pluck('prop1'),
    R.filter(R.where({
        prop1: R.equals('Match'),
        prop2: R.lt(R.__, 100)
    }))
);

const ifElseConcat = R.compose(
    R.concat('Prepended: '),
    R.ifElse(
        R.propEq('condition', 'Match'),
        R.prop('truthy'),
        R.prop('falsy')
    )
);

const MAXLEN = 10;
const whenLengthyTruncate = R.when(
    R.compose(
        R.gt(R.__, MAXLEN),
        R.prop('length')
    ),
    R.compose(
        R.concat(R.__, '...'),
        R.take(MAXLEN)
    )
);

const prop1Lens = R.lensProp('target');
const lensUppercase = R.over(prop1Lens, R.toUpper);

module.exports = {
    filterWithWhere,
    ifElseConcat,
    whenLengthyTruncate,
    lensUppercase
};
