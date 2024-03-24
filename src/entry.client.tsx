import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";

ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <React.StrictMode>
    <BrowserRouter basename="/ssr-react-users">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
