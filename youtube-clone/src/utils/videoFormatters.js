export function formatViews(viewCount) {
  if (!viewCount && viewCount !== 0) return "Views unavailable";
  return `${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(viewCount)} views`;
}

export function formatPublishedDate(dateString) {
  if (!dateString) return "Date unavailable";
  const then = new Date(dateString);
  const now = new Date();
  const diffMs = now - then;
  const day = 1000 * 60 * 60 * 24;
  const month = day * 30;
  const year = day * 365;

  if (diffMs < day) return "Today";
  if (diffMs < month) return `${Math.floor(diffMs / day)} days ago`;
  if (diffMs < year) return `${Math.floor(diffMs / month)} months ago`;
  return `${Math.floor(diffMs / year)} years ago`;
}
