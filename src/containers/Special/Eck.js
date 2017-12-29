import React from 'react';
import { Row, Col } from 'antd';
import Report from '../../components/Report';
import moment from 'moment'; 

const Eck = () => (
  <div>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{marginBottom:'12px'}}><Report code="Xs" 
      scroll={{x:800}}
      title="小说会统计"
      drillLevel={['P','C']}
      defaultParams={{
          branch: '610000',
          begin_date: '2017-07-01',
          end_date: moment().format('YYYY-MM-DD'),
      }}/></Col>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{marginBottom:'12px'}}><Report code="Customer" 
      scroll={{x:400}}
      title="e创客获客统计"
      drillLevel={['P','C']}
      defaultParams={{
          branch: '610000',
          begin_date: '2017-07-01',
          end_date: moment().format('YYYY-MM-DD'),
          channel: 'P',
      }}/></Col>
  
    </Row>
  </div>
)

export default Eck;