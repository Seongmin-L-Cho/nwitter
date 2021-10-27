import AppRouter from "component/Router";
import { useState, useEffect } from "react";
import { auth } from "fbase";
import { onAuthStateChanged } from "@firebase/auth";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
