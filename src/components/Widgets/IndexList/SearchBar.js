import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Form, Input, Icon } from 'antd';
import styles from './styles.css';

const FormItem = Form.Item;

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyWords: '',
    }
  }

  componentDidMount() {
  }

  handleSearch() {
    this.props.dispatch({
      type: 'indexList/filter',
      payload: {
        keyWords: this.state.keyWords,
      },
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('keyWords', {
          })(<Input size="default" placeholder="输入指标代码或名称" suffix={<Icon type="search" />}/>)}
        </FormItem>
      </Form>
    );
  }
}

SearchBar.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ }) => ({
}))(Form.create({
  onFieldsChange(props, changedFields) {
    props.dispatch({
      type: 'indexList/filter',
      payload: {
        keyWords: changedFields.keyWords.value,
      },
    });
  },
})(SearchBar));
