import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App.tsx";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}
