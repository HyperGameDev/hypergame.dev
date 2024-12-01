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

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
            params: {
                part: 'snippet',
                playlistId: 'UU5TfuWJq9iU-gUp4nXr0z3Q', // "Uploads" playlist ID
                maxResults: 5,
                key: apiKey
            }
        });

        const items = response.data.items.map(item => ({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url
        }));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow requests from any domain
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ videos: items }) // Return only videos
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
