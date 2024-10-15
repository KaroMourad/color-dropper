import { LoadingProps } from "./Loading.types";

const Loading: React.FC<LoadingProps> = ({
  className = "",
  size = "md",
  text = "",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full flex-1">
      <div
        className={`animate-spin inline-block rounded-full border-t-2 border-b-2 border-ring dark:border-ring-foreground ${className} ${sizes[size]}`}
      />
      {text && <span className="mt-4">{text}</span>}
    </div>
  );
};

Loading.displayName = "Loading";
export default Loading;
