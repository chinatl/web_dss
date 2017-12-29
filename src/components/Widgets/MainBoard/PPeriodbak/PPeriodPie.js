import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
import { Tag } from 'antd';

class PPeriodPie extends Component {

  getOption() {
    return{
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)",

      },
      series: [{
              name:'访问来源',
              type:'pie',
              radius: ['42%', '55%'],
            color: ['#61A5E8', '#7ECF51', '#EECB5F'],
              label: {
                  normal: {
                      formatter: '{b}\n{c}万元'
                  },
            
              },
              data:[
                  {value:435, name:'3年期'},
                  {value:679, name:'5-9年期'},
                  {value:848, name:'10年期'},
          
              ]
          }
      ]
  };
  }

  render() {

    return (
      <div>
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          style={{height: '200px', width: '80%'}} 
          lazyUpdate={true}
        />
        <ul>
          <li><Tag color="#61A5E8">    </Tag></li>
        </ul>
      </div>
    );
  }
}



PPeriodPie.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard }) => ({
  global,
  mainBoard,
}))(PPeriodPie)
