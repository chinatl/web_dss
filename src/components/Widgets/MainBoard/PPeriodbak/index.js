import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio, Icon, Menu, Dropdown, Row, Col, Progress } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import PPeriodPie from './PPeriodPie';
import PPeriodTable from './Table';

import styles from './style.css';

class PPeriod extends Component {
  getOption() {
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },
      legend: {
        bottom: '1%',
        data: ['3年期', '5-9年期','10年期','期交']
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        top: '1%',
        containLabel: true
      },
      xAxis:  {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        triggerEvent: true,
        data: ['西安','咸阳','渭南','宝鸡','铜川','延安','榆林','汉中','安康','商洛'],
        inverse: true,
      },
      series: {
        name: '个险期交',
        type: 'bar',
        barWidth: '40%',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [320, 302, 301, 334, 390, 330, 320, 320, 320, 320]
      },
      itemStyle: {
        normal: {
          color: '#61A5E8',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      }
    };
  }

  onChartClick(e){
    console.log(e);
  }

  onEvents = {
    'click': this.onChartClick
  }
  render() {

    return (
      <Row gutter={24}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <p className={styles.summary}>¥ {parseFloat(2565566.25).toLocaleString()}</p>
          <div className={styles.progress}><Progress percent={30} showInfo={false} /></div>
          <p className={styles.content}><span className={styles.label}>计划数:</span>555555555555</p>
          <p className={styles.content}><span className={styles.label}>完成进度:</span>30%</p>
          <PPeriodPie />
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <PPeriodTable />
        </Col>
      </Row>
    );
  }
}



PPeriod.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard }) => ({
  global,
  mainBoard,
}))(PPeriod)
