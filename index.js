// Please do not change the prewritten code
const axios = require('axios');


const Solution = async () => {
  // Write your code here
  try {
    const response = await axios.get('https://api.codingninjas.com/api/v3/event_tags');
    
    // iii) Retrieve response data
    const data = response.data;

    // iv) Print the response to console
    console.log('Event Tags:', data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};
Solution();
module.exports = Solution;
