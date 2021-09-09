const axios = require('axios').default;

/**
 * @description This function makes a get request to the given URL
 * and returns the response in the form of an object containing the html content
 * @param {string} url
 * @return {Promise<object>} axios data object
 */
const getBursaryData = async (url) => {
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getBursaryData;
