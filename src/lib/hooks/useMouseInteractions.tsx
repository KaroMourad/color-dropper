import { useCallback, useState } from "react";
import { getCursorColors } from "../utils";

const useMouseInteractions = (
  isDropperActive: boolean,
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>,
  workerRef: React.MutableRefObject<Worker | null>
) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!boardRef.current || !isDropperActive) return;
      const borderRect = boardRef.current.getBoundingClientRect();

      const mousePos = {
        x: e.clientX - borderRect.left,
        y: e.clientY - borderRect.top,
      };

      const { cursorColors, centerColor } = getCursorColors(
        boardRef.current,
        mousePos
      );
      setSelectedColor(centerColor);

      workerRef.current?.postMessage({
        pos: mousePos,
        centerColor,
        cursorColors,
      });
    },
    [isDropperActive, boardRef, workerRef]
  );

  const handleMouseLeave = useCallback(() => {
    workerRef.current?.postMessage({ clear: true });
  }, [workerRef]);

  return { selectedColor, handleMouseMove, handleMouseLeave };
};

export { useMouseInteractions };
