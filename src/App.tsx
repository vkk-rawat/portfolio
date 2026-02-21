import { useEffect } from "react";
import "./App.css";
import Terminal from "./components/terminal";
import { Analytics } from "@vercel/analytics/react";
import { analytics } from "./utils/analytics";

function App() {
  useEffect(() => {
    analytics.pageView();
  }, []);

  return (
    <>
      <Terminal />
      <Analytics />
    </>
  );
}

export default App;
