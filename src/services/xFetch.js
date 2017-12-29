import { notification } from 'antd';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    //location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => (jsonResult));
}

function errorMessageParse(res) {
  const { code, msg, errcode, errmsg } = res;
  const errMessage = msg || errmsg ||'失败';
  if (code!=0 && errcode!=0) {
     notification.error({
      message: '失败',
      description: errMessage,
    });
    return Promise.reject(msg);
  }
  return res;
}

function xFetch(url, options) {
  const opts = { ...options, credentials: 'same-origin',};

  opts.headers = {
    ...opts.headers
  };

  let token = localStorage.getItem('token');
  token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxNjEwMDQxMiIsInN5cyI6ImVjayIsImV4cCI6MTQ5NzM0MDg5NzUxM30.ewgPR1J7c0fdrSQpZW4BEPlR9itfoz1l-5UP6LDn6Ls'
  if (token) {
    opts.headers = {
      ...opts.headers,
      'Authorization': `Bearer ${token}`
    }
  }
  if(opts.dataType === 'json'){
    opts.headers = {
      ...opts.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  
  return fetch(`${url}`, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

export default xFetch;
