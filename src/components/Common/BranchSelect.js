import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Modal, Tree } from 'antd';
import branchData from '../../assets/data/branch.json';

const TreeNode = Tree.TreeNode;

class BranchSelect extends Component {

  renderTree = (data) => {
    return (
        data&&data.map((data,index)=>
        <TreeNode title={data.label} key={data.value}>
          {
            data.children && this.renderTree(data.children)
          }
        </TreeNode>
      )
    );
  }

  render() {
    return (
      <Modal
        title="机构选择"
        visible={this.props.visible}
        footer={null}
      >
      <Tree
        showLine
        defaultExpandedKeys={[this.props.selected]}
        defaultSelectedKeys={[this.props.selected]}
        onSelect={this.props.onSelect}
        onCancel={this.props.onCancel}
      >
        {this.renderTree(branchData)}
      </Tree>
      </Modal>
    );
  }
}

BranchSelect.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ }) => ({
}))(BranchSelect)
