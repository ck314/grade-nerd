import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { UserProvider } from "./contexts/UserContext";
render(<UserProvider><App /></UserProvider>, document.getElementById("root"));