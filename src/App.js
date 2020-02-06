import React, { Component } from "react";
import { ToastContainer,ToastMessageAnimated } from "react-toastr";
import './toastr.css';
import './animate.css';

import AppHeader from "./components/app-header/AppHeader";
import Weather from "./components/weather/Weather";
import FavoriteCities from "./components/favorite-cities/FavoriteCities";

import { Route, Router ,Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();


export class App extends Component {
  constructor() {
    super();
    this.container = null;
  }

  render() {
    return (
      <div>
         <ToastContainer
          ref={ref => this.container = ref}
          className="toast-top-right"
          preventDuplicates={true}
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
        <Router history={customHistory}>
          <div className="wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 navigation-bar">
                  <AppHeader />
                </div>
              </div>

              <div>
                <Route path="/weather" render={(props) => <Weather {...props} toasterContainer={this.container}/>} exact />
                
                <Route 
                  path="/favoriteCities" 
                  render={ () => (
                    <div className="wrapper">
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-12 navigation-bar">
                            <FavoriteCities/>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  )} 
                  exact 
                />
              </div>
            </div>
          </div>
          <Redirect exact from="/" to="weather" />

        </Router>
      </div>
    );
  }
}

export default App;
