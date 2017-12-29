import React from 'react';
import echarts from 'echarts'; 
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col } from 'antd';
import classNames from 'classnames';
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
                        color: '#7ecf51'
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
          <div className={styles.number}><strong>2311.22</strong></div>
          <div className={styles.label}>当日录单</div>
          <ReactEcharts
            option={option}
            notMerge
            lazyUpdate
            style={{ height: '50px', width: '100%' }}
          />
        </Card>
      </div>
      <div className={styles.datagrid}>
        <Card bordered>
          <Row gutter={0}>
            <Col span={8} className={classNames(styles.datacol, styles.datacolBr)}>
              <div className={styles.dataNumber}><strong>1890.22</strong></div>
              <div className={styles.dataLabel}>个险</div>
            </Col>
            <Col span={8} className={classNames(styles.datacol, styles.datacolBr)}>
              <div className={styles.dataNumber}><strong>22.22</strong></div>
              <div className={styles.dataLabel}>团险</div>
            </Col>
            <Col span={8} className={styles.datacol}>
              <div className={styles.dataNumber}><strong>111.22</strong></div>
              <div className={styles.dataLabel}>银保</div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
export default PDay;
