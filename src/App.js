import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./Screens/Home"));
const Room = lazy(() => import("./Screens/Room"));

export default function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Room} exact path="/room/:roomName" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
