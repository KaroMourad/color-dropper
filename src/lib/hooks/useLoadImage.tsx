import { useCallback, useEffect } from "react";
import DefaultImage from "/default.jpg";
import { getImageDimensions } from "@/lib/utils";

const useLoadImage = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const onLoad = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const { width, height } = getImageDimensions(canvas, img);
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the image at the center of the canvas
    ctx.drawImage(
      img,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height
    );
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = DefaultImage;
    img.onload = () => onLoad(img);
  }, [onLoad]);

  return { onLoad };
};

export default useLoadImage;
