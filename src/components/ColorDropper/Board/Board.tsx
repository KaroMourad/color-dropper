import React from "react";
import { BoardProps } from "./Board.types";
import { cn } from "@/lib/utils";
import { BOARD_INITIAL_HEIGHT, BOARD_INITIAL_WIDTH } from "@/lib/configs/board";

const Board: React.FC<BoardProps> = ({
  canvasBoardRef,
  handleMouseMove,
  handleMouseLeave,
  handleClick,
  handleTouchMove,
  className = "",
}) => {
  return (
    <canvas
      ref={canvasBoardRef}
      className={cn("bg-black", { [className]: !!className })}
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseLeave}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      width={BOARD_INITIAL_WIDTH}
      height={BOARD_INITIAL_HEIGHT}
    />
  );
};

Board.displayName = "Board";
export default React.memo(Board);
