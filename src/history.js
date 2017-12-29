import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory, browserHistory } from 'react-router';

const appHistory =
process.env.NODE_ENV === 'development' ? browserHistory : useRouterHistory(createBrowserHistory)({
  basename: '/dss',
});
export default appHistory;