import React, {Suspense} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import './assets/styles/myStyle.css'
import LogIn from './views/LogIn';
import MemoriceGame from './views/MemoriceGame';
import Footer from './components/Footer/Footer';
import injectContext from "./store/appContext";
import Error from './views/Error';

function App() {
  return (
    <Suspense fallback={<div>Cargando..</div>}>
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route exact path={["/"]} component={LogIn} />
          <Route exact path="/game" component={MemoriceGame} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
      < Footer />
      </div>
    </Suspense>
  );
}

export default (injectContext(App));
