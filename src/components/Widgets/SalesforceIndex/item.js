import React from 'react';
import { Card, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './styles.css';


function Item({ indexname, data }) {
  return (
    <div className={
      classNames({
        [styles.itemStandardSF]: indexname === '有效人力' ,
        [styles.itemT50]: indexname === 'T50人力' ,
        [styles.itemRecruitP]: indexname === '增员率' ,
      })
    }>
           {
                <Card bordered>
                <div className={styles.data}>
                    <Row>
                    <Col span ={12} className={styles.col}>
                    <div className={styles.label}>{indexname}</div>
                    <div className={styles.number}><strong>{data}</strong></div>
                    </Col>
                    <Col span ={12}>
                    <div className={styles.label}>{indexname}</div>
                    <div className={styles.number}><strong>{data}</strong></div>
                    </Col>
                    </Row>
                <Row>
                    <Col span={6} className={styles.datacol}>
                    <div className={styles.SubLabel}>营销</div>
                    <div className={styles.SubNumber}><strong>{data}</strong></div>
                    </Col>
                    <Col span={6} className={styles.datacol}>
                    <div className={styles.SubLabel}>收展</div>
                    <div className={styles.SubNumber}><strong>{data}</strong></div>
                    </Col>
                    <Col span={6} className={styles.datacol}>
                    <div className={styles.SubLabel}>营销</div>
                    <div className={styles.SubNumber}><strong>{data}</strong></div>
                    </Col>
                    <Col span={6} className={styles.datacol}>
                    <div className={styles.SubLabel}>收展</div>
                    <div className={styles.SubNumber}><strong>{data}</strong></div>
                    </Col>
                </Row>
                </div>
                </Card>
        }
    </div>
  );
}

export default Item;