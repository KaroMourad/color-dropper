import { Suspense } from "react";
import { Loading } from "./components";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RootLayout>heloo</RootLayout>
    </Suspense>
  );
}

export default App;
