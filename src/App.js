import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

const HomePage = lazy(() => import("./pages/HomePage"));
const RoomPage = lazy(() => import("./pages/RoomPage"));

export default function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <BrowserRouter>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={RoomPage} exact path="/room/:roomName" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
