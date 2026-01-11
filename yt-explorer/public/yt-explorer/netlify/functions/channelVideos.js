import fetch from "node-fetch";

export async function handler(event) {
  const channelId = event.queryStringParameters.channelId;
  const key = process.env.YT_API_KEY;

  if (!channelId) {
    return { statusCode: 400, body: "Missing channelId" };
  }

  const url =
    "https://www.googleapis.com/youtube/v3/search" +
    "?part=snippet&channelId=" +
    channelId +
    "&order=date&type=video&maxResults=12&key=" +
    key;

  const res = await fetch(url);
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
