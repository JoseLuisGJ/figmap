import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/App";

const container = document.getElementById("react-page");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
