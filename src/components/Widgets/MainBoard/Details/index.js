import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Row, Col, Spin } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import PPeriodPie from './PPeriodPie';


const defaultParams={
  ['011001']: {
    sub_index_code: ['011003','011005','011010']
  }
}

class PPeriod extends Component {

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: `IndexDetails/${this.props.indexCode}`,
        params: {
          ...defaultParams[this.props.indexCode],
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
        widgetId: `IndexDetails/${this.props.indexCode}`,
      }
    });
  }

  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (nextProps.indexCode !== this.props.indexCode) {
      this.props.dispatch({
        type: 'widgets/setParams',
        payload: {
          widgetId: `IndexDetails/${nextProps.indexCode}`,
          params: {
            ...defaultParams[nextProps.indexCode],
            branch: nextProps.user.selectedBranch,
          }
        }
      });
    }

    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: `IndexDetails/${nextProps.indexCode}`,
        }
      });
    }
  }

  getOption() {
    const dataAxis = [];
    const data = [];
    const plan = [];
    let yMax = 0;

    for (let d of this.props.data.details.data){
      dataAxis.push(d.branch_name);
      data.push(Math.round(d.completed));
      plan.push(d.plan);
      let planTmp = d.plan?d.plan:0;
      let dataItemMax = Math.max(d.completed,planTmp)*1.1;
      if (dataItemMax > yMax){
        //yMax = Math.ceil(Math.max(d.completed,planTmp)*1.2/10000)*10000;
        yMax = dataItemMax;
      }
    }
    
    //var dataAxis = ['西安', '咸阳', '宝鸡', '渭南', '铜川', '榆林', '延安', '汉中', '安康', '商洛'];
    //var data = [8255, 5666, 3000, 4434, 590, 3666, 1000, 1320, 1523, 1025];
    //var plan = [9150,6230,5800,5500,1080,6300,2800,3400,1500,900];
    var gap = [];
    var progress = [];
    
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(0);
      progress.push(Math.round(data[i]/plan[i]*100));
      if (data[i]>plan[i]){
        gap.push(null);
      }
      else {
        gap.push(plan[i]-data[i]);
      }
    }

    return {
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        top: '2%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function(params) {
          return params[1].name + ':' + params[1].data;
        }
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
      xAxis: {
        data: dataAxis,
        axisLabel: {
          //inside: true,
          textStyle: {
            color: '#000'
          },
          interval: 0,
          formatter: function(params){
            return params.split("").join("\n");
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        },
        boundaryGap: ['5%', '5%'],
      },
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          barCategoryGap:'60%',
          data: dataShadow,
          barMaxWidth: 40,
          animation: false
        },
        {
          type: 'bar',
          stack: 'premium',
          /*label: {
            normal: {
              show: true,
              position: 'inside',
              top: '1%',
              textStyle: {
                fontSize: '12px',
                color: '#5a5a5a'
              }
            }
          },*/
          itemStyle: {
            normal: {
              color: function(params)
              {
                if(gap[params.dataIndex] === null)
                return new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#ECB0A8'},
                  {offset: 1, color: '#E16757'}
                  ]
                )
                else return new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#99BDF9'},
                  {offset: 1, color: '#4285F4'}
                  ]
                )
              }
              /*color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#99BDF9'},
                  {offset: 1, color: '#4285F4'}
              ])*/
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            }
          },
          animation: false,
          data: data,
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        },
        {
          type: 'bar',
          stack: 'premium',
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)', barBorderColor: '#99BDF9',barBorderWidth: 1}
          },
          animation: false,
          data: gap
        },
        {
          type: 'bar',
          stack: 'premium',
          color: 'rgba(0,0,0,0)',
          barMaxWidth: 40,
          //barCategoryGap: 0,
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#4285F4',
                fontWeight: 'Bold'
              },
              //formatter: '{c}%'
              formatter: function(params){
                return data[params.dataIndex]+"\n"+Math.round(data[params.dataIndex]/plan[params.dataIndex]*100)+"%"
              }
              }
          },
          data: progress
        }
      ]
    };
  }


  onChartClick(e){
    console.log(e);
  }

  onEvents = {
    'click': this.onChartClick
  }

  render() {
    let span = 24;
    if ( this.props.data && this.props.data.sub_details && this.props.data.sub_details.length > 0  ){
      span =18;
    }
    return (
      <Spin spinning={this.props.loading} size="large" tip="加载中...">
      <Row gutter={32}>
        {
          this.props.data && this.props.data.details &&
          <Col xs={24} sm={24} md={span} lg={span} xl={span}>
            <ReactEcharts
              option={this.getOption()} 
              notMerge={true}
              onEvents={this.onEvents}
              style={{height: '300px', width: '90%'}} 
              lazyUpdate={true}
            />
          </Col>
        }
        {
          this.props.data && this.props.data.sub_details && this.props.data.sub_details.length > 0 &&
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <PPeriodPie data={this.props.data.sub_details} indexName={this.props.indexName} />
          </Col>
        }
      </Row>
      </Spin>
    );
  }
}



PPeriod.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard,widgets,user }, { indexCode }) => ({
  global,
  mainBoard,
  user,
  indexCode,
  params: widgets.params[`IndexDetails/${indexCode}`],
  data: widgets.data[`IndexDetails/${indexCode}`],
  loading: widgets.loading[`IndexDetails/${indexCode}`],
}))(PPeriod)
