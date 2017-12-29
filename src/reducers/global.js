import { handleActions } from 'redux-actions';


const global = handleActions({
  'global/collapse': (state,action) =>({...state, collapsed: true }),
  'global/unCollapse': (state,action) =>({...state, collapsed: false }),
}, {
  collapsed: false,
});

export default global;
