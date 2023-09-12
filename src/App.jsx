import "./styles/index.scss";
import RoutePath from "./routes/RoutePath";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <RoutePath />
    </>
  );
}

export default App;
