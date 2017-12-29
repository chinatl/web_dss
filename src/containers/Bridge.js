import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import Report from '../components/Report';
import moment from 'moment'; 



class Bridge extends Component {
  
  render() {
    return (
      <div>
      {
        this.props.location.query.id === 'reporteckxs' &&
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}><Report code="Xs" 
          scroll={{x:800}}
          title="小说会统计"
          drillLevel={['P','C']}
          defaultParams={{
              branch: '610000',
              begin_date: '2017-07-01',
              end_date: moment().format('YYYY-MM-DD'),
          }}/></Col>
        </Row>
      }
      {
        this.props.location.query.id === 'reporteckcustomer' &&
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}><Report code="Customer" 
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
      }
      {
        this.props.location.query.id === 'reporteckbudget' &&
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginBottom:'12px'}}><Report code="Budget" 
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
      }      
      {
        this.props.location.query.id === 'reportijkcustomer' &&
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}><Report code="Customer" 
          scroll={{x:400}}
          title="i聚客获客统计"
          drillLevel={['P','C']}
          defaultParams={{
              branch: '610000',
              begin_date: '2017-07-01',
              end_date: moment().format('YYYY-MM-DD'),
              channel: 'B',
          }}/></Col>
        </Row>
      }
      </div>
    );
  }
}

Bridge.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ },{location}) => ({
  location,
}))(Bridge)
