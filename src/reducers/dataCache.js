import { handleActions } from 'redux-actions';
import indexListJson from '../assets/data/indexlist.json';
import branchData from '../assets/data/branch.json';

const getBranch = (data,branchList)=>{
  for (let branch of data){
    branchList = Object.assign(
      branchList,{
      [branch.value]: {
        branchName: branch.label,
        branchCode: branch.value,
      }
    });
    if (branch.children){
      getBranch(branch.children,branchList);
    }
  }
  return branchList;
}

const getIndexNameList = ()=>{
  let indexNameList = {};
  for (let index of indexListJson){
    indexNameList = Object.assign(
      indexNameList,{
      [index.key]: index.name
    });
  }
  return indexNameList;
}

const dataCache = handleActions({
  'indexList/reset': (state,action) =>({...state, indexList: indexListJson }),
  'indexList/filter': (state,action) =>({
    ...state,
    indexList: indexListJson.filter(function(index){
        return action.payload.keyWords === '' || index.key.indexOf(action.payload.keyWords) >= 0 || index.name.indexOf(action.payload.keyWords) >= 0 ;
      })
  }),
}, {
  indexList: indexListJson,
  indexNameList: getIndexNameList(),
  branchList: getBranch(branchData,{})
});

export default dataCache;
