import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Dropdown, Affix, Button, Menu } from 'antd';
import branchData from '../../assets/data/branch.json';
import styles from './BranchSelect2.css';
const SubMenu = Menu.SubMenu;


class BranchSelect extends Component {


  menu = (
    <Menu onClick={(item)=>{
 
         this.props.dispatch({
                  type: 'user/selectBranch',
                  payload: {
                    branch: item.key
                  }
                });
      }}>
      <Menu.Item key={branchData[0].key}>{branchData[0].label}</Menu.Item>
      {
        branchData[0].children.map((b,i)=>
          <SubMenu key={b.key} title={b.label} className={styles.branchList}>
            <Menu.Item key={b.key}>{b.label}</Menu.Item>
              {
                b.children.map((bc,i)=>
                  <Menu.Item key={bc.key}>{bc.label}</Menu.Item>
                )
              }
          </SubMenu>
        )
      }
    </Menu>
  );


  render() {
    return (
      <Affix>      
        <div className={styles.branch}>          
          <Dropdown overlay={this.menu} placement="bottomLeft" >
          <Button
            icon="fork"
            type="primary"
          >
            <span>机构选择:</span>
            {
              this.props.selectedBranch?
                this.props.branchList[`${this.props.selectedBranch}`].branchName
                :'请选择'
            }
          </Button>
          </Dropdown>
        </div>
      </Affix>
    );
  }
}

BranchSelect.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, dataCache }) => ({
  branchList: dataCache.branchList,
  selectedBranch: user.selectedBranch,
}))(BranchSelect)