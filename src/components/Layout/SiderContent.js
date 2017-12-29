import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';
import { push } from 'react-router-redux';
import styles from './SiderContent.css';
const { SubMenu } = Menu;

class SiderContent extends Component {

  handleClick = (e) => {
    if (e.key === '/commandcenter') {
      window.location.href ="http://10.184.1.22/rtreport";
    } else {
      this.props.dispatch(push(e.key));
    }

  }
  render() {
    return (
      <div className={styles.sider}>
        <Menu
          mode={this.props.collapsed ? 'vertical' : 'inline'}
          theme="light"
          defaultSelectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
          onClick={(e)=>this.handleClick(e)}
        >
          <SubMenu key="report_" title={<span style={{color:"#f15246"}}><Icon type="layout" />2018开门红</span>}>
            <Menu.Item key="/report?id=KMH2018-zs"><span style={{color:"#f15246"}}><Icon type="appstore-o" />实收保费</span></Menu.Item>
            <Menu.Item key="/report?id=KMH2018-ld"><span style={{color:"#f15246"}}><Icon type="appstore-o" />录单保费</span></Menu.Item>          
          </SubMenu>
          <Menu.Item key="/dashboard"><span><Icon type="appstore-o" />业绩分析</span></Menu.Item>
          <Menu.Item  key="/salesforce"><span><Icon type="team" />人力分析</span></Menu.Item>
          <Menu.Item key="/kline"><span><Icon type="line-chart" />K线分析</span></Menu.Item>
          <SubMenu key="kpi" title={<span><Icon type="bar-chart" />经营分析</span>}>
          <Menu.Item key="/managekpi">经营指标</Menu.Item>
          <Menu.Item key="/report?id=JYZB2018">考核指标</Menu.Item>
          </SubMenu>
          <SubMenu key="report" title={<span><Icon type="layout" />数字报表</span>}>
            <Menu.Item key="/report?id=KB1">当日录单</Menu.Item>
            <Menu.Item key="/report?id=KB2">个险在途</Menu.Item>
            <Menu.Item key="/report?id=CW3">个险业务发展</Menu.Item>
            <Menu.Item key="/report?id=CW5">银保业务发展</Menu.Item>
            <Menu.Item key="/report?id=CW4">短险业务发展</Menu.Item>
            <Menu.Item key="/report?id=CW1">全省业务总览</Menu.Item>
            <Menu.Item key="/report?id=CW2">全省业务进度</Menu.Item>
          </SubMenu>
          <Menu.Item key="/commandcenter"><span><Icon type="appstore-o" />作战指挥室</span></Menu.Item>
          <SubMenu key="special" title={<span><Icon type="layout" />专项报表</span>}>
            <Menu.Item key="/special/eck">e创客</Menu.Item>
            <Menu.Item key="/special/shuiyou">税优报表</Menu.Item>
            <Menu.Item key="/report?id=eshop">e店推广</Menu.Item>
            <Menu.Item key="/report?id=ebao">e宝推广</Menu.Item>
            <Menu.Item key="/report?id=doublee">两e追踪</Menu.Item>
          </SubMenu>
          {
          /*
          <Menu.Item><span><Icon type="select" />自助提取</span></Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="layout" />传统报表</span>}>
            <Menu.Item key="1">当日录单快报</Menu.Item>
            <Menu.Item key="2">个险快报</Menu.Item>
          </SubMenu>
          */
          }

        </Menu>
      </div>
    );
  }
}

SiderContent.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global }) => ({
   collapsed: global.collapsed,
}))(SiderContent)
