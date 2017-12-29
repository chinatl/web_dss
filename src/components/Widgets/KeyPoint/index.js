import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio, Icon, Menu, Dropdown } from 'antd';
import createG2 from 'g2-react';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const menu = (
  <Menu>
    <Menu.Item key="1">个险人力</Menu.Item>
    <Menu.Item key="2">个险首年标保</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">银保期缴</Menu.Item>
    <Menu.Item key="4">银保标保</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="5">个险短期险</Menu.Item>
    <Menu.Item key="6">银保短期险</Menu.Item>
    <Menu.Item key="7">团险短期险</Menu.Item>
  </Menu>
);



const Chart = createG2(chart => {
  chart.axis('branch',{
    title: null
  });
  chart.coord('rect').reflect('y').transpose();
  chart.col('value', {
    alias: '个险期交'
  });
  chart.interval().position('branch*value').label('value');
  chart.render();
});

var data = [
  {"branch":"西安","value":12331},
  {"branch":"咸阳","value":8000},
  {"branch":"宝鸡","value":4000},
  {"branch":"铜川","value":1000},
  {"branch":"渭南","value":5500},
  {"branch":"延安","value":3000},
  {"branch":"榆林","value":6000},
  {"branch":"汉中","value":4200},
  {"branch":"安康","value":4000},
  {"branch":"商洛","value":2000}
];

class KeyPoint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartOption: {
        data: data,
        forceFit: true,
        height: 300,
        width: 300,
        plotCfg: {
          margin: [20, 20, 20, 60]
        },
      }
    }
  }

  render() {
    return (
      <Card
        title="业绩动态"
        extra={
          <div>
            <RadioGroup defaultValue="a" size="small">
              <RadioButton value="a">个险期交</RadioButton>
              <RadioButton value="b">银保首年</RadioButton>
              <RadioButton value="c">短期险</RadioButton>
              <Dropdown overlay={menu}>
              <RadioButton value="d">更多 <Icon type="down" /></RadioButton>
              </Dropdown>
            </RadioGroup>
          </div>
        }
      >
        <Chart {...this.state.chartOption} />
      </Card>
    );
  }
}

KeyPoint.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global }) => ({
}))(KeyPoint)
