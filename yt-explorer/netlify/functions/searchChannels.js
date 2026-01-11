import fetch from "node-fetch";

export async function handler(event) {
  const q = event.queryStringParameters.q || "";
  const key = process.env.YT_API_KEY;

  const url =
    "https://www.googleapis.com/youtube/v3/search" +
    "?part=snippet&type=channel&maxResults=8&q=" +
    encodeURIComponent(q) +
    "&key=" + key;

  const res = await fetch(url);
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
