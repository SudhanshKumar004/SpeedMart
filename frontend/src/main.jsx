import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { Provider } from "react-redux";
import store from "./store.jsx";
import LoginContext from "./LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LoginContext>
      <App />
    </LoginContext>
  </Provider>
);
