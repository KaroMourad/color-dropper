import { useCallback, useState } from "react";

/**
 * useToggleDropper hook to toggle the dropper state between active and inactive
 * @returns  The state of the dropper and a function to toggle the dropper state
 */
const useToggleDropper = () => {
  const [isDropperActive, setIsDropperActive] = useState(false);

  const handleDropperToggle = useCallback(() => {
    setIsDropperActive((prev) => !prev);
  }, []);

  return { isDropperActive, handleDropperToggle };
};

export { useToggleDropper };
