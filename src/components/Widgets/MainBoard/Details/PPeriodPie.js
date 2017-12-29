import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
import { Tag } from 'antd';
import styles from './style.css'

class PPeriodPie extends Component {


  getOption(indexName,sum,data1,data2) {


    // 总和
    var total = {
        name: indexName,
        value: sum.toFixed(2)
    }

    return{
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        top: '1%',
        containLabel: true
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      title: [{
            text: total.name,
            left: '49%',
            top: '40%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#999',
                fontWeight: 'normal',
                fontSize: 14
            }
        }, {
            text: total.value,
            left: '49%',
            top: '54%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
                color: '#666',
                fontWeight: 'normal',
                fontSize: 22
            }
        }],
      series: [
                {
            name:'',
            type:'pie',
            hoverAnimation: false,
            legendHoverLink:false,
            radius: ['68%', '75%'],
            color: ['#3A6FB5', '#6EA038', '#C48438'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                },
            },
            tooltip: {
               show:false,
            },
            
            data:data1
        },{
              name:'',
              type:'pie',
              radius: ['75%', '95%'],
              color: ['#61A5E8', '#7ECF51', '#EECB5F'],
              label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
              },
              data:data2
          }
      ]
  };
  }

  render() {
    let sum = 0;
    let data1 = [];
    let data2 = [];
    const color =['#61A5E8','#7ECF51','#EECB5F']

    for (let d of this.props.data){
      sum += d.value,
      data1.push({vaule:d.value,name:''});
      data2.push(d);
    }
    

    return (
      <div>
        <ReactEcharts
          option={this.getOption(this.props.indexName,sum,data1,data2)} 
          notMerge={true}
          style={{height: '150px', width: '100%'}} 
          lazyUpdate={true}
        />
        <table className={styles.chartslegend}>
          <tbody>
            {
                data2 && data2.length>0 && data2.map((d,index)=>
                <tr key={index}>
                    <td><Tag style={{height: '10px',width: '10px',borderRadius: '0', padding: '0'}} color={color[index]}></Tag></td>
                    <td>{this.props.dataCache.indexNameList[d.index_code]}</td>
                    <td className={styles.legendvalue}>{d.value}</td>
                </tr>
                )

            }

          </tbody>                    
        </table>
      </div>
    );
  }
}



PPeriodPie.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard, dataCache }) => ({
  dataCache,
  global,
  mainBoard,
}))(PPeriodPie)
