// 1-IMPORT FRAMEWORK(FUNCTIONS AND MODELS) OF REACT
// Built based on examples (here adopt the "counter-app") from https://reactjs.org/community/examples.html
import React from "react";
import ReactDOM from "react-dom";

// import "./index.css";

// 2-DEFINE THE ROUTING
import App from "./App";

// 3-START REACT - A ASYNC WATERFLOW TO PARSE SOME VARIABLES AS PROPERTIES
// strict-mode give additional debugger, detail here https://reactjs.org/docs/strict-mode.html
ReactDOM
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('locator')
    );
  