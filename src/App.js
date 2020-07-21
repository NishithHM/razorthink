import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Home } from "./pages";
import { Footer, Modal } from "./component";
function App(props) {
  return (
    <div className="App">
      <div>
        <Route render={() => <Home {...props} />} path="/" />
        <Route render={() => <Modal {...props} />} path="/modal" />
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
