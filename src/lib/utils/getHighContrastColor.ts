/**
 * Get the high contrast color for a given hex color
 * @param hex The hex color
 * @returns The high contrast color
 */
export function getHighContrastColor(hex: string) {
  // Remove the '#' if present
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  // Convert hex color to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate the luminance
  const luminance =
    (0.2126 * r) / 255 + (0.7152 * g) / 255 + (0.0722 * b) / 255;

  // If luminance is greater than 0.5, return black; otherwise, return white
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
