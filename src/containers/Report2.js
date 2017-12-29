import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Iframe from '../components/Common/Iframe';

const width = Math.max( window.innerWidth, document.body.clientWidth ) -230;
const height =  Math.max( window.innerHeight, document.body.clientHeight ) -120;



class Report2 extends Component {
  
  componentDidMount(){
  
  }

  
  componentWillUnmount() {
    //this.props.dispatch({type:'global/unCollapse'});
  }
 
   render() {
    return (
      <div>
      <Iframe url={`http://10.184.1.22/rtreport`}
            width={width}
            height={height}
            styles={{height, width}} 
            allowFullScreen/>
      </div>
    );
  }
}


Report2.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user },{location}) => ({
  user,
  location,
}))(Report2)
