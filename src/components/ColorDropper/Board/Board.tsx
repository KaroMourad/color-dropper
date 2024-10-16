import React from "react";
import { BOARD_CANVAS_WIDTH, BOARD_CANVAS_HEIGHT } from "@/lib/configs/board";
import { BoardProps } from "./Board.types";
import { cn } from "@/lib/utils";

const Board: React.FC<BoardProps> = ({
  canvasBoardRef,
  isDropperActive,
  handleMouseMove,
  handleMouseLeave,
  handleClick,
  handleTouchMove,
}) => {
  return (
    <canvas
      ref={canvasBoardRef}
      className={cn("bg-black shadow-canvas", {
        "cursor-none": isDropperActive,
      })}
      width={BOARD_CANVAS_WIDTH}
      height={BOARD_CANVAS_HEIGHT}
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseLeave}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};

Board.displayName = "Board";
export default React.memo(Board);
