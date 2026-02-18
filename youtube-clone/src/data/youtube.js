const BASE_URL = "https://www.googleapis.com/youtube/v3";

function getApiKey() {
  return import.meta.env.VITE_YOUTUBE_API_KEY;
}

async function fetchData(endpoint, params) {
  const key = getApiKey();

  if (!key) {
    throw new Error("API key missing in .env file");
  }

  const searchParams = new URLSearchParams({
    ...params,
    key,
  });

  const url = `${BASE_URL}${endpoint}?${searchParams.toString()}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "YouTube API Error");
  }

  return data;
}

// 🔥 Trending Videos
export async function getTrendingVideos() {
  const data = await fetchData("/videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 12,
  });

  return data.items;
}

// 🔍 Search Videos
export async function searchVideos(query) {
  const data = await fetchData("/search", {
    part: "snippet",
    type: "video",
    q: query,
    maxResults: 20,
  });

  return data.items;
}

// 🎬 Single Video
export async function getVideoById(id) {
  const data = await fetchData("/videos", {
    part: "snippet,statistics",
    id,
  });

  return data.items[0];
}
