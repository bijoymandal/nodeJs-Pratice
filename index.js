// Import required module
const readline = require('readline');
const Solution = () => {
  // Write your code here
  const qInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  qInterface.question('Enter the first number: ', (input1) => {
    const num1 = Number(input1);
    qInterface.question('Enter the second number: ', (input2) => {
        const num2 = Number(input2);
        const max = Math.max(num1, num2);
        console.log(`The maximum value is: ${max}`);
        qInterface.close();
    });
  });
};

Solution();
module.exports = Solution;
