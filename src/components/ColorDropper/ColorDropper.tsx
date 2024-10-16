import React, { useRef } from "react";
import { DropperIcon } from "./DropperIcon";
import { ColorInfo } from "./ColorInfo";
import { ErrorBoundary, ImageUploader } from "..";
import { EyeDropper } from "./EyeDropper";
import {
  useLoadImage,
  useSetBoardBindings,
  useSetSelectedColor,
  useToggleDropper,
} from "@/lib/hooks";
import { Board } from "./Board";

const ColorDropper: React.FC = () => {
  const boardRef = useRef<HTMLCanvasElement | null>(null);

  const { onLoad } = useLoadImage(boardRef);
  const { isDropperActive, handleDropperToggle } = useToggleDropper();
  const { selectedColor, onMousePosChange } = useSetSelectedColor(boardRef);
  const { mousePos, handleMouseLeave, handleMouseMove } = useSetBoardBindings(
    boardRef,
    isDropperActive,
    onMousePosChange
  );

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
          <Board
            canvasBoardRef={boardRef}
            handleClick={handleDropperToggle}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
          />
          <EyeDropper mousePos={mousePos} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ColorDropper;
