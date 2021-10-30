import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Navigation from "./Navigation";
import Profile from "route/Profile";
const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        {/* <Redirect from="*" to="/" /> 리다이렉트 사용시 방법. exact path="/" 이어야 하는데 로그아웃 시 exact path="/profile" 인데 작동은 isLoggedIn = false 니 redirect 발동*/}
      </Switch>
    </Router>
  );
};

export default AppRouter;
