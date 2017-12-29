import React from 'react';
import { Progress } from 'antd';
import styles from './styles.css';


function ProgressItem({completed,index_name,percent}) {

  return (
    <div className={styles.item}>
      <div className={styles.charts}>
        <Progress type="circle" percent={percent} width={100} format={percent =>
          <div className={styles.progressLabel} >
            <p className={styles.completed}>{completed}</p>
            <p className={styles.percent}>{`${percent}%`}</p>
          </div>
          } />
        <div className={styles.indexName}>{index_name}</div>
      </div>

    </div>
  );
}

export default ProgressItem;