// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </ChakraProvider>
  </Provider>
  // </React.StrictMode>
);
