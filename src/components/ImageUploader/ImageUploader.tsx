import { adaptError, cn } from "@/lib/utils";
import { useState } from "react";
import { ImageUploaderProps } from "./ImageUploader.types";

const ImageUploader: React.FC<ImageUploaderProps> = ({ onLoad, className }) => {
  const [error, setError] = useState<Error | null>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
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
      setError(new Error(adaptError(error).message));
    }
  };

  return (
    <div className={cn("mr-auto", className)}>
      <input type="file" accept="image/*" onChange={loadImage} />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default ImageUploader;
