import { call, put, fork, select, takeEvery } from 'redux-saga/effects';
import { getData as getDataServ } from '../services/widgets';
import { replace } from 'react-router-redux';


/**
 * 取控件数据
 * @param {*方法信息} action
 */
function* getData(action) {
  try　{
    //  取控件参数
    const { widgets, user } = yield select();

    //　已登录用户取数据　
   ///if (user.user) {
      //  调用服务取控件数据
      const { data } = yield call(getDataServ, {
        widgetId: action.payload.widgetId,
        params: widgets.params[action.payload.widgetId],
      });

      //  保存控件数据
      yield put({type: 'widgets/setData',payload:{
        widgetId: action.payload.widgetId,
        data,
      }});
    //}

  }　catch (err)　{
    yield put({type: 'widgets/getData/failed',payload: { widgetId: action.payload.widgetId }});
  }
}

function* watchGetData() {
  yield takeEvery('widgets/getData', getData)
}

export default function* () {
  yield fork(watchGetData);
}
