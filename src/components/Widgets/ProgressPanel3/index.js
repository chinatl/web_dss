import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Select, Row, Button } from 'antd';
import ProgressItem from './Item';
import CitySelect from '../../Common/CitySelect';
import styles from './styles.css';


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
    index_code: '034000',
    index_name: '团险短险保费',
    progress_dim: 'Y',
    sales_channel: 'G',
    primary: true,
  },{
    index_code: '021001',
    index_name: '银保首年期交',
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
    const indexes = [];
    if (this.props.data){
      for (let p of progressList){
        for (let d of this.props.data.progress) {
          if (p.index_code === d.index_code){
            indexes.push({
              index_code: p.index_code,
              index_name: p.index_name,
              sales_channel: p.sales_channel,
              completed: d.complted,
              percent: d.percent,
              primary: p.primary,
            });
          }
        }
      }
    }
    return indexes;
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
      <Card
        title="业务进度"
        extra={
          <div>
            <CitySelect value={this.props.params?this.props.params.branch:''} onChange={(v)=>{this.handleBranchChange(v)}} />
            <Button size="small" style={{marginLeft: 10}} type={this.state.folded?'':'primary'} onClick={()=>{this.handleChannelFlod();}}>更多</Button>
          </div>
        }
      >
        <div className={styles.progressContainer}>
          {
            this.state.folded && 
            <Row gutter={16}>
              {
                indexes.map((data,index)=>
                  data.primary &&
                  <ProgressItem
                    key={index}
                    label={data.index_name}
                    completed={data.completed}
                    percent={data.percent}
                    salesChannel={data.sales_channel}
                  />
                )
              }                                         
            </Row>
          }
          {
            !this.state.folded && 
            <div>
              <div className={styles.progressChannel}>
                <h3>个险</h3>
              </div>
              <Row gutter={16}>
                {
                  indexes.map((data,index)=>
                    data.primary && data.sales_channel === 'P' &&
                    <ProgressItem
                      key={index}
                      label={data.index_name}
                      completed={data.completed}
                      percent={data.percent}
                      salesChannel={data.sales_channel}
                    />
                  )
                }                                                 
              </Row>
              <div className={styles.progressHr} />
              <div className={styles.progressChannel}>
                <h3>团险</h3>
              </div>
              <Row gutter={16}>
                {
                  indexes.map((data,index)=>
                    data.primary && data.sales_channel === 'G' &&
                    <ProgressItem
                      key={index}
                      label={data.index_name}
                      completed={data.completed}
                      percent={data.percent}
                      salesChannel={data.sales_channel}
                    />
                  )
                }                                                       
              </Row>
              <div className={styles.progressHr} />
              <div className={styles.progressChannel}>
                <h3>银保</h3>
              </div>
              <Row gutter={16}>
                {
                  indexes.map((data,index)=>
                    data.primary && data.sales_channel === 'B' &&
                    <ProgressItem
                      key={index}
                      label={data.index_name}
                      completed={data.completed}
                      percent={data.percent}
                      salesChannel={data.sales_channel}
                    />
                  )
                }                                                   
              </Row>
            </div>
          }            
        </div>
      </Card>
    );
  }
}

ProgressPanel.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
  user: user.user,
  params: widgets.params.ProgressPanel,
  data: widgets.data.ProgressPanel,
  loading: widgets.loading.ProgressPanel,
}))(ProgressPanel)
