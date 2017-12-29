import React from 'react';
import { Row, Col, Progress } from 'antd';
import classNames from 'classnames';
import styles from './styles.css';

const Item = ({ label, completed, percent, salesChannel }) => (
  <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{marginBottom:20}}>
    <Row>
      <Col span={2} />
      <Col span={10}>
        <div 
          className={
            classNames({
              [styles.progressP]: salesChannel === 'P',
              [styles.progressG]: salesChannel === 'G',
              [styles.progressB]: salesChannel === 'B',
            })
          }
        ><Progress type="circle" percent={percent} width={78} /></div>
      </Col>
      <Col span={10} className={styles.progressText} >
        <p className={styles.progressNum}>{completed}</p>
        <p className={styles.progressLabel}>{label}</p>
      </Col>
      <Col span={2} />
    </Row>
  </Col>   
  )

export default Item;