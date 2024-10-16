/**
 * Get the dimensions of the image to fit inside the canvas
 * @param canvas  The canvas element
 * @param image  The image element
 * @returns The width and height of the image
 */
export function getImageDimensions(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): { width: number; height: number } {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Get original dimensions of the image
  const originalWidth = image.width;
  const originalHeight = image.height;

  // Calculate the aspect ratios
  const canvasAspect = canvasWidth / canvasHeight;
  const imageAspect = originalWidth / originalHeight;

  let newWidth, newHeight;

  // Determine the new dimensions based on aspect ratios
  if (canvasAspect > imageAspect) {
    // Fit to canvas height
    newHeight = canvasHeight;
    newWidth = originalWidth * (canvasHeight / originalHeight);
  } else {
    // Fit to canvas width
    newWidth = canvasWidth;
    newHeight = originalHeight * (canvasWidth / originalWidth);
  }

  return { width: newWidth, height: newHeight };
}
