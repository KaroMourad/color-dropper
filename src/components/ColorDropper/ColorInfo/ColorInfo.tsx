import { Button } from "@/components/ui/button";
import { copyToClipboard, getHighContrastColor } from "@/lib/utils";
import React from "react";
import { Copy, CopyCheck } from "lucide-react";
import { ColorInfoProps } from "./ColorInfo.types";
import { useToast } from "@/hooks";

const ColorInfo: React.FC<ColorInfoProps> = ({ color }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = React.useState(false);

  const onCopyColor = () => {
    copyToClipboard(color).then(() => {
      toast({
        title: `Color ${color} copied to clipboard`,
        variant: "default",
      });
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    });
  };

  return (
    <div className="inline-flex">
      <Button
        variant="outline"
        style={{
          backgroundColor: color,
          color: getHighContrastColor(color),
        }}
        onClick={onCopyColor}
      >
        <span className="mr-2 w-16">{color}</span>
        {isCopied ? <CopyCheck size={20} /> : <Copy size={20} />}
      </Button>
    </div>
  );
};

export default ColorInfo;
