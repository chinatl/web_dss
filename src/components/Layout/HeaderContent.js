import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Menu, Icon, Dropdown, Button, Affix } from 'antd';
import styles from './HeaderContent.css';
import BranchSelect from '../Common/BranchSelect2';

class HeaderContent extends Component {
  
  //  构建函数
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
 
          
          <div>
			  {this.props.username && <BranchSelect />}
            <div className={styles.logo} />
            {
              this.props.username &&
            <div className={styles.user}>
              <Dropdown overlay={
                <Menu>
                  <Menu.Item>
                    <div onClick={()=>{this.props.dispatch({type: 'user/logout'})}}>退出</div>
                  </Menu.Item>
                </Menu>
              }>
                <a className="ant-dropdown-link" href="#">
                  <img className={styles.avatar} alt="" src={require('../../assets/images/avatar.png')} />
                  {this.props.username} <Icon type="down" />
                </a>
              </Dropdown>
            </div>

            }
          </div>
        
      </div>
    );
  }
}

HeaderContent.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user }) => ({
  username: user.user ? user.user.name : null,
}))(HeaderContent)
