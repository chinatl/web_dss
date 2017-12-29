import React from 'react';
import { Card, Row, Col } from 'antd';
import classNames from 'classnames';
import Item from './Item';
import styles from './styles.css';


function ProgressCard({ channel, data }) {
  const span = channel==='P'?6:12;
  return (
    <div className={
      classNames({
        [styles.progressCard]: true,
        [styles.progressCardP]: channel === 'P' ,
        [styles.progressCardB]: channel === 'B' ,
        [styles.progressCardG]: channel === 'G' ,
      })
    }>
      <Card bordered>
        <div className={styles.title}>
          {
            classNames({
              '个险业务进度': channel === 'P' ,
              '银保业务进度': channel === 'B' ,
              '团险业务进度': channel === 'G' ,
            })
          }
        </div>
        <Row>
          {
            data && data.length>0 && data.map((d,index)=>
              <Col xs={12} sm={12} md={span} lg={span} xl={span} key={index}>
                <Item {...d} />
              </Col>
            )
          }
        </Row>
      </Card>
    </div>
  );
}

export default ProgressCard;