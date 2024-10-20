import React from "react";
import { cn } from "@/lib/utils";
import { DropperIcon } from "./DropperIcon";
import { ColorInfo } from "./ColorInfo";

import { Board } from "./Board";
import { Dropper } from "./Dropper";

import {
  useInitDropper,
  useResizeContainer,
  useToggleDropper,
  useLoadCanvasImage,
  useMouseInteractions,
  useInitRefs,
} from "./hooks";

import { ErrorBoundary, ImageUploader } from "..";

const ColorDropper: React.FC = () => {
  const { containerRef, boardRef, dropperRef } = useInitRefs();
  const { workerRef } = useInitDropper(dropperRef);
  const { isDropperActive, handleDropperToggle } = useToggleDropper();
  const { isResizing } = useResizeContainer(
    containerRef,
    boardRef,
    dropperRef,
    workerRef
  );
  const { onLoad } = useLoadCanvasImage(boardRef, isResizing);
  const {
    selectedColor,
    handleMouseLeave,
    handleMouseMove,
    handleClick,
    handleTouchMove,
  } = useMouseInteractions(isDropperActive, boardRef, workerRef, isResizing);

  return (
    <ErrorBoundary>
      <div className="flex flex-col w-full flex-1 items-center h-dvh">
        <h1 className="text-2xl mb-4">Color Dropper App</h1>
        <div className="flex w-full mb-2 h-12">
          <DropperIcon
            onClick={handleDropperToggle}
            isActive={isDropperActive}
          />
          <ImageUploader onLoad={onLoad} className="ml-4" />
          {selectedColor && <ColorInfo color={selectedColor} />}
        </div>
        <div
          ref={containerRef}
          className="relative flex max-w-full max-h-full min-w-full flex-1 justify-center"
        >
          {isResizing && (
            <div className="absolute inset-0 z-100 flex items-center justify-center">
              <p className="text-xl text-foreground">Resizing...</p>
            </div>
          )}
          <Board
            className={cn("w-full h-full absolute z-0", {
              hidden: isResizing,
              "cursor-none": isDropperActive,
            })}
            canvasBoardRef={boardRef}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
            handleTouchMove={handleTouchMove}
          />
          <Dropper
            dropperRef={dropperRef}
            className={cn("w-full h-full absolute z-10", {
              hidden: isResizing,
            })}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ColorDropper;
