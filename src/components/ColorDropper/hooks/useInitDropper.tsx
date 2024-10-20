import { useEffect, useRef } from "react";
import { DATA_TYPE } from "@/lib/configs/worker";

/**
 * useInitDropper hook to initialize the dropper worker and offscreen canvas
 * @param dropperRef  The reference to the dropper element
 * @returns  The reference to the worker
 */
const useInitDropper = (
  dropperRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (!dropperRef.current || workerRef.current) return;
    workerRef.current = new Worker(
      new URL("../../../lib/worker/cursorWorker.ts", import.meta.url),
      { type: "module" }
    );
    const offscreenCanvas = dropperRef.current.transferControlToOffscreen();

    workerRef.current.postMessage(
      {
        type: DATA_TYPE.INIT,
        canvas: offscreenCanvas,
      },
      [offscreenCanvas]
    );
  }, [dropperRef, workerRef]);

  return { workerRef };
};

export { useInitDropper };
