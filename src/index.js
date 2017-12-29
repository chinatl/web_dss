import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import Routes from './routes';
import configureStore from './store';
import appHistory from './history';
import './styles/index.css';

const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);
if(localStorage.getItem('autologin')==='true'){
  if(localStorage.getItem('lasttime') + ''=== 'null'){
	  console.log(1)
	  localStorage.setItem('lasttime',Date.now());
	  localStorage.setItem('isguoqi','false');
  }else {
	  var x = Date.now();
	  if(x-localStorage.getItem('lasttime') >= 3600*1000*24*7){
		  localStorage.setItem('isguoqi','true');
		  localStorage.setItem('lasttime','null');
	  }
  }
}else {
	localStorage.setItem('lasttime','null');
	localStorage.setItem('isguoqi','true');
}
if(localStorage.getItem('autologin')==='true'&&localStorage.getItem('isguoqi')==='false' && localStorage.getItem('accessToken')+''!=='null'){
	var accessToken = localStorage.getItem('accessToken');
	var user = JSON.parse(localStorage.getItem('userInfo'));
	store.dispatch({type: 'user/login/success',payload:{accessToken, user, selectedBranch: user.branch_code}})
}
ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
);