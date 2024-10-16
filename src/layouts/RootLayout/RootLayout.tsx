import { ModeToggle } from "@/components/ModeToggle";
import { ErrorBoundary } from "@/components";
import LayoutBg from "./LayoutBg";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <LayoutBg />
      <div className="fixed z-[3] right-4 top-4">
        <ModeToggle />
      </div>
      <main className="relative max-w-7xl items-center min-h-dvh h-full w-full flex flex-col mx-auto p-4">
        {children}
      </main>
    </ErrorBoundary>
  );
};

RootLayout.displayName = "RootLayout";
export default RootLayout;
