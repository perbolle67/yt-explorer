// searchVideos.js
// Netlify Function -> proxies YouTube search (video results)
// Expects query param: q
// Ensure you add YT_API_KEY as an environment variable in Netlify.

exports.handler = async function(event) {
  try {
    const q = (event.queryStringParameters && event.queryStringParameters.q) || '';
    if (!q) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing q parameter' }) };
    }

    const key = process.env.YT_API_KEY;
    if (!key) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Server missing YT_API_KEY' }) };
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=24&q=${encodeURIComponent(q)}&key=${encodeURIComponent(key)}`;

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
