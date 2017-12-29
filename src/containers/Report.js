import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Iframe from '../components/Common/Iframe';

const width = Math.max( window.innerWidth, document.body.clientWidth ) -230;
const height =  Math.max( window.innerHeight, document.body.clientHeight ) -120;



class Report extends Component {
  
  componentDidMount(){
  
  }

  
  componentWillUnmount() {
    //this.props.dispatch({type:'global/unCollapse'});
  }
 
   render() {
    return (
      <div>
      <Iframe url={`http://10.184.128.6/ereport/reportviewer.aspx?id=${this.props.location.query.id||'KMH2018'}&uuusername=${this.props.user.user.id}`}
            width={width}
            height={height}
            styles={{height, width}} 
            allowFullScreen/>
      </div>
    );
  }
}


Report.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user },{location}) => ({
  user,
  location,
}))(Report)
