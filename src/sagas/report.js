import { call, put, fork, select, takeEvery } from 'redux-saga/effects';
import { getData as getDataServ } from '../services/report';
import { replace } from 'react-router-redux';


/**
 * 取报表数据
 * @param {*方法信息} action
 */
function* getData(action) {
  try　{
    //  取控件参数
    const { report, user } = yield select();

    //  调用服务取控件数据
    const { data } = yield call(getDataServ, {
      reportId: action.payload.reportId,
      params: report.params[action.payload.reportId],
    });

    //  保存控件数据
    yield put({type: 'report/setData',payload:{
      reportId: action.payload.reportId,
      data,
    }});
  

  }　catch (err)　{
    yield put({type: 'report/getData/failed',payload: { widgetId: action.payload.reportId }});
  }
}

function* watchGetData() {
  yield takeEvery('report/getData', getData)
}

export default function* () {
  yield fork(watchGetData);
}
