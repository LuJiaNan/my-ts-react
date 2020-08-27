import React from "../react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Router, Switch, Route, Link } from "../react-router-dom";

import Detail from "../pages/detail";
import Edit from "../pages/edit";
import List from "../pages/list";

export default function RouterView() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            {
              // @ts-ignore
              <Link to="/">List</Link>
            }
          </li>
          <li>
            {
              // @ts-ignore
              <Link to="/detail">Detail</Link>
            }
          </li>
          <li>
            {
              // @ts-ignore
              <Link to="/edit">edit</Link>
            }
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact={true} path="/">
            <List />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
