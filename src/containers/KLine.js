import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import IndexList from '../components/Widgets/IndexList';
import KLine from '../components/Widgets/KLine';


class KLinePage extends Component {
  
  componentDidMount(){
  
  }

  
  componentWillUnmount() {
    //this.props.dispatch({type:'global/unCollapse'});
  }
 
  render() {
    return (
      <div>
        <Row>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}><IndexList /></Col>
          <Col xs={24} sm={24} md={20} lg={20} xl={20}><KLine theme={'dark'}/></Col>
        </Row>
      </div>
    );
  }
}

KLinePage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ },{location}) => ({
  location,
}))(KLinePage)
