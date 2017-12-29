import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, BackTop, Spin } from 'antd';
import HeaderContent from './HeaderContent';
import SiderContent from './SiderContent';
import styles from './MainLayout.css';
import classNames from 'classnames';

const { Header, Content, Sider, Footer } = Layout;

class MainLayout extends Component {
  render() {

    return (
      <Layout>
        <Header className={styles.header} >
          <HeaderContent />
        </Header>
        <Layout>
          <Sider width={this.props.collapsed?39:180} collapsedWidth={0} breakpoint="lg" style={{ background: '#f5f5f5', borderRight: '1px solid #e3e3e3' }}>
            <SiderContent location={this.props.location}/>
          </Sider>
          <Layout className={classNames({
            [styles.mainContent]: true,
            [styles.mainContentKLine]: this.props.location.pathname === '/kline', 
            [styles.mainContentKLine2]: this.props.location.pathname === '/kline2',
          })}>
             <BackTop /> 
                <Content style={{ padding: 24, margin: 0, minHeight: 800 }}>
                  {this.props.children}
                </Content>
            <Footer style={{ textAlign: 'center' }}>
              ©2017 中国人寿保险股份有限公司陕西省分公司
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  collapsed: PropTypes.bool,
}

export default connect(({ global },{location}) => ({
  collapsed: global.collapsed,
  location,
}))(MainLayout)
