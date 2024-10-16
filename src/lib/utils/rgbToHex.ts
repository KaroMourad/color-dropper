/**
 * Convert RGB to HEX color
 * @param r red color value
 * @param g green color value
 * @param b blue color value
 * @returns The HEX color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
