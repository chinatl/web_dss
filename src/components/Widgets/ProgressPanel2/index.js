import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Select, Row, Switch } from 'antd';
import ProgressItem from './Item';
import styles from './styles.css';
import cityImg610000 from '../../../assets/images/city/610000.jpg';
import cityImg610100 from '../../../assets/images/city/610100.jpg';
import cityImg610200 from '../../../assets/images/city/610200.jpg';
import cityImg610300 from '../../../assets/images/city/610300.jpg';
import cityImg610400 from '../../../assets/images/city/610400.jpg';
import cityImg610500 from '../../../assets/images/city/610500.jpg';
import cityImg610600 from '../../../assets/images/city/610600.jpg';
import cityImg610700 from '../../../assets/images/city/610700.jpg';
import cityImg612100 from '../../../assets/images/city/612100.jpg';
import cityImg612200 from '../../../assets/images/city/612200.jpg';
import cityImg612300 from '../../../assets/images/city/612300.jpg';

const Option = Select.Option;


//　需要展示的进度列表
const progressList = [
  {
    index_code: '011001',
    index_name: '个险首年期交',
    progress_dim: 'Y',
    primary: true,
  },{
    index_code: '011010',
    index_name: '个险十年期交',
    progress_dim: 'Y',
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
    if (nextProps.params !== this.props.params) {
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

  getCityImage() {
    switch(this.state.branch) {
    case '610000':
      return cityImg610000;
    case '610100':
      return cityImg610100;
    case '610200':
      return cityImg610200;
    case '610300':
      return cityImg610300;
    case '610400':
      return cityImg610400;
    case '610500':
      return cityImg610500;
    case '610600':
      return cityImg610600;
    case '610700':
      return cityImg610700;
    case '612100':
      return cityImg612100;
    case '612200':
      return cityImg612200;
    case '612300':
      return cityImg612300;
    default:
      return cityImg610000;
    }
  }

  render() {

    const indexes = this.getWidgetData();

    return (
      <Card bodyStyle={{ padding: 0 }}>
        <div className={styles.headContainer}>
          <img src={this.getCityImage()} alt="" height="243" />
          <div className={styles.headTitle}>
            业务进度
          </div>
          <div className={styles.branchSelect}>
            <Select defaultValue="全省" style={{ width: 80 }} onChange={(v)=>{this.handleBranchChange(v)}}>
              <Option value="610000">全省</Option>
              <Option value="610100">西安</Option>
              <Option value="610200">铜川</Option>        
              <Option value="610300">宝鸡</Option>                      
              <Option value="610400">咸阳</Option>
              <Option value="610500">渭南</Option>
              <Option value="610600">汉中</Option>
              <Option value="610700">延安</Option>
              <Option value="612100">安康</Option>
              <Option value="612200">商洛</Option>              
              <Option value="612300">榆林</Option>    
            </Select>
          </div>
          <div 
            className={styles.folded}
          >
            <Switch checked={this.state.folded} onChange={()=>{this.handleChannelFlod();}} checkedChildren={'更多'} unCheckedChildren={'关'} />
          </div>
        </div>
        <div className={styles.progressContainer}>
          {
            this.state.folded && 
            <Row>
              {
                indexes.map((data,index)=>
                  data.primary && <ProgressItem label={data.index_name} completed={data.completed} percent={data.percent} />
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
              <Row>
                <ProgressItem label="首年标保" completed="5455.22" percent={80} />
                <ProgressItem label="首年期交" completed="5455.22" percent={80} />
                <ProgressItem label="短期险" completed="5455.22" percent={80} />
                <ProgressItem label="5-9期" completed="5455.22" percent={80} />
                <ProgressItem label="10年期及以上" completed="5455.22" percent={12} />
                <ProgressItem label="个险意外险" completed="5455.22" percent={65} />                                                  
              </Row>
              <div className={styles.progressHr} />
              <div className={styles.progressChannel}>
                <h3>团险</h3>
              </div>
              <Row>
                <ProgressItem label="短期险" completed="5455.22" percent={80} />
                <ProgressItem label="短期意外险" completed="5455.22" percent={80} />
                <ProgressItem label="小额贷款" completed="5455.22" percent={80} />                                                        
              </Row>
              <div className={styles.progressHr} />
              <div className={styles.progressChannel}>
                <h3>银保</h3>
              </div>
              <Row>
                <ProgressItem label="首年标保" completed="5455.22" percent={80} />
                <ProgressItem label="首年保费" completed="5455.22" percent={80} />
                <ProgressItem label="首年期交" completed="5455.22" percent={80} />                                                        
              </Row>
              <div className={styles.progressHr} />   
              <div className={styles.progressChannel}>
                <h3>电销</h3>
              </div>
              <Row>
                <ProgressItem label="首年标保" completed="5455.22" percent={80} />
                <ProgressItem label="首年期交" completed="5455.22" percent={80} />                                                        
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
}))(ProgressPanel)
