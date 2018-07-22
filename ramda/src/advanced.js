const R = require('ramda');

const useWithReducer = R.useWith(
    R.flip(R.append),
    [
        R.init,
        R.prop('payload')
    ]
);

const groupByScore = R.groupBy(
    student => student.score > 40 ? 'Passed' : 'Failed'
);

const sortWithMultipleFields = R.sortWith([
    R.descend(R.prop('score')),
    R.ascend(R.prop('name'))
]);

const hasJohnScoredTen = R.allPass([
    R.propEq('name', 'John'),
    R.propEq('score', 10)
]);

module.exports = {
    useWithReducer,
    groupByScore,
    sortWithMultipleFields,
    hasJohnScoredTen
};
