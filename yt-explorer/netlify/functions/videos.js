import fetch from "node-fetch";

export async function handler(event) {
  const id = event.queryStringParameters.id;
  const key = process.env.YT_API_KEY;

  if (!id) {
    return { statusCode: 400, body: "Missing id" };
  }

  const url =
    "https://www.googleapis.com/youtube/v3/videos" +
    "?part=snippet,contentDetails,statistics&id=" +
    id +
    "&key=" + key;

  const res = await fetch(url);
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
