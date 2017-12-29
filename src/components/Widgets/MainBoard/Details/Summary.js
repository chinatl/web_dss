import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Progress } from 'antd';
import styles from './style.css'

class PPeriodSummary extends Component {

  render() {

    return (
      <div className={styles.summary}>
        <div className={styles.summaryNum}>12354,33</div>
        <div className={styles.summaryRight}>
          <div className={styles.summaryLabel}>个险期交</div>
          <div className={styles.summaryPlan}>计划: 123333,44</div>
        </div>
        <div className={styles.summaryBottom}>
          <Progress percent={30} strokeWidth={5} />
        </div>
      </div>
    );
  }
}



PPeriodSummary.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ global, mainBoard }) => ({
  global,
  mainBoard,
}))(PPeriodSummary)
