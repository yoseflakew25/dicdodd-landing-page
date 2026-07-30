/**
 * Generates a tiny SVG data-URI that Next.js can use as a blur placeholder.
 * The SVG is a simple neutral gradient that looks like a soft shimmer/skeleton,
 * giving users a smooth loading transition before the real image appears.
 */

function toBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

function shimmerSVG(w: number, h: number): string {
  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f1f5f9" />
      <stop offset="50%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`.trim();
}

/**
 * A generic blur placeholder data-URI for any image size.
 * Next.js will blur the SVG, producing a soft neutral glow
 * that works well as a loading placeholder for most photos.
 */
export const BLUR_PLACEHOLDER: string = `data:image/svg+xml;base64,${toBase64(shimmerSVG(100, 100))}`;
