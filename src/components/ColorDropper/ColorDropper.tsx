import React, { useRef } from "react";
import { DropperIcon } from "./DropperIcon";
import { ColorInfo } from "./ColorInfo";
import { ErrorBoundary, ImageUploader } from "..";
import {
  useInitDropper,
  useLoadImage,
  useMouseInteractions,
  useToggleDropper,
} from "@/hooks";
import { Board } from "./Board";
import { Dropper } from "./Dropper";

const ColorDropper: React.FC = () => {
  const boardRef = useRef<HTMLCanvasElement | null>(null);
  const dropperRef = useRef<HTMLCanvasElement | null>(null);

  const { onLoad } = useLoadImage(boardRef);
  const { isDropperActive, handleDropperToggle } = useToggleDropper();
  const { workerRef } = useInitDropper(isDropperActive, dropperRef);

  const {
    selectedColor,
    handleMouseLeave,
    handleMouseMove,
    handleClick,
    handleTouchMove,
  } = useMouseInteractions(isDropperActive, boardRef, workerRef);

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Color Dropper App</h1>
        <div className="flex w-full mb-2 h-12">
          <DropperIcon
            onClick={handleDropperToggle}
            isActive={isDropperActive}
          />
          <ImageUploader onLoad={onLoad} className="ml-8" />
          {selectedColor && <ColorInfo color={selectedColor} />}
        </div>
        <div className="relative flex items-center">
          <Board
            canvasBoardRef={boardRef}
            isDropperActive={isDropperActive}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
            handleTouchMove={handleTouchMove}
          />
          <Dropper dropperRef={dropperRef} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ColorDropper;
