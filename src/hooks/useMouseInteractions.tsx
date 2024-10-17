import { useCallback, useState } from "react";
import { copyToClipboard, getCursorColors } from "../lib/utils";
import { MousePosition } from "@/types/mouse-pos";
import { useToast } from "@/hooks/use-toast";

const useMouseInteractions = (
  isDropperActive: boolean,
  boardRef: React.MutableRefObject<HTMLCanvasElement | null>,
  workerRef: React.MutableRefObject<Worker | null>
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
        pos: mousePos,
        centerColor,
        cursorColors,
      });
    },
    [boardRef, isDropperActive, workerRef]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!boardRef.current || !isDropperActive) return;
      const borderRect = boardRef.current.getBoundingClientRect();
      const mousePos = {
        x: e.clientX - borderRect.left,
        y: e.clientY - borderRect.top,
      };
      updateData(mousePos);
    },
    [updateData]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (!boardRef.current || !isDropperActive) return;
      const borderRect = boardRef.current.getBoundingClientRect();
      const mousePos = {
        x: e.touches[0].clientX - borderRect.left,
        y: e.touches[0].clientY - borderRect.top,
      };
      updateData(mousePos);
    },
    [updateData]
  );

  const handleMouseLeave = useCallback(() => {
    workerRef.current?.postMessage({ clear: true });
  }, [workerRef]);

  const handleClick = useCallback(() => {
    if (!selectedColor) return;
    copyToClipboard(selectedColor).then(() => {
      toast({
        title: `Color ${selectedColor} copied to clipboard`,
        variant: "default",
      });
    });
  }, [selectedColor]);

  return {
    selectedColor,
    handleMouseMove,
    handleMouseLeave,
    handleClick,
    handleTouchMove,
  };
};

export { useMouseInteractions };
