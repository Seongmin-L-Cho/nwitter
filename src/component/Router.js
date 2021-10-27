import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route exact path="/">
            <Home />
          </Route>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
