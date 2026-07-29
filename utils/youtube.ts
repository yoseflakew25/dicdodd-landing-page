/**
 * Extracts the YouTube video ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function getYoutubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  throw new Error(`Invalid YouTube URL: ${url}`);
}

/**
 * Generates a YouTube thumbnail URL for a given video URL or ID.
 * Uses hqdefault (480x360) — use "maxresdefault" for HD if available.
 */
export function getThumbnail(url: string, quality: "hqdefault" | "maxresdefault" = "hqdefault"): string {
  const id = getYoutubeId(url);
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}
