import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio } from 'antd';
import ChannelPie from './ChannelPie';
import PeriodPie from './PeriodPie';
import BranchPie from './BranchPie';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class TodayPrem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      curItem: '渠道',
    }
  }

  componentDidMount() {
  }

  handleItemChange(e) {
    this.setState({
      curItem: e.target.value,
    });
  }

  getOption() {
    return  {

    }
  }

  render() {
    return (
      <Card
        title="当日录单"
        extra={
          <RadioGroup value={this.state.curItem} onChange={(e)=>{this.handleItemChange(e)}} size="small">
            <RadioButton value="渠道">渠道</RadioButton>
            <RadioButton value="年期">年期</RadioButton>
            <RadioButton value="机构">机构</RadioButton>
          </RadioGroup>
        }
      >
        {this.state.curItem==='年期'&&<PeriodPie />}
        {this.state.curItem==='渠道'&&<ChannelPie />}
        {this.state.curItem==='机构'&&<BranchPie />}
      </Card>
    );
  }
}

TodayPrem.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global }) => ({
}))(TodayPrem)
