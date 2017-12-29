import React from 'react';
import { Row, Col } from 'antd';
import Report from '../../components/Report';
import moment from 'moment'; 

const Ijk = () => (
  <div>
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}><ReportXs code="Customer"
      scroll={{x:600}}
      title="全预算统计"
      dateType="M"
      drillLevel={['P']}
      defaultParams={{
          branch: '610000',
          begin_date: moment().format('YYYY-MM'),
          end_date: moment().format('YYYY-MM')
      }}/></Col>      
    </Row>
  </div>
)

export default Ijk;