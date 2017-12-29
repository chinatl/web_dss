import React from 'react';
import { Row, Col } from 'antd';
import KPIMap from '../components/Widgets/KPIMap';
import KPIDetails from '../components/Widgets/KPIDetails';

const ManageKPI = () => (
  <div>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}><KPIMap /></Col>
      <Col xs={24} sm={24} md={16} lg={16} xl={16}><KPIDetails /></Col>
    </Row>
  </div>
)

export default ManageKPI;