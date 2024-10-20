import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash-es";

/**
 * useResizeObserver hook to observe the resize of an element and return the dimensions of the element
 * @param ref  The reference of the element to observe
 * @param debounceDelay  The delay to debounce the resize event
 * @returns  The dimensions of the element and a boolean to indicate if the element is resizing
 */
const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  debounceDelay: number = 200
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

  const handleResize = useMemo(
    () =>
      debounce((entry: DOMRectReadOnly) => {
        setDimensions(entry);
        setIsResizing(false);
      }, debounceDelay),
    [debounceDelay]
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }
      setIsResizing(true);
      for (const entry of entries) {
        handleResize(entry.contentRect);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      setIsResizing(false);
      observer.disconnect();
    };
  }, [ref, handleResize]);

  return { isResizing, dimensions };
};

export { useResizeObserver };
