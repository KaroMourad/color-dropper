import React from "react";

const LayoutBg: React.FC = () => {
  return (
    <div className="w-screen min-h-dvh fixed flex justify-center pointer-events-none">
      <div className="absolute inset-0 opacity-40 bg-[url('./assets/grid.svg')] invert dark:invert-0" />
    </div>
  );
};

export default LayoutBg;
