import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio, Icon, Menu, Dropdown, Alert, Tag } from 'antd';
import Details from './Details';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const indexList ={
  ['011001']:'个险期交',
  ['011010']:'个险十年期',
  ['012000']:'个险标保',
  ['021001']:'银保期交',
  ['021010']:'银保十年期',
  ['022000']:'银保标保',
  ['004000']:'短期险',
}

class MainBoard extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: 'mainBoard/changeItem',
      payload: '011001',
    })
  }
 

  handleItemChange(e) {
    if (e.target.value !== 'more'){
      this.props.dispatch({
        type: 'mainBoard/changeItem',
        payload: e.target.value
      })
    }
  }

  render() {

    const { curItem } = this.props.mainBoard;

    return (
      <Card
        title="业绩分析"
        bodyStyle={{height:'350px'}}
        extra={
          <div>
            <RadioGroup value={curItem} onChange={(e)=>{this.handleItemChange(e)}} size="small">
              {
                Object.keys(indexList).map((indexCode,i)=>
                  <RadioButton value={indexCode} key={i}>{indexList[indexCode]}</RadioButton>
                )
              }
            </RadioGroup>
          </div>
        }
      >
        <Details indexCode={curItem} indexName={indexList[curItem]}/>
      </Card>
    );
  }
}

MainBoard.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard }) => ({
  global,
  mainBoard,
}))(MainBoard)
