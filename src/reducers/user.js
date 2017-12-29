import { handleActions } from 'redux-actions';


const user = handleActions({
  'user/showLoading': (state) =>({...state, loading: true }),
  'user/login/success': (state,action) =>({...state, ...action.payload, loading: false }),
  'user/login/failed': (state) =>({...state, loading: false }),
  'user/logout': (state) =>({...state, user: null, accessToken: null }),
  'user/selectBranch': (state,action) =>({...state, selectedBranch: action.payload.branch }),
}, {
  loading: false,
  selectedBranch: '610000',
  user: {
  }
});

export default user;


