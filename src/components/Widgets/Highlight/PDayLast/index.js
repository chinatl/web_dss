import React from 'react';
import { Card, Row, Col } from 'antd';
import styles from './styles.css';


function PDayLast() {
  return (
    <div className={styles.premDay}>
      <div className={styles.charts}>
        <Card bordered>
          <div className={styles.data}>
            <div className={styles.number}><strong>2311.22</strong></div>
            <div className={styles.label}>昨日录单</div>
          </div>
          <div style={{ clear: 'both' }} />
        </Card>
      </div>
    </div>
  );
}
export default PDayLast;
