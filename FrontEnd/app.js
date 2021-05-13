import React, { Suspense, useState } from "react";
import "./App.scss";
import MainPage from "./components/main-page/main-page.jsx";
import Login from "./components/login/login.jsx";
import Navigation from "./components/navigation/navigation.jsx";
import { Route, Switch } from "react-router-dom";

const AsyncTrips = React.lazy(() => import("./components/trips/trips.jsx"));
const AsyncSchedules = React.lazy(() => import("./components/schedule/schedule.jsx"));
const AsyncFares = React.lazy(() => import("./components/fares/fares-component.jsx"));

const App = () => {
  const [state, setState] = useState(true);

  return (
    <div className="App">
      <Switch>
        {state ? (
          <Route
            path="/trips"
            render={() => (
              <Suspense
                fallback={
                  <div style={{ textAlign: "center" }}>Loading ....</div>
                }
              >
                <AsyncTrips />
              </Suspense>
            )}
          />
        ) : null}

        <Route path="/login" component={Login} />

        {state ? (
          <Route
            path="/schedules"
            render={() => (
              <Suspense
                fallback={
                  <div style={{ textAlign: "center" }}>Loading ....</div>
                }
              >
                <AsyncSchedules />
              </Suspense>
            )}
          />
        ) : null}

        <Route path="/navigation" component={Navigation} />

        {state ? (
          <Route
            path="/fares"
            render={() => (
              <Suspense
                fallback={
                  <div style={{ textAlign: "center" }}>Loading ....</div>
                }
              >
                <AsyncFares />
              </Suspense>
            )}
          />
        ) : null}

        <Route exact path="/" component={MainPage} />
        
      </Switch>
    </div>
  );
};

export default App;
