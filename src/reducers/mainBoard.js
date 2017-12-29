import { handleActions } from 'redux-actions';

const mainBoard = handleActions({
  'mainBoard/changeItem': (state,action) =>({...state, curItem: action.payload}),
}, {
  curItem: '011001'
});

export default mainBoard;
