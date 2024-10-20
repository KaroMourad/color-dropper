import { useCallback, useEffect } from "react";
import DefaultImage from "/default.jpg";
import { getImageDimensions } from "@/lib/utils";

/**
 * useLoadCanvasImage hook to load the image on the canvas
 * @param canvasRef  The reference to the canvas element
 * @param isResizing  The state of the resizing
 * @returns  The image load handler
 */
const useLoadCanvasImage = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  isResizing: boolean
) => {
  const onLoad = useCallback(
    (img: HTMLImageElement) => {
      if (isResizing) return;

      localStorage.setItem("lastImage", img.src);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      const { width: imgWidth, height: imgHeight } = getImageDimensions(
        canvas,
        img
      );

      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image at the center of the canvas
      ctx.drawImage(
        img,
        (canvas.width - imgWidth) / 2,
        (canvas.height - imgHeight) / 2,
        imgWidth,
        imgHeight
      );
    },
    [canvasRef, isResizing]
  );

  useEffect(() => {
    if (isResizing) return;
    const img = new Image();
    img.src = localStorage.getItem("lastImage") || DefaultImage;
    img.onload = () => onLoad(img);
  }, [onLoad, isResizing]);

  return { onLoad };
};

export { useLoadCanvasImage };
