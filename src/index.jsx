import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import MainView from "./components/MainView/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Container } from "react-bootstrap";

//Main componet (will eventually use all the others)
const FilmForgeApplication = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <MainView />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

//Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root of the DOM element
root.render(<FilmForgeApplication />);
// root.render(<h1 style={{ padding: '2rem' }}>🛠️ React Is Working!</h1>);
