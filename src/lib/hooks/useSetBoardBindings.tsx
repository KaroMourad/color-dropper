import { useCallback, useState } from "react";
import { MousePosition } from "@/types/mouse-pos";

const useSetBoardBindings = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  isDropperActive: boolean,
  onMouseMoveCb: (pos: MousePosition) => void
) => {
  const [mousePos, setMousePos] = useState<MousePosition | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !isDropperActive) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      onMouseMoveCb({ x, y });
    },
    [isDropperActive, onMouseMoveCb]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return { mousePos, handleMouseMove, handleMouseLeave };
};

export default useSetBoardBindings;
