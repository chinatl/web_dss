import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';



class BranchPie extends Component {

  componentDidMount() {
  }
  getOption() {
    var dataAxis = ['西安', '咸阳', '宝鸡', '渭南', '铜川', '榆林', '延安', '汉中', '安康', '商洛'];
    var data = [8255, 5666, 3000, 4434, 590, 3666, 1000, 1320, 1523, 1025];
    var yMax = 10000;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    return {
      grid: {
        left: '1%',
        right: '1%',
        bottom: '5%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
                "interval": 0, 
                "rotate": 45,
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
        }
      },
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          barCategoryGap:'40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#99BDF9'},
                  {offset: 1, color: '#4285F4'}
              ])
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#4285F4'},
                  {offset: 1, color: '#99BDF9'}
              ])
            }
          },
          data: data
        }
      ]
    };
  }


  render() {
    return (
     <ReactEcharts
          option={this.getOption()} 
          notMerge={true}
          style={{height: '150px', width: '100%'}} 
          lazyUpdate={true}
      />
    );
  }
}

BranchPie.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global }) => ({
}))(BranchPie)
