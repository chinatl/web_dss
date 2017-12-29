import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Input, Table, Radio, Icon, Tag, Spin } from 'antd';
import styles from './styles.css';
import SearchBar from './SearchBar';
import BranchSelect from '../../Common/BranchSelect';

const Search = Input.Search;

const columns = [{
  title: '代码',
  dataIndex: 'key',
  width: '-10%',
  colSpan: 0,
  render: (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    obj.props.rowSpan = 0;
    return obj;
  },
}, {
  title: '指标名称',
  dataIndex: 'name',
  width: '40%',
  render: (value, row, index) => 
   <div>
     <p>{row.key}</p>
     <p>{row.name}</p>
    </div>

}, {
  title: '指标值',
  dataIndex: 'value',
  width: '30%',
  render: (value, row, index) => 
    <Tag color="#f04134">{value}</Tag>
}];

class IndexList extends Component {

  //  构建函数
  constructor(props) {
    super(props)
    this.state = {
      keyWords: '',
      selectBranch: false,
    }
  }

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: 'IndexList',
        params: {
          branch: this.props.user.selectedBranch,
        }
      }
    });
  }

  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: 'IndexList'
      }
    });
  }

  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: 'IndexList'
        }
      });
    }
  }

  handleSearch() {
    this.props.dispatch({
      type: 'indexList/filter',
      payload: {
        keyWords: this.state.keyWords,
      },
    });
  }

  //  加工控件数据
  getWidgetData() {
    const indexes = [];
    if (this.props.data && this.props.data.data){
      for (let d of this.props.indexList) {
        Object.keys(this.props.data.data).forEach((key,index)=>{
          if (d.key === key) {
            indexes.push({
              key,
              name: d.name,
              value: this.props.data.data[key],
            });
          }
        })
      }
    }
    return indexes;
  }

  render() {
    const indexes = this.getWidgetData();
    return (
      <Spin spinning={this.props.loading} size="large" tip="加载中...">
      <div className={styles.indexList}>
        <Card 
          bodyStyle={{padding:'10px'}}
          title={
            <Radio.Group value={this.props.params2?this.props.params2.time:''} onChange={(v)=>{
                //　设置默认参数
                this.props.dispatch({
                type: 'widgets/setParams',
                payload: {
                    widgetId: 'KLine',
                    params: {
                      time: v.target.value,
                      period: classNames({
                        365: v.target.value === 'D',
                        12: v.target.value === 'M',
                        50: v.target.value === 'W',
                        2: v.target.value === 'Y',
                      })
                    }
                }
                });
            }}
            size="small">
            <Radio.Button value="D">日</Radio.Button>
            <Radio.Button value="W">周</Radio.Button>
            <Radio.Button value="M">月</Radio.Button>
            <Radio.Button value="Y">年</Radio.Button>
            </Radio.Group>
          }
        >
          <SearchBar />
          <Table
            columns={columns}
            dataSource={indexes}
            pagination={false}
            size="middle"
            scroll={{ y: Math.max( window.innerHeight, document.body.clientHeight ) - 270 }} 
            rowClassName={(record, index)=>{
              if (this.props.params2 && this.props.params2.index_code && (record.key === this.props.params2.index_code[0])) {
                return styles.selectedRow;
              } else {
                return '';
              }
            }}
            onRowClick={(record, index)=>{
              //　设置k线图指标代码
              this.props.dispatch({
                type: 'widgets/setParams',
                payload: {
                  widgetId: 'KLine',
                  params: {
                    index_code: [record.key]
                  }
                }
              });
            }}
          />
        </Card>
      </div>
      </Spin>
    );
  }
}

IndexList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dataCache, user, widgets }) => ({
  indexList: dataCache.indexList,
  branchList: dataCache.branchList,
  user,
  params: widgets.params.IndexList,
  params2: widgets.params.KLine,
  data: widgets.data.IndexList,
  loading: widgets.loading.IndexList,  
}))(IndexList)
