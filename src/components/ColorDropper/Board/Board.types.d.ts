import React from "react";

export interface BoardProps {
  canvasBoardRef: React.RefObject<HTMLCanvasElement>;
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseLeave: () => void;
  handleClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleTouchMove: (event: React.TouchEvent<HTMLCanvasElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}
