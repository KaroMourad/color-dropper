import { MousePosition } from "@/types/mouse-pos";
import { useCallback, useState } from "react";
import { getCursorColors } from "../utils";

const useSetSelectedColor = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const onMousePosChange = useCallback(({ x, y }: MousePosition) => {
    if (!canvasRef.current) return;
    const { cursorColors, midColor } = getCursorColors(canvasRef.current, x, y);
    setSelectedColor(midColor);
  }, []);

  return { selectedColor, onMousePosChange };
};

export default useSetSelectedColor;