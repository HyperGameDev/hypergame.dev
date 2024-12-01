// Docs on event and context https://docs.netlify.com/functions/build/
const axios = require('axios');

exports.handler = async function(event, context) {
  const apiKey = process.env.HGD_YT_API;

  if (!apiKey) {
    console.error('API key is not set');
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any domain
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ error: 'API key is not configured' })
    };
  }

  console.log('API Key:', apiKey);

  const playlists = [
    { id: 'PLfqB5nWLnc7LpCFS4vdwCoxKdBYRSMYBI', iframeId: 'playlist1' },
    { id: 'PLfqB5nWLnc7K5ZJ9Wc2DUnds9zjyMrvYy', iframeId: 'playlist2' },
    { id: 'PLfqB5nWLnc7JRW5u1vyxx76hzAAdI0FIf', iframeId: 'playlist3' }
  ];

  try {
    const responses = await Promise.all(
      playlists.map(playlist => 
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlist.id}&key=${apiKey}`)
      )
    );

    const results = responses.map((response, index) => {
      const items = response.data.items;
      let latestVideoId;

      for (let i = 0; i < items.length; i++) {
        if (items[i].snippet.liveBroadcastContent !== 'upcoming') {
          latestVideoId = items[i].snippet.resourceId.videoId;
          break;
        }
      }

      console.log('Playlist:', playlists[index].id, 'Latest Video ID:', latestVideoId);

      return { iframeId: playlists[index].iframeId, videoId: latestVideoId };
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any domain
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(results)
    };
  } catch (error) {
    console.error('Error:', error); // Log the full error for your reference
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any domain
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ 
        error: 'Error fetching data from YouTube API',
        message: error.message // Include the error message, but be cautious about exposing sensitive info
      })
    };
  }
};
