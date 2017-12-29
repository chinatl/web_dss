import React from 'react';
import echarts from 'echarts'; 
import ReactEcharts from 'echarts-for-react';
import { Card } from 'antd';
import styles from './styles.css';

const option = {
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            show:false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            show:false,
        }
    ],
    grid: {
        top: 1,
        left: 5,
        right: 5,
        bottom: 1,
    },
    series : [
        {
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
            data:[120, 132, 101, 134, 90, 230, 210]
        }
    ]
};

function PDay() {
  return (
    <div className={styles.premDay}>
      <div className={styles.charts}>
        <Card bordered>
          <div className={styles.data}>
            <div className={styles.number}><strong>2311.22</strong></div>
            <div className={styles.label}>当日录单</div>
          </div>
          <div className={styles.echarts}>
            <ReactEcharts
              option={option}
              notMerge
              lazyUpdate
              style={{ height: '50px', width: '100%' }}
            />
          </div>
          <div style={{ clear: 'both' }} />
        </Card>
      </div>
    </div>
  );
}
export default PDay;
