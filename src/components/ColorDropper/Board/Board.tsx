import React from "react";
import { BOARD_CANVAS_WIDTH, BOARD_CANVAS_HEIGHT } from "@/lib/configs/board";
import { BoardProps } from "./Board.types";

const Board: React.FC<BoardProps> = ({
  canvasBoardRef,
  handleClick,
  handleMouseMove,
  handleMouseLeave,
}) => {
  return (
    <canvas
      ref={canvasBoardRef}
      className="bg-black shadow-canvas"
      width={BOARD_CANVAS_WIDTH}
      height={BOARD_CANVAS_HEIGHT}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

Board.displayName = "Board";
export default React.memo(Board);
