import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Select} from 'antd';

const Option = Select.Option;

class CitySelect extends Component {

  render() {
    return (
      <Select size="small" value={this.props.value} style={{ width: 60 }} onChange={this.props.onChange}>
        <Option value="610000">全省</Option>
        <Option value="610100">西安</Option>
        <Option value="610200">铜川</Option>        
        <Option value="610300">宝鸡</Option>                      
        <Option value="610400">咸阳</Option>
        <Option value="610500">渭南</Option>
        <Option value="610600">汉中</Option>
        <Option value="610700">延安</Option>
        <Option value="612100">安康</Option>
        <Option value="612200">商洛</Option>              
        <Option value="612300">榆林</Option>    
      </Select>
    );
  }
}

CitySelect.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ }) => ({
}))(CitySelect)
