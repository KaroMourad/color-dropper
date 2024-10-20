import { useRef } from "react";

/**
 * useInitRefs hook to initialize the refs for the container, board, and dropper
 * @returns  The refs for the container, board, and dropper
 */
const useInitRefs = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLCanvasElement | null>(null);
  const dropperRef = useRef<HTMLCanvasElement | null>(null);

  return { containerRef, boardRef, dropperRef };
};

export { useInitRefs };
