import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
class PeriodPie extends Component {

  componentDidMount() {
  }

  getOption() {
    return {
         grid: {
        left: '20%',
        right: '20%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    color:['#F0C5A8','#EAAD84','#E3935D','#CE754D'],
	    series : [
	        {
	            name: '当日录单',
	            type: 'pie',
	            radius: ['20%', '40%'],
                avoidLabelOverlap: false,
	            data:[
	                {value:335, name:'趸交'},
	                {value:310, name:'三年期'},
	                {value:234, name:'五年期'},
                  {value:234, name:'十年期'},
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                },
	                 normal: {
	                    label:{ 
                            show: true, 
                            formatter: '{b} : {c} ({d}%)' 
                        }
	                },
                  labelLine :{show:true},
	            }
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

PeriodPie.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global }) => ({
}))(PeriodPie)
