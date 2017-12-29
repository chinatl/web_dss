import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import Common from '../components/Common/index.js'
class Test extends Component {
  render() {
    return (
      <div>
        <Common code='82'/>  
      </div>
    );
  }
}

export default connect(({ },{}) => ({

}))(Test)
