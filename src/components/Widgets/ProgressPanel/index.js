import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Row, Col, Spin } from 'antd';
import ProgressCard from './Card';

//　需要展示的进度列表
const progressList = [
  {
    index_code: '011001',
    index_name: '个险首年期交',
    progress_dim: 'Y',
    sales_channel: 'P',
    primary: true,
  },{
    index_code: '011010',
    index_name: '个险十年期交',
    progress_dim: 'Y',
    sales_channel: 'P',
    primary: true,
  },{
    index_code: '012000',
    index_name: '个险首年标保',
    progress_dim: 'Y',
    sales_channel: 'P',
    primary: true,
  },{
    index_code: '014000',
    index_name: '个险短期险',
    progress_dim: 'Y',
    sales_channel: 'P',
    primary: true,
  },{
    index_code: '004000',
    index_name: '短期险',
    progress_dim: 'Y',
    sales_channel: 'G',
    primary: true,
  },{
    index_code: '034000',
    index_name: '团险短险',
    progress_dim: 'Y',
    sales_channel: 'G',
    primary: true,
  },{
    index_code: '021001',
    index_name: '银保首年期交',
    progress_dim: 'Y',
    sales_channel: 'B',
    primary: true,
  },{
    index_code: '022000',
    index_name: '银保首年标保',
    progress_dim: 'Y',
    sales_channel: 'B',
    primary: true,
  }
];

// 指标列表参数
const indexes = () =>{
  const indexes = [];
  for (let p of progressList){
    indexes.push({
      index_code: p.index_code,
      progress_dim: p.progress_dim,
    });
  }
  return indexes;
}

class ProgressPanel extends Component {

  //  构建函数
  constructor(props) {
    super(props)
    this.state = {
      folded: true,
    }
  }

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: 'ProgressPanel',
        params: {
          branch: this.props.user.selectedBranch,
          indexes: indexes(),
        }
      }
    });
  }

  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: 'ProgressPanel'
      }
    });
  }

  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: 'ProgressPanel'
        }
      });
    }
  }

  //  加工控件数据
  getWidgetData() {
    const indexesP = [];
    const indexesG = [];
    const indexesB = [];

    if (this.props.data){
      for (let p of progressList){
        for (let d of this.props.data.progress) {
          if (p.index_code === d.index_code){
            const index = {
              index_code: p.index_code,
              index_name: p.index_name,
              sales_channel: p.sales_channel,
              completed: d.completed,
              percent: d.percent,
              primary: p.primary,
            };
            if (p.sales_channel === 'P') {
              indexesP.push(index);
            } else if (p.sales_channel === 'G') {
              indexesG.push(index);
            } else if (p.sales_channel === 'B') {
              indexesB.push(index);
            }
          }
        }
      }
    }

    return {
      indexesP,
      indexesG,
      indexesB,
    };
  }

  // 机构切换
  handleBranchChange(value) {
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: 'ProgressPanel',
        params: {
          branch: value,
        }
      }
    });
  }

  handleChannelFlod() {
    this.setState({
      folded: !this.state.folded,
    });
  }

  render() {

    const indexes = this.getWidgetData();

    return (
      <Spin spinning={this.props.loading} size="large" tip="加载中...">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}><ProgressCard channel="P" data={indexes.indexesP} /></Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}><ProgressCard channel="G" data={indexes.indexesG}/></Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}><ProgressCard channel="B" data={indexes.indexesB}/></Col>
      </Row>
      </Spin>
    );
  }
}

ProgressPanel.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
  user,
  params: widgets.params.ProgressPanel,
  data: widgets.data.ProgressPanel,
  loading: widgets.loading.ProgressPanel,
}))(ProgressPanel)
