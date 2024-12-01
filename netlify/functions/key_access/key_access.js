// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// functions/key_access.js
const axios = require('axios');

exports.handler = async function() {
  const apiKey = process.env.HGD_YT_API;


  try {
    // Use the API key to make a request to the YouTube API
    const response = await axios.get(https://www.googleapis.com/youtube/v3/some-endpoint?key=${apiKey});


return {
  statusCode: 200,
  body: JSON.stringify(response.data)
};

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data from YouTube API' })
    };
  }
}