import { ModeToggle } from "@/components/ModeToggle";
import { ErrorBoundary } from "@/components";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <div className="w-screen min-h-dvh fixed flex justify-center pointer-events-none">
        <div className="absolute inset-0 opacity-40 z-[2] dark:bg-radial-dark bg-radial" />
        <div className="absolute inset-0 opacity-40 bg-[url('./assets/grid.svg')] invert dark:invert-0" />
      </div>
      <div className="fixed z-[3] right-4 top-4">
        <ModeToggle />
      </div>
      <main className="relative min-h-dvh h-full flex flex-col p-4 pt-20">
        {children}
      </main>
    </ErrorBoundary>
  );
};

RootLayout.displayName = "RootLayout";
export default RootLayout;
