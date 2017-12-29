import { handleActions } from 'redux-actions';


const widgets = handleActions({
  'widgets/getData': (state,action) =>({
    ...state,
    loading: {
      ...state.loading,
      [action.payload.widgetId]: true
    }}),
  'widgets/setParams': (state,action) =>({
    ...state,
    params: {
      ...state.params,
      [action.payload.widgetId]: {
        ...state.params[action.payload.widgetId] ? state.params[action.payload.widgetId] : {},
        ...action.payload.params,
      }
    }}),
  'widgets/setData': (state,action) =>({
    ...state,
    loading: {
      ...state.loading,
      [action.payload.widgetId]: false
    },
    data: {
      ...state.data,
      [action.payload.widgetId]: action.payload.data
    }}),
  'widgets/clear': (state) =>({}),
  'widgets/getData/failed': (state,action) =>({
  ...state,
  loading: {
    ...state.loading,
    [action.payload.widgetId]: false
  }}),
}, {
  params: {},
  data: {},
  loading: {},
});

export default widgets;


