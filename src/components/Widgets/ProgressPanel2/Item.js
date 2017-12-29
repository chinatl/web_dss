import React from 'react';
import { Row, Col, Progress } from 'antd';
import styles from './styles.css';

const Item = ({ label, completed, percent }) => (
  <Col span={12} style={{padding:10}}>
    <Row>
      <Col span={8}>
        <Progress type="circle" percent={percent} width={64} />
      </Col>
      <Col span={16} className={styles.progressText} >
        <p className={styles.progressNum}>{completed}</p>
        <p className={styles.progressLabel}>{label}</p>
      </Col>
    </Row>
  </Col>   
  )

export default Item;