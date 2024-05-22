import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routing from "./routing";
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import Store from "./Redux/store";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";



class App extends Component {
  render() {
    return (
      <div>
        <Provider store={Store}>
          <Toaster />
          <PrimeReactProvider>
            <Routing />
          </PrimeReactProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
