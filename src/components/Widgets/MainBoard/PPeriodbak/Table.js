import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react';
import { Table, Progress, Popover, Row, Col } from 'antd';


const columns = [{
  title: '机构',
  dataIndex: 'branch',
}, {
  title: '首年期交',
  dataIndex: 'period',
}, {
  title: '3年期',
  dataIndex: 'period3',
}, {
  title: '5-9年期',
  dataIndex: 'period59',
}, {
  title: '10年期',
  dataIndex: 'period10',
}, {
  title: '计划',
  dataIndex: 'plan',
}, {
  title: '完成',
  dataIndex: 'completed',
  render: (x) =>   <Popover content={x}>
    <Progress type="circle" percent={x*100} width={18} strokeWidth={20} showInfo={false} />
  </Popover>
}];



const data = [{
  key: '1',
  branch: '西安',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '2',
  branch: '咸阳',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '3',
  branch: '宝鸡',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '4',
  branch: '渭南',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '5',
  branch: '铜川',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '6',
  branch: '延安',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '7',
  branch: '榆林',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '8',
  branch: '汉中',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '9',
  branch: '安康',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82
}, {
  key: '10',
  branch: '商洛',
  period: 32,
  period3: 111,
  period59: 25,
  period10: 55,
  plan: 555,
  completed: 0.82      
}];


class PPeriodTable extends Component {

  render() {
    return (
      <Row gutter={16}>
        {
          data.map((item, index)=>
            <Col span={12}>{item.branch}: {item.period}</Col>
          )
        }
      </Row>
    );
  }
}



PPeriodTable.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard }) => ({
  global,
  mainBoard,
}))(PPeriodTable)
