import { rgbToHex } from ".";
import { DROPPER_CONFIG } from "../configs/dropper";

/**
 * Get the colors of the dropper from the canvas in hex format and the mid color of the dropper
 * @param canvas  The canvas element
 * @param x  The x coordinate of the dropper
 * @param y  The y coordinate of the dropper
 * @returns The colors of the dropper and the mid color
 */
export const getCursorColors = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number
): {
  cursorColors: string[];
  midColor: string;
} => {
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!ctx) return { cursorColors: [], midColor: "" };

  const rectData = ctx.getImageData(
    x,
    y,
    DROPPER_CONFIG.RECT_COUNT,
    DROPPER_CONFIG.RECT_COUNT
  ).data;
  const dropperColors = [];
  for (let i = 0; i < rectData.length; i += 4) {
    const hex = rgbToHex(rectData[i], rectData[i + 1], rectData[i + 2]);
    dropperColors.push(hex);
  }
  const midColor = dropperColors[Math.floor(dropperColors.length / 2)];
  return {
    cursorColors: dropperColors,
    midColor,
  };
};
