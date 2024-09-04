import "./styles/index.scss";
import { useEffect } from "react";
import RoutePath from "./routes/RoutePath";
import { Toaster } from "react-hot-toast";

function App() {
  const onReload = () => {
    localStorage.removeItem("blogPaginationToken");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onReload);

    return () => {
      window.removeEventListener("beforeunload", onReload);
    };
  });

  return (
    <>
      <Toaster />
      <RoutePath />
    </>
  );
}

export default App;
