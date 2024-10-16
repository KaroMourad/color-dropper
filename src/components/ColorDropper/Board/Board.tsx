import { BOARD_CONFIG } from "@/lib/configs/board";
import { BoardProps } from "./Board.types";
import React from "react";

const Board: React.FC<BoardProps> = ({
  canvasBoardRef,
  handleClick,
  handleMouseMove,
  handleMouseLeave,
}) => {
  return (
    <canvas
      ref={canvasBoardRef}
      className="bg-muted shadow-canvas"
      width={BOARD_CONFIG.WIDTH}
      height={BOARD_CONFIG.HEIGHT}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

Board.displayName = "Board";
export default React.memo(Board);
