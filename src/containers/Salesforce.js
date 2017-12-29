import React from 'react';
import { Row, Col } from 'antd';
import CurrentSalesforce from '../components/Widgets/CurrentSalesforce';
import Recruit from '../components/Widgets/Recruit';
import SalesforceTrend from '../components/Widgets/SalesforceTrend';
import SalesforceIndex from '../components/Widgets/SalesforceIndex';

const Salesforce = () => (
  <div>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{marginBottom:'12px'}}><SalesforceIndex type='numberQ' indexname='有效人力'/></Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{marginBottom:'12px'}}><SalesforceIndex type='numberM' indexname='T50人力'/></Col>
      <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{marginBottom:'12px'}}><SalesforceIndex type='rate' indexname='增员率'/></Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row>
          <Col span={24} style={{marginBottom:'12px'}} ><CurrentSalesforce /></Col>
        </Row>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginBottom:'12px'}} ><Recruit /></Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginBottom:'12px'}} ><SalesforceTrend /></Col>
    </Row>
  </div>
)

export default Salesforce;