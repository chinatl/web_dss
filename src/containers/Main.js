import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { NavBar , Icon, Grid  } from 'antd-mobile';
import { Carousel } from 'antd';

import Style from './Main.css'
import IndexDetails from '../components/Widgets/IndexDetails';
import PrentPolicyPount from '../components/Widgets/PrentPolicyPount';
import Present from '../components/Widgets/Present';
import ListNumber from '../components/Widgets/ListNumber';
import Report from '../components/Widgets/Report'
import Report1 from '../components/Widgets/Report1'

import { Link } from 'react-router';
class lastupdtime extends Component {
	state = {
		data :[]
	};
	componentWillMount() {
		this.props.dispatch({
		  type: 'widgets/setParams',
		  payload: {
			widgetId: 'lastupdtime',
			params: {
				"index_code": ["666101","666201"]
			}
		  }
		});
    }
  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: 'lastupdtime'
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: 'lastupdtime'
        }
      });
    }
  }
  render() {
    return (
		<div>	
		<Carousel autoplay speed='500'>
			<div><h3>1</h3></div>
			<div><h3>2</h3></div>
			<div><h3>3</h3></div>
			<div><h3>4</h3></div>
		</Carousel>
      <div className={Style.container}>
		   <div className={Style.sheet_module}>
				<div className = {Style.sheet}>
					<div className={Style.push}>开门红个险当日录单</div>
					<div className={Style.numer} ref='gexian1'><Present /></div>
				</div> 
				<div className={Style.charts}>
					<div className={Style.more}>
						<span style={{float:'left'}}>数据更新时间({this.props.data && this.props.data["666101"]})</span>    
					</div> 
					 <div style={{height:'20px'}}></div>
					<div style={{border:'1px solid #eee',borderRadius:'4px'}}>
						<Report
						code="policycountsumtable"
						scroll={{x:340}}
						drillLevel={['P']}
						/>
					</div>
			   </div>
			</div>
        	<div className={Style.sheet_module}>
        		<div className = {Style.sheet}>
					<div className={Style.push}>开门红个险期交</div>
					<div className={Style.numer}  ref='gexian2'><ListNumber /></div>
				</div> 
				 <div className={Style.charts} >
				   <div className={Style.more}>
						<span style={{float:'left'}}>数据更新时间({this.props.data && this.props.data["666201"]})</span>    
					</div> 
					 <div style={{height:'20px'}}></div>
					 <div style={{border:'1px solid #eee',borderRadius:'4px'}}>
						<Report1
							code="premiumscaletable"
							defaultParams={{branch:"610000"}}
							scroll={{x:340}}
							drillLevel={['P']}
						/>
					 </div>
				
        		</div>
        	</div>
      </div>
      </div>
    );
  }
}

lastupdtime.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
  user: user,
  params: widgets.params.lastupdtime,
  data: widgets.data.lastupdtime,
  loading: widgets.loading.lastupdtime,
}))(lastupdtime)



