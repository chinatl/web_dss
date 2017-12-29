import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col, Form, Input, Layout, Card } from 'antd';

import HeaderContent from '../components/Layout/HeaderContent';
import styles from './Login.css';
import logoImg from '../assets/images/logo.png';
import yzlLogoImg from '../assets/images/yzl-logo.png';

const FormItem = Form.Item

const { Header, Content, Sider, Footer } = Layout;

class Login extends Component {

  componentWillMount() {
    //　设置默认参数
    // this.props.dispatch({ type: 'user/login', payload: { id:'16100412',password:'Clic610000', redirect: this.props.redirect } })
//	
  }


  handleOk() {
  	if(this.refs.autologin.checked){
		localStorage.setItem('autologin','true');
	}else {
		localStorage.setItem('autologin','false');
		localStorage.setItem('isguoqi','true')
	}
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch({ type: 'user/login', payload: { ...values, redirect: this.props.redirect } })
    })
  }

  myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (userAgent.indexOf("compatible") > -1 && !!window.ActiveXObject || "ActiveXObject" in window && !isOpera) {
      return "IE";
    }; //判断是否IE浏览器
  }




  render() {
    const { loading } = this.props.user;
    const { getFieldDecorator } = this.props.form;
    const mb = this.myBrowser();

    if ("IE" == mb) {
      return (
        <Layout>
          <Header className={styles.header} >
            <HeaderContent />
          </Header>
          <Layout>
            <Layout className={styles.content}>
              <Content className={styles.login} style={{ height: Math.max(window.innerHeight, document.body.clientHeight) - 130 }}>
                <Row>
                  <div className={styles.ghost}>
                    <div className={styles.warn}>
                      <img src={require('../assets/images/warn.png')} alt="" />
                    </div>
                  </div>
                </Row>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                ©2017 中国人寿保险股份有限公司陕西省分公司
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      )
    }
    else
      return (
        <Layout>
          <Header className={styles.header} >
            <HeaderContent />
          </Header>
          <Layout>
            <Layout className={styles.content}>
              <Content className={styles.login} style={{ height: Math.max(window.innerHeight, document.body.clientHeight) - 130 }}>
                <Row>
                  <Col xs={0} sm={0} md={0} lg={14} xl={14} >
                    <div className={styles.banner}>
                      <img src={require('../assets/images/report2.png')} alt="" />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={10} xl={10} >
                    <div className={styles.form}>
                      <div className={styles.logo}>
                        <span>登录</span>
                      </div>
                      <form>
                        <FormItem hasFeedback>
                          {getFieldDecorator('id', {
                            rules: [
                              {
                                required: true,
                                message: '用户名不为空',
                              },
                            ],
                          })(<Input size="large" onPressEnter={() => { this.handleOk() }} placeholder="用户名" />)}
                        </FormItem>
                        <FormItem hasFeedback>
                          {getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: '密码不为空',
                              },
                            ],
                          })(<Input size="large" type="password" onPressEnter={() => { this.handleOk() }} placeholder="密码" />)}
                        </FormItem>
                        <Row>
                         <p style={{margin:'-10px 0 0 3px',padding:0,textAlign:'left'}}><input ref='autologin' type="checkbox" style={{margin:'3px 3px 0 0',float:"left"}}/><label for=""  style={{float:"left"}}>一周内不用登陆?</label></p>
                          <Button type="primary" size="large" onClick={() => { this.handleOk() }} loading={loading}>
                            登录
                        </Button>
                          <p>
                            <img alt={'yzllogo'} src={yzlLogoImg} /><span>使用云助理用户和密码登录</span>
                          </p>
                        </Row>

                      </form>
                    </div>
                  </Col>

                </Row>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                ©2017 中国人寿保险股份有限公司陕西省分公司
            </Footer>
            </Layout>
          </Layout>
        </Layout>
      )
  }

}

Login.propTypes = {
  form: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user }, { location }) => ({
  user,
  redirect: location.query.redirect,
}))(Form.create()(Login));