import xFetch from './xFetch';
import config from '../config';
//import data from './user_mock.json';

export function* validate(params) {
  //return data;
  return yield xFetch(`${config.apiPrefix}eck/test/users/validate`, {
    method: 'post',
    dataType: 'json',
    body: JSON.stringify(params),
  });

  
}