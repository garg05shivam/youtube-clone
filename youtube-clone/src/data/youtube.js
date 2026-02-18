const BASE_URL = "https://www.googleapis.com/youtube/v3";

function getKey() {
  return import.meta.env.VITE_YOUTUBE_API_KEY;
}

async function fetchData(endpoint, params) {
  const key = getKey();

  const url = `${BASE_URL}${endpoint}?${new URLSearchParams({
    ...params,
    key,
  })}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error.message);

  return data;
}

// 🔥 Format Video Properly
function formatVideo(item) {
  return {
    id: item.id?.videoId || item.id,
    title: item.snippet?.title,
    channel: item.snippet?.channelTitle,
    thumbnail: item.snippet?.thumbnails?.medium?.url,
  };
}

// 🔥 Trending Videos (With Pagination)
export async function getTrending(pageToken = "") {
  const data = await fetchData("/videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 12,
    pageToken,
  });

  const formatted = data.items.map(formatVideo);

  return {
    videos: formatted,
    nextPageToken: data.nextPageToken,
    prevPageToken: data.prevPageToken,
  };
}

// 🔥 Search Videos
export async function searchVideos(query, pageToken = "") {
  const data = await fetchData("/search", {
    part: "snippet",
    q: query,
    type: "video",
    maxResults: 12,
    pageToken,
  });

  return {
    videos: data.items.map(formatVideo),
    nextPageToken: data.nextPageToken,
  };
}
