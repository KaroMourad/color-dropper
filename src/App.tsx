import { Suspense } from "react";
import { ColorDropper, Loading } from "./components";
import { RootLayout } from "./layouts/RootLayout";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RootLayout>
        <ColorDropper />
      </RootLayout>
    </Suspense>
  );
}

export default App;
