import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Tabs, Card, Radio } from 'antd';
import BranchRank from '../BranchRank';
import styles from './styles.css';

const TabPane = Tabs.TabPane;

class RankTab extends Component {
    //  构建函数
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  render() {
    return (
      <div className={styles.RankTab}>
        <Card bodyStyle={{padding:0}} title={
          <Radio.Group value={this.state.current} onChange={(v)=>{
                this.setState({
                  current: v.target.value
                });
                //　设置默认参数
                this.props.dispatch({
                type: 'widgets/setParams',
                payload: {
                    widgetId: `Rank/${this.props.data[v.target.value].indexCode}`,
                    params: {
                      index_code: this.props.data[v.target.value].indexCode,
                      top: this.props.data[v.target.value].top||10,
                      level: this.props.data[v.target.value].level
                    }
                }
                });
            }}
            size="small">
            {
              this.props.data && this.props.data.map((d,i)=>
                 <Radio.Button key={i} value={i}>{d.title}</Radio.Button>
              )
            }
            </Radio.Group>

        }>
     
          <BranchRank indexCode={this.props.data[this.state.current].indexCode} level={this.props.data[this.state.current].level} embed/>
   
        </Card>
      </div>
    );
  }
}

RankTab.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(() => ({
}))(RankTab)
