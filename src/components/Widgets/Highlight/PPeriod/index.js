import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from 'antd';
import styles from './styles.css';

var tips = 37;
const option = {
    title: {
        text: (tips * 1) + '%',
        x: 'center',
        y: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 12,
        }
    },
    series: [{
        name: 'loading',
        type: 'pie',
        radius: ['90%', '100%'],
        hoverAnimation: false,
        label: {
            normal: {
                show: false,
            }
        },
        data: [{
        value: tips,
        itemStyle: {
            normal: {
                color: '#fff',
                shadowBlur: 80,
                shadowColor: '#3A6FB5'
            }
        }
    }, {
        value: 100 - tips,
        itemStyle: {
            normal: {
                color: '#3A6FB5'
            }
        }
    }],
    }]
};
function PPeriod() {
  return (
    <div className={styles.premPeriod}>
      <div className={styles.charts}>
        <Card bordered>
          <div className={styles.data}>
            <div className={styles.number}><strong>2311.22</strong></div>
            <div className={styles.label}>个险期交</div>
          </div>
          <div className={styles.progress}>
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
export default PPeriod;