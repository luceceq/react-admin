import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Login, LogOut } from "./Components/Auth";
import Dashboard from "./Components/Dashboard";

class AppRouter extends Component {
  redirectToDashboard = () => {
    window.location = `${window.location.origin}/dashboard${window.location.hash}`
  }

  render() {
    return (
      <Fragment>
        <div className="app-wrap">
          <Switch>
            <Route exact path="/" render={() =>
                <div>
                  <div>Please wait...</div> 
                  {this.redirectToDashboard()}
                </div>
              }
            />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/dashboard" component={Dashboard} /> 
            <Route render={() => (
                <Redirect to="/" />
              )}
            />
          </Switch>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </Fragment>
    );
  }
}

export default AppRouter;
