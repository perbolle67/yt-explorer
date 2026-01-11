// videos.js
// Netlify Function -> proxies 'videos' endpoint
// Query param: id (single or comma-separated)

exports.handler = async function(event) {
  try {
    const id = (event.queryStringParameters && event.queryStringParameters.id) || '';
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing id parameter' }) };
    }

    const key = process.env.YT_API_KEY;
    if (!key) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Server missing YT_API_KEY' }) };
    }

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(id)}&key=${encodeURIComponent(key)}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};
