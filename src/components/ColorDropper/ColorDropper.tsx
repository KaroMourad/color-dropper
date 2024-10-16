import React, { useEffect, useRef, useState } from "react";
import { DropperIcon } from "./DropperIcon";
import { ColorInfo } from "./ColorInfo";
import { BOARD_CONFIG } from "@/lib/configs/board";
import { getDropperColors, getImageDimensions } from "@/lib/utils";
import { ErrorBoundary, ImageUploader } from "..";
import DefaultImage from "@/assets/default.jpg";
import { EyeDropper } from "./EyeDropper";

const ColorDropper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDropperActive, setIsDropperActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleDropperToggle = () => {
    setIsDropperActive((prev) => !prev);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isDropperActive) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    const dropperColors = getDropperColors(canvasRef.current, x, y);
    if (!dropperColors) return;

    const selectedColor = dropperColors[Math.floor(dropperColors.length / 2)];

    setSelectedColor(selectedColor);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const onLoad = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
  };

  useEffect(() => {
    const img = new Image();
    img.src = DefaultImage;
    img.onload = () => {
      onLoad(img);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Color Dropper App</h1>

        <div className="flex items-center w-full mb-2">
          <DropperIcon
            onClick={handleDropperToggle}
            isActive={isDropperActive}
          />
          <ImageUploader onLoad={onLoad} className="ml-4" />
          {selectedColor && <ColorInfo color={selectedColor} />}
        </div>

        <div className="relative flex items-center">
          <canvas
            ref={canvasRef}
            className="bg-muted shadow-canvas"
            width={BOARD_CONFIG.WIDTH}
            height={BOARD_CONFIG.HEIGHT}
            onClick={handleDropperToggle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          <EyeDropper mousePos={mousePos} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ColorDropper;
