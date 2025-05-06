// Note:  Please do not change the pre-written code

// import the required module here
const { sum, mean } = require('./math');
const Solution = () => {
    const nums = [1, 2, 3, 4, 5];
    // write your code here to Display the results of the calculations on the console.
    const totalSum = sum(nums);
    const average = mean(nums);
    console.log('The Sum is', totalSum);
    console.log('The Mean is', average);
};
Solution();
module.exports = Solution;
