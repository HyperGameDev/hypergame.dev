// Docs on event and context https://docs.netlify.com/functions/build/
const axios = require('axios');

exports.handler = async function(event, context) {
  const apiKey = process.env.HGD_YT_API;

  if (!apiKey) {
    console.error('API key is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key is not configured' })
    };
  }

  try {
    // Correct endpoint for fetching playlist items
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=YOUR_PLAYLIST_ID&key=${apiKey}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error:', error); // Log the full error for your reference
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error fetching data from YouTube API',
        message: error.message // Include the error message, but be cautious about exposing sensitive info
      })
    };
  }
};
