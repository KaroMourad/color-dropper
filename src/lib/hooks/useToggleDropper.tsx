import { useCallback, useState } from "react";

const useToggleDropper = () => {
  const [isDropperActive, setIsDropperActive] = useState(false);

  const handleDropperToggle = useCallback(() => {
    setIsDropperActive((prev) => !prev);
  }, []);

  return { isDropperActive, handleDropperToggle };
};

export default useToggleDropper;
