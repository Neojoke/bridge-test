import React from "react";
import { Router, Route, Switch } from "dva/router";
import dynamic from "dva/dynamic";
function RouterConfig({ history, app }) {
  var bridge = import("./models/bridge");
  const IndexPage = dynamic({
    app,
    models: () => [bridge],
    component: () => import("./routes/IndexPage")
  });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
