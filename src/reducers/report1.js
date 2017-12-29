import { handleActions } from 'redux-actions';


const report = handleActions({
  'report1/getData': (state,action) =>({
    ...state,
    loading: {
      ...state.loading,
      [action.payload.reportId]: true
    }}),
  'report1/setParams': (state,action) =>({
    ...state,
    params: {
      ...state.params,
      [action.payload.reportId]: {
        ...state.params[action.payload.reportId] ? state.params[action.payload.reportId] : {},
        ...action.payload.params,
      }
    }}),
  'report1/setData': (state,action) =>({
    ...state,
    loading: {
      ...state.loading,
      [action.payload.reportId]: false
    },
    data: {
      ...state.data,
      [action.payload.reportId]: action.payload.data
    }}),
  'report1/clear': (state) =>({}),
  'report1/getData/failed': (state,action) =>({
  ...state,
  loading: {
    ...state.loading,
    [action.payload.reportId]: false
  }}),
}, {
  params: {},
  data: {},
  loading: {},
});

export default report;


