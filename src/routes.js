import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import { routerActions } from 'react-router-redux'
import App from './App';
import Dashboard from './containers/Dashboard';
import Dashboard2 from './containers/Dashboard2';
import KLine from './containers/KLine';
import ManageKPI from './containers/ManageKPI';
import Login from './containers/Login2';
import Eck from './containers/Special/Eck';
import Shuiyou from './containers/Special/Shuiyou';
import Gx from './containers/Special/Gx';
import Report from './containers/Report';
import Report2 from './containers/Report2';
import Bridge from './containers/Bridge';
import Salesforce from './containers/Salesforce';
import Test from './containers/Test';
import Main from './containers/Main';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})
const Routes = ({ history }) =>{
  return (
    <Router history={history}>
      <Route component={UserIsAuthenticated(App)}>
      <Route path="/" component={UserIsAuthenticated(Report)} />
       <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
       <Route path="kline" component={UserIsAuthenticated(KLine)}/>
       <Route path="kline2" component={UserIsAuthenticated(KLine)}/>
       <Route path="managekpi" component={UserIsAuthenticated(ManageKPI)}/>
       <Route path="report" component={UserIsAuthenticated(Report)}/>
       <Route path="special/eck" component={UserIsAuthenticated(Eck)}/>
       <Route path="special/shuiyou" component={UserIsAuthenticated(Shuiyou)}/>
       <Route path="salesforce" component={UserIsAuthenticated(Salesforce)}/>
       <Route path="report2" component={UserIsAuthenticated(Report2)}/>
       <Route path="main" component={UserIsAuthenticated(Main)}/>
      </Route>
      <Route path="login" component={Login} />
      <Route path="bridge" component={Bridge}/>
      <Route path="special/gx" component={Gx}/>
      <Route path="test" component={Test}/>
    </Router>
  );
}


Routes.propTypes = {
  history: PropTypes.any,
  store: PropTypes.any,
};

export default Routes;
