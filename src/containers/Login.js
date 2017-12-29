import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col, Form, Input } from 'antd';
import styles from './Login.css';
import logoImg from '../assets/images/logo.png';
import yzlLogoImg from '../assets/images/yzl-logo.png';

const FormItem = Form.Item

class Login extends Component {

  componentDidMount(){
    document.body.className=styles.login;
  }

  handleOk () {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch({ type: 'user/login', payload: { ...values, redirect: this.props.redirect } })
    })
  }

  render() {
    const { loading } = this.props.user;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.login}>
      <Row gutter={16}>
        <Col xs={0} sm={0} md={0} lg={14} xl={14} >ppp</Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10} >
          <div className={styles.form}>
            <div className={styles.logo}>
              <img alt={'logo'} src={logoImg}/>
              <span>陕西分公司决策支持系统</span>
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
                })(<Input size="large" onPressEnter={()=>{this.handleOk()}} placeholder="用户名" />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '密码不为空',
                    },
                  ],
                })(<Input size="large" type="password" onPressEnter={()=>{this.handleOk()}} placeholder="密码" />)}
              </FormItem>
              <Row>
                <Button type="primary" size="large" onClick={()=>{this.handleOk()}} loading={loading}>
                  登录
                </Button>
                <p>
                  <img alt={'yzllogo'} src={yzlLogoImg}/><span>使用云助理用户和密码登录</span>
                </p>
              </Row>

            </form>
          </div>        
        </Col>
      </Row>
      </div>
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