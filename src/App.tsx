import { Suspense } from "react";
import { ColorDropper, Loading } from "./components";
import { RootLayout } from "./layouts/RootLayout";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RootLayout>
        <ColorDropper />
      </RootLayout>
      <Toaster />
    </Suspense>
  );
}

export default App;
