import { adaptError, cn } from "@/lib/utils";
import { useState } from "react";
import { ImageUploaderProps } from "./ImageUploader.types";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

const ImageUploader: React.FC<ImageUploaderProps> = ({ onLoad, className }) => {
  const { toast } = useToast();

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error("No file selected");

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          onLoad(img);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: adaptError(error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("mr-auto relative", className)}>
      <Input type="file" accept="image/*" onChange={loadImage} />
    </div> 
  );
};

export default ImageUploader;
