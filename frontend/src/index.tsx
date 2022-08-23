import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./stores/store";
import { MainPageContainer } from "./pages";

import "./index.scss";

class Viewer extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    return <MainPageContainer showSlideShow={true} />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Viewer />
  </Provider>,
  document.getElementById("root")
);
