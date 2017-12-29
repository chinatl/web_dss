import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import echarts from 'echarts'; 
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, Icon, Spin, Carousel } from 'antd';
import styles from './styles.css';

class TodayPrem extends Component {

  //  构建函数
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: 'TodayPrem',
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
        widgetId: 'TodayPrem'
      }
    });
  }

  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: 'TodayPrem'
        }
      });
    }
  }

  // 加工控件数据

  getWidgetData() {
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
        },
        xAxis : [{
        type : 'category',
        boundaryGap : false,
        show:false,
        data : this.props.data.history.time
        }],
        yAxis : [
        {
        type : 'value',
        show:false,
        }],
        grid: {
        top: 1,
        left: 5,
        right: 5,
        bottom: 1,
        },
        series : [{
        type:'line',
        itemStyle: {
            normal: {
            color: '#fff'
        }
        },
        areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fff'
            }, {
                offset: 1,
                color: '#E16757'
            }])
        }
        },
        data:this.props.data.history.data
        }]
    }
  };

  render() {
    const option = this.props.data ? this.getWidgetData() : {} ;

    return (
      <Spin spinning={this.props.loading} size="large" tip="加载中...">
      <div>
        {
          this.props.data && 
            <div className={styles.summary}>
                <Card bordered>
                <div className={styles.data}>
                    <div className={styles.number}><strong>{this.props.data.all}</strong></div>
                    <div className={styles.label}>当日录单</div>
                </div>
                <div className={styles.charts}>
                    <span className={styles.more}><Icon type="layout" /> 查看详情</span>
                    <ReactEcharts
                        option={option}
                        notMerge
                        lazyUpdate
                        style={{ height: '50px', width: '100%' }}
                    />
                </div>
                </Card>
            </div>
        }
        {
          this.props.data &&
            <div className={styles.datagrid}>
              <Card bordered>
                <Row gutter={0}>
                  <Col span={8} className={styles.datacol}>
                    <div className={styles.dataNumber}><strong>{this.props.data.p}</strong></div>
                    <div className={styles.dataLabel}>个险</div>
                  </Col>
                  <Col span={8} className={styles.datacol}>
                    <div className={styles.dataNumber}><strong>{this.props.data.g}</strong></div>
                    <div className={styles.dataLabel}>团险</div>
                  </Col>
                  <Col span={8} className={styles.datacol}>
                    <div className={styles.dataNumber}><strong>{this.props.data.b}</strong></div>
                    <div className={styles.dataLabel}>银保</div>
                  </Col>
                </Row>
              </Card>
            </div>
        }
      </div>
      </Spin>
    );
  }
}


TodayPrem.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
  user: user,
  params: widgets.params.TodayPrem,
  data: widgets.data.TodayPrem,
  loading: widgets.loading.TodayPrem,
}))(TodayPrem)
