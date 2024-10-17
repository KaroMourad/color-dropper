import { useEffect, useRef } from "react";

const useInitDropper = (
  isDropperActive: boolean,
  dropperRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (!isDropperActive || !dropperRef.current || workerRef.current) return;
    workerRef.current = new Worker(
      new URL("../worker/cursorWorker.ts", import.meta.url),
      {
        type: "module",
      }
    );
    const offscreenCanvas = dropperRef.current.transferControlToOffscreen();

    workerRef.current.postMessage(
      {
        canvas: offscreenCanvas,
        x: 0,
        y: 0,
      },
      [offscreenCanvas]
    );
  }, [isDropperActive, dropperRef]);
  return { workerRef };
};

export { useInitDropper };
