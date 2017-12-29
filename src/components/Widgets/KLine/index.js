import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio, Icon, Spin } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'; 
import styles from './styles.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class KLine extends Component {

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: 'KLine',
        params: {
          branch: this.props.user.selectedBranch,
          time: 'D',
          period: 365
        }
      }
    });
  }

  componentDidMount() {
    // 取控件数据
    /*
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: 'KLine'
      }
    });
    */
  }


  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.params.index_code && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: 'KLine'
        }
      });
    }
  }


  getOption() {
    var xData = this.props.data[0].time;
    let xStart = 0;
    if (this.props.params.time === 'D') {
      xStart = 95;
    } else if (this.props.params.time === 'M') {
      xStart = 50;
    } else if (this.props.params.time === 'W') {
      xStart = 50;
    } else if (this.props.params.time === 'Y') {
      xStart = 0;
    } 

    let option = {
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
             toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },     
    "calculable": true,
    "xAxis": [{
        "type": "category",
        "axisLine": {
            lineStyle: {
                color: '#E16757',
                width: 2
            }
        },
        "axisLabel": {
            textStyle: {
                color: '#90979c'
            }
        },
        "splitLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        },
        "splitArea": {
            "show": false
        },
        "data": xData,
    }],
    "yAxis": [{
        "type": "value",
        "splitLine": {
            "show": true
        },
        "axisLine": {
            lineStyle: {
                color: '#90979c'
            }
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "splitArea": {
            "show": false
        },

    }],
    "dataZoom": [{
        "show": true,
        "height": 30,
        "xAxisIndex": [
            0
        ],
        "start": xStart,
        "end": 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle:{
            color:"#d3dee5",
            
        },
           textStyle:{
            color:"#000"},
           borderColor:"#90979c"
    }],
    "series": [{
            "name": "",
            type: 'line',
            lineStyle: {
                     normal: {
                         width: 1.5
                     }
                 },
                 areaStyle: {
                     normal: {
                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                             offset: 0,
                             color: '#EECB5F'
                         }, {
                             offset: 0.8,
                             color: this.props.theme ==='dark'?'#2c343c':'#eeeeee'
                         }], false),
                     }
                 },
                 itemStyle: {
                     normal: {
                         color: '#D9A84C'

                     }
                 },
            "data": this.props.data[0].data,
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}
    return option;
  }

  render() {
    return (
    <div>
      {
        this.props.loading &&
          <div className={styles.loading}>
            <Spin size="large" tip="正在加载中..." />
          </div>
      }
      {
        !this.props.loading && (!this.props.data || !this.props.params.index_code) &&　
          <div className={styles.information}>
            <Icon type="frown-o" /> 请选择指标
          </div>
      }
      {
        !this.props.loading && this.props.data && this.props.params.index_code && this.props.data[0].data.length === 0 &&
          <div className={styles.information}>
            <Icon type="frown-o" /> 当前指标没有数据
          </div>
      }
      {
        !this.props.loading && this.props.data && this.props.data[0].data.length > 0  &&
        <ReactEcharts
          option={this.props.data?this.getOption():{}} 
          notMerge={true}
          style={{height: Math.max( window.innerHeight, document.body.clientHeight ) -155, width: '100%'}} 
          lazyUpdate={true}
        />
      }
    </div>
    );
  }
}

KLine.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, pageKLine, user, widgets }) => ({
  selectedTime: pageKLine.selectedTime,
  user,
  params: widgets.params.KLine,
  data: widgets.data.KLine,
  loading: widgets.loading.KLine,  
}))(KLine)
