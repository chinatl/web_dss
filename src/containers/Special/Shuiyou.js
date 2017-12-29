import React from 'react';
import { Row, Col } from 'antd';
import Report from '../../components/Report';
import moment from 'moment'; 

const Shuiyou = () => (
  <div>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginBottom:'12px'}}><Report code="Shuiyou" 
      scroll={{x:800}}
      title="税优报表"
      drillLevel={['P','C']}
      defaultParams={{
          branch: '610000',
          begin_date: '2017-01-01',
          end_date: moment().format('YYYY-MM-DD'),
      }}/></Col>
    </Row>
  </div>
)

export default Shuiyou;