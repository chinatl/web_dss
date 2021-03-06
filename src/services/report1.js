import xFetch from './xFetch';
import config from '../config';

export function* getData(params) {
  return yield xFetch(`${config.apiPrefix}dss/widgets/${params.reportId.toLowerCase()}`, {
    method: 'post',
    dataType: 'json',
    body: JSON.stringify(params.params),
  });
}