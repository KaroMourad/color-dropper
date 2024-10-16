import { rgbToHex } from ".";
import { DROPPER_CONFIG } from "../configs/dropper";

/**
 * Get the colors of the dropper from the canvas
 * @param canvas  The canvas element
 * @param x  The x coordinate of the dropper
 * @param y  The y coordinate of the dropper
 * @returns The colors of the dropper in hex format or undefined if the context is not available
 */
export const getDropperColors = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number
): string[] | undefined => {
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!ctx) return;

  const rectData = ctx.getImageData(
    x,
    y,
    DROPPER_CONFIG.RECT_COUNT,
    DROPPER_CONFIG.RECT_COUNT
  ).data;
  const hexColors = [];
  for (let i = 0; i < rectData.length; i += 4) {
    const hex = rgbToHex(rectData[i], rectData[i + 1], rectData[i + 2]);
    hexColors.push(hex);
  }
  return hexColors;
};
