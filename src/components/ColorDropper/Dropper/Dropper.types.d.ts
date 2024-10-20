import React from "react";

export interface DropperProps {
  dropperRef: React.MutableRefObject<HTMLCanvasElement | null>;
  className?: string;
  style?: React.CSSProperties;
}
