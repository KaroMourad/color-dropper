import { useLayoutEffect } from "react";
import { useResizeObserver } from "@/hooks";
import { DATA_TYPE } from "@/lib/configs/worker";

/**
 * useResizeContainer hook to resize the container and the board
 * @param containerRef  The reference to the container element
 * @param boardRef  The reference to the board element
 * @param dropperRef  The reference to the dropper element
 * @param workerRef  The reference to the worker
 * @returns  The state of the resizing and the dimensions of the container
 */
const useResizeContainer = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>,
  dropperRef: React.MutableRefObject<HTMLCanvasElement | null>,
  workerRef: React.MutableRefObject<Worker | null>
) => {
  const { isResizing, dimensions } = useResizeObserver(containerRef, 200);

  useLayoutEffect(() => {
    if (dimensions) {
      const { width, height } = dimensions;

      // Resize the board canvas
      if (boardRef.current) {
        boardRef.current.width = width;
        boardRef.current.height = height;
      }

      // Resize the dropper canvas
      if (dropperRef.current && workerRef.current) {
        workerRef.current.postMessage({
          type: DATA_TYPE.RESIZE,
          width,
          height,
        });
      }
    }
  }, [isResizing, dimensions, boardRef, dropperRef, workerRef]);

  return {
    isResizing,
    dimensions,
  };
};

export { useResizeContainer };
