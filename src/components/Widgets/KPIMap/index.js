import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card } from 'antd';
import shaanxiJson from '../../../assets/data/shaanxi.json'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'; 

class KPIMap extends Component {

  componentDidMount() {
  }

  getOption() {
    let data = [];
    for (let d of this.props.data) {
      data.push({
        name: `${d.branch_name}市`,
        value: d.final_score
      })
    }

    echarts.registerMap('shaanxi', shaanxiJson);

    let option = {
    tooltip: {
        trigger: 'item'
    },
  visualMap: {
        type: 'piecewise', //分段型。
        splitNumber: 5,
        pieces: [{
            min: 0,
            max: 100,
            label:'100以下',
            color: '#F5CBC5'
        }, {
            min: 100,
            max: 120,
            label:'100-120',
            color: '#EFADA5'
        }, {
            min: 120,
            max: 140,
            label:'120-140',
            color: '#E88B7F'
        }, {
            min: 140,
            max: 160,
            label:'140-160',
            color: '#E16757'
        }, {
            min: 160,
            label:'160以上',
            color: '#CB5450'
        }],
        left: '5%',
        top: '5%',
        textStyle: {
            color: '#000'
        },
    },
    series: [
            {
                name: '综合得分',
                type: 'map',
                mapType: 'shaanxi',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: '#9D2C42'
                    },
                    emphasis:{
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data:data
            },
        ]
    };
    return option;
  }

  render() {
    return (
      <Card title="经营指标" bodyStyle={{padding: 1}}>
        {
          this.props.data &&
            <ReactEcharts
            option={this.getOption()} 
            notMerge={true}
            style={{height: '520px', width: '100%'}} 
            lazyUpdate={true}
            />
        }

      </Card>
    );
  }
}

KPIMap.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}


export default connect(({ widgets }) => ({
  params: widgets.params.BusinessIndicator,
  data: widgets.data.BusinessIndicator,
  loading: widgets.loading.BusinessIndicator,
}))(KPIMap)
