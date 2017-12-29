import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Table } from 'antd';
import styles from './styles.css';


const indexesDef = {
  ['012000']: '个险首年标保',
  ['022000']: '银保首年标保',
  ['001001']: '首年期交',
  ['001010']: '十年期'
}

class BranchRank extends Component {
  
  //  构建函数
  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        title: '',
        dataIndex: 'rank',
        width: '10%',
        className: styles.rank,
        render: (value, row, index) => {
          if (value <= 3 ){
            return <img alt={value} src={require(`../../../assets/images/rank${value}.png`)} />
          } else {
            return value;
          }
        }
      }, {
        title: '机构',
        dataIndex: 'branch_name',
        width: '50%',
      }, {
        title: indexesDef[this.props.indexCode],
        dataIndex: 'amnt',
        width: '30%',
        className: styles.amnt,
      }],
    }
  }

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: `Rank/${this.props.indexCode}`,
        params: {
          index_code: this.props.indexCode,
          top: this.props.top||10,
          level: this.props.level
        }
      }
    });
  }  

  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: `Rank/${this.props.indexCode}`
      }
    });
  }
  
  //  加工控件数据
  getWidgetData() {
    const data = [];
    if (this.props.data){
      for (let r of this.props.data.rank) {
        data.push({...r,key:r.rank,branch_name:r.branch_name.replace('陕西','')});
      }
    }
    return data;
  }
  
  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: `Rank/${this.props.indexCode}`
        }
      });
    }
  }

  render() {
    const data = this.getWidgetData();
    
    return (
      <div className={styles.top}>
      <Card loading={this.props.loading} title={this.props.embed?null:`${indexesDef[this.props.indexCode]}排名`} bodyStyle={{padding:0}}>
        <Table
          columns={this.state.columns}
          showHeader={false}
          dataSource={data}
          pagination={false}
          size="middle"
          rowClassName={(record, index)=>{
            if (index < 3 ) {
              return styles[`rank${index+1}row`];
            } else {
              return '';
            }
          }}
        />
      </Card>
    </div>
    );
  }
}

BranchRank.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ widgets }, { indexCode }) => ({
  params: widgets.params[`Rank/${indexCode}`],
  data: widgets.data[`Rank/${indexCode}`],
  loading: widgets.loading[`Rank/${indexCode}`], 
}))(BranchRank)
