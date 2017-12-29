import { handleActions } from 'redux-actions';

const pageKLine = handleActions({
  'pageKLine/switchBranchSelectVisible': (state,action) =>({...state, branchSelectVisible: !state.branchSelectVisible}),
  'pageKLine/selectBranch': (state,action) =>({...state, branchSelectVisible: false,selectedBranch: action.payload.branchCode}),
  'pageKLine/selectTime': (state,action) =>({...state, selectedTime: action.payload.time}),
}, {
  selectedBranch: null,
  selectedTime: 'D',
  branchSelectVisible: false,
});

export default pageKLine;
