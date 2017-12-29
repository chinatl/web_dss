import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import echarts from 'echarts'; 
import ReactEcharts from 'echarts-for-react';

class present extends Component {
  //  构建函数
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
		widgetId: `present`,
        params: {
          branch: this.props.user.selectedBranch,
		 index_code:['666101'] 
        }
      }
    });
  }
  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
    	widgetId: `present`
      }
    });
  }
  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
    		widgetId: `present`
        }
      });
    }
  }
  // 加工控件数据
   // 加工控件数据
  getWidgetData() {
	  if(this.props.data !== undefined){
		  var x  = this.props.data.data;
		  var newdata = '';
		  for(var k in x){
			 newdata = x[k];
		  }
		  return newdata
	  }
  };

  render() {
    return (
	  <div ref='div'>{this.getWidgetData()}<span>万元</span></div>
    );
  }
}


present.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}


export default connect(({ user, widgets }) => ({
  user: user,
  params: widgets.params[`present`],
  data: widgets.data[`present`],
}))(present)
