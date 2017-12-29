import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Row, Col, Spin, Card } from 'antd';
import styles from './styles.css';
import classNames from 'classnames';


var SFindex = [];
var indexname_current,indexname_average,index_dim

class SalesforceIndex extends Component {

  componentWillMount() {
      if (this.props.indexname === '有效人力')
      {
        SFindex = ['111000', '111100', '111200']
        index_dim = 'Q'
      }
      else if(this.props.indexname === 'T50人力')
      {
        SFindex = ['113000', '113100', '113200']
        index_dim = 'M'
      }
      else if(this.props.indexname === '增员率')
      {
        SFindex = ['114000', '114100', '114200']
        index_dim = 'M'
      }
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: `SalesforceIndex${this.props.type}`,
        params: {
          branch: this.props.user.selectedBranch,
          indexes: SFindex,
          dim: index_dim
        }
      }
    });
  }

  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: `SalesforceIndex${this.props.type}`
      }
    });
  }

  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: `SalesforceIndex${this.props.type}`
        }
      });
    }
  }

  render() {
    
    if (this.props.indexname === '有效人力')
      {
        indexname_current = '当季有效人力'
        indexname_average = '季均有效人力'
      }
      else if(this.props.indexname === 'T50人力')
      {
        indexname_current = '当月T50人力'
        indexname_average = '月均T50人力'
      }
      else
      {
        indexname_current = '当月增员率'
        indexname_average = '月均增员率'
      }

    return ( 

      <div className={
        classNames({
          [styles.itemStandardSF]: this.props.indexname === '有效人力',
          [styles.itemT50]: this.props.indexname === 'T50人力',
          [styles.itemRecruitP]: this.props.indexname === '增员率',
        })
      }>
        {
          this.props.data &&
          <Card bordered>
            <div className={styles.data}>
              <Row>
                <Col span={12} className={styles.col}>
                  <div className={styles.label}>{indexname_current}</div>
                  <div className={styles.number}><strong>{this.props.data[0].value_current}</strong></div>
                </Col>
                <Col span={12}>
                  <div className={styles.label}>{indexname_average}</div>
                  <div className={styles.number}><strong>{this.props.data[0].value_average}</strong></div>
                </Col>
              </Row>
              <Row>
                <Col span={6} className={styles.datacol}>
                  <div className={styles.SubLabel}>营销</div>
                  <div className={styles.SubNumber}><strong>{this.props.data[1].value_current}</strong></div>
                </Col>
                <Col span={6} className={styles.datacol}>
                  <div className={styles.SubLabel}>收展</div>
                  <div className={styles.SubNumber}><strong>{this.props.data[2].value_current}</strong></div>
                </Col>
                <Col span={6} className={styles.datacol}>
                  <div className={styles.SubLabel}>营销</div>
                  <div className={styles.SubNumber}><strong>{this.props.data[1].value_average}</strong></div>
                </Col>
                <Col span={6} className={styles.datacol}>
                  <div className={styles.SubLabel}>收展</div>
                  <div className={styles.SubNumber}><strong>{this.props.data[2].value_average}</strong></div>
                </Col>
              </Row>
            </div>
          </Card>
        }
      </div>
    );
  }
}

SalesforceIndex.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, widgets }, { type , indexname }) => ({
  user,
  indexname,
  params: widgets.params[`SalesforceIndex${type}`],
  data: widgets.data[`SalesforceIndex${type}`],
  loading: widgets.loading[`SalesforceIndex${type}`],
}))(SalesforceIndex)

