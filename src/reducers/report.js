import { handleActions } from 'redux-actions';


const report = handleActions({
  'report/getData': (state,action) =>({
    ...state,
    loading: {
      ...state.loading,
      [action.payload.reportId]: true
    }}),
  'report/setParams': (state,action) =>({
    ...state,
    params: {
      ...state.params,
      [action.payload.reportId]: {
        ...state.params[action.payload.reportId] ? state.params[action.payload.reportId] : {},
        ...action.payload.params,
      }
    }}),
  'report/setData': (state,action) =>({
    ...state,
    loading: {
      ...state.loading,
      [action.payload.reportId]: false
    },
    data: {
      ...state.data,
      [action.payload.reportId]: action.payload.data
    }}),
  'report/clear': (state) =>({}),
  'report/getData/failed': (state,action) =>({
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


