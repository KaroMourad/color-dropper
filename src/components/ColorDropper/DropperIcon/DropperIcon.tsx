import React from "react";
import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import { DropperIconProps } from "./DropperIcon.types";

const DropperIcon: React.FC<DropperIconProps> = ({ onClick, isActive }) => {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant={isActive ? "default" : "secondary"}
      className="dropper-icon min-w-[40px] min-h-[40px]"
    >
      <Pipette size={20} />
    </Button>
  );
};

export default React.memo(DropperIcon);
