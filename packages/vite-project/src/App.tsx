import { Suspense, lazy } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

// Works also with SSR as expected
const Card = lazy(() => import("./Card"));

function App() {
  return (
    <>
      <h1>RedditUI</h1>
      <Suspense fallback={<p>Loading card component...</p>}>
        <Card />
      </Suspense>
    </>
  );
}

export default App;
