import { MousePosition } from "@/types/mouse-pos";
import { rgbToHex } from ".";
import { GLASS_HEIGHT, GLASS_WIDTH, RECT_SIZE } from "../configs/dropper";

/**
 * Get the colors of the dropper from the canvas in hex format and the center color of the dropper
 * @param canvas  The canvas element
 * @param x  The x coordinate of the dropper
 * @param y  The y coordinate of the dropper
 * @returns The colors of the dropper and the center color
 */
export const getCursorColors = (
  canvas: HTMLCanvasElement,
  mousePos: MousePosition
): {
  cursorColors: string[];
  centerColor: string;
} => {
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!ctx) return { cursorColors: [], centerColor: "" };

  const { x, y } = mousePos;
  const imgData = ctx.getImageData(
    x,
    y,
    GLASS_WIDTH / RECT_SIZE,
    GLASS_HEIGHT / RECT_SIZE
  );
  const rectData = imgData.data;
  const dropperColors = [];
  for (let i = 0; i < rectData.length; i += 4) {
    const hex = rgbToHex(rectData[i], rectData[i + 1], rectData[i + 2]);
    dropperColors.push(hex);
  }
  const centerColor = dropperColors[Math.floor(dropperColors.length / 2)];
  return {
    cursorColors: dropperColors,
    centerColor,
  };
};
