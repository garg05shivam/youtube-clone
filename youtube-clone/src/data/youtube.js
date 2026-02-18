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

export async function getTrending() {
  const data = await fetchData("/videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 12,
  });

  return data.items;
}

export async function searchVideos(query) {
  const data = await fetchData("/search", {
    part: "snippet",
    q: query,
    type: "video",
    maxResults: 12,
  });

  return data.items;
}
