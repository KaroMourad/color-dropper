import { useCallback, useState } from "react";
import { copyToClipboard, getCursorColors } from "@/lib/utils";
import { MousePosition } from "@/types/mouse-pos";
import { useToast } from "@/hooks";
import { DATA_TYPE } from "@/lib/configs/worker";

/**
 * useMouseInteractions hook to handle mouse interactions on the board
 * @param isDropperActive - The state of the dropper
 * @param boardRef - The reference to the board canvas element
 * @param workerRef - The reference to the worker
 * @param isResizing - The state of the resizing
 * @returns The selected color, mouse move handler, mouse leave handler, click handler, and touch move handler
 */
const useMouseInteractions = (
  isDropperActive: boolean,
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>,
  workerRef: React.MutableRefObject<Worker | null>,
  isResizing: boolean
) => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const updateData = useCallback(
    (mousePos: MousePosition) => {
      if (!boardRef.current || !isDropperActive) return;
      const { cursorColors, centerColor } = getCursorColors(
        boardRef.current,
        mousePos
      );
      setSelectedColor(centerColor);

      workerRef.current?.postMessage({
        type: DATA_TYPE.UPDATE,
        pos: mousePos,
        centerColor,
        cursorColors,
      });
    },
    [isDropperActive, boardRef, workerRef]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!boardRef.current || !isDropperActive || isResizing) return;
      const borderRect = boardRef.current.getBoundingClientRect();
      const scaleX = boardRef.current.width / boardRef.current.offsetWidth;
      const scaleY = boardRef.current.height / boardRef.current.offsetHeight;
      const mousePos = {
        x: (e.clientX - borderRect.left) * scaleX,
        y: (e.clientY - borderRect.top) * scaleY,
      };
      updateData(mousePos);
    },
    [updateData, isResizing, boardRef, isDropperActive]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (!boardRef.current || !isDropperActive || isResizing) return;
      const borderRect = boardRef.current.getBoundingClientRect();
      const scaleX = boardRef.current.width / boardRef.current.offsetWidth;
      const scaleY = boardRef.current.height / boardRef.current.offsetHeight;
      const mousePos = {
        x: (e.touches[0].clientX - borderRect.left) * scaleX,
        y: (e.touches[0].clientY - borderRect.top) * scaleY,
      };
      updateData(mousePos);
    },
    [updateData, isResizing, boardRef, isDropperActive]
  );

  const handleMouseLeave = useCallback(() => {
    workerRef.current?.postMessage({ type: DATA_TYPE.CLEAR });
  }, [workerRef]);

  const handleClick = useCallback(() => {
    if (!selectedColor || isResizing) return;
    copyToClipboard(selectedColor).then(() => {
      toast({
        title: `Color ${selectedColor} copied to clipboard`,
        variant: "default",
      });
    });
  }, [selectedColor, isResizing, toast]);

  return {
    selectedColor,
    handleMouseMove,
    handleMouseLeave,
    handleClick,
    handleTouchMove,
  };
};

export { useMouseInteractions };
