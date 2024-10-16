import React from "react";

export interface BoardProps {
  canvasBoardRef: React.RefObject<HTMLCanvasElement>;
  handleClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseLeave: () => void;
}
