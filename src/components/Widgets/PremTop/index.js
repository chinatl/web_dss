import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Table } from 'antd';
import styles from './styles.css';

const columns = [{
  title: ' ',
  width: '5%', 
}, {
  title: '排名',
  dataIndex: 'rank',
  width: '10%',
}, {
  title: '姓名',
  dataIndex: 'name',
  width: '20%',
}, {
  title: '机构',
  dataIndex: 'branch',
  width: '30%',
}, {
  title: '险种',
  dataIndex: 'pol',
  width: '20%',
}, {
  title: '保费',
  dataIndex: 'prem',
  width: '15%',
}];
const data = [{
  key: '1',
  rank: 1,
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '2',
  rank: 2,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '3',
  rank: 3,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '4',
  rank: 4,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '5',
  rank: 5,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '6',
  rank: 6,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '7',
  rank: 7,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '8',
  rank: 8,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '9',
  rank: 9,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}, {
  key: '10',
  rank: 10,
  branch: '西安xx支公司',
  name: '某某某',
  branch: '西安xx支公司',
  pol: '康宁终身',
  prem: 111111,
}];

class PremTop extends Component {
  componentDidMount() {
  }
 
  render() {
    return (
      <div className={styles.top}>
      <Card title="大单排行" bodyStyle={{padding:0}}>
        <Table columns={columns} dataSource={data} pagination={false} size="middle" />
      </Card>
    </div>
    );
  }
}

PremTop.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global }) => ({
}))(PremTop)
