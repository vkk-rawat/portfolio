import "./App.css";
import Terminal from "./components/terminal";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Terminal />
      <Analytics />
    </>
  );
}

export default App;
