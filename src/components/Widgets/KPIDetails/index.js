import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Table, Tag, Dropdown, Menu } from 'antd';
 const columns = [{
  title: '机构',
  dataIndex: 'branch_name',
  key: 'branch_name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '权重类指标得分',
  dataIndex: 'weight_idc',
  key: 'weight_idc',
}, {
  title: '专项类指标得分',
  dataIndex: 'special_idc',
  key: 'special_idc',
}, {
  title: '个险首年期交',
  dataIndex: 'competi_gxsnqj',
  key: 'competi_gxsnqj',
}, {
  title: '个险销售人力',
  dataIndex: 'competi_gxxsrl',
  key: 'competi_gxxsrl',  
}, {
  title: '综合得分',
  dataIndex: 'final_score',
  key: 'final_score',    
}, {
  title: '排名',
  dataIndex: 'sort',
  key: 'sort',   
}, {
  title: '模拟评级',
  key: 'grade',
  render: (text, record) => (
    <span>
      {
        record.grade === 'AAA' && <Tag color="#f50">AAA</Tag>
      }
      {
        record.grade === 'AA' && <Tag color="#f50">AA</Tag>
      }      
      {
        record.grade === 'A' && <Tag color="#f50">A</Tag>
      }
      {
        record.grade === 'BBB' && <Tag color="#2db7f5">BBB</Tag>
      }
      {
        record.grade === 'BB' && <Tag color="#2db7f5">BB</Tag>
      }      
      {
        record.grade === 'B' && <Tag color="#2db7f5">B</Tag>
      }      
    </span>
  ),
}];

class KPIDetails extends Component {
  
  //  构建函数
  constructor(props) {
    super(props);
    this.state = {
      period: '2017年上半年'
    }
  }

  componentWillMount() {
    //　设置默认参数
    this.props.dispatch({
      type: 'widgets/setParams',
      payload: {
        widgetId: 'BusinessIndicator',
        params: {
          begin_date: '20170101',
          end_date: '20170630',
          branch: '610000'
        }
      }
    });
  }

  componentDidMount() {
    // 取控件数据
    this.props.dispatch({
      type: 'widgets/getData',
      payload: {
        widgetId: 'BusinessIndicator'
      }
    });
  }

  // 如果参数变化重新取数
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && (nextProps.params !== this.props.params)) {
      this.props.dispatch({
        type: 'widgets/getData',
        payload: {
          widgetId: 'BusinessIndicator'
        }
      });
    }
  }

  render() {
    return (
      <Card title="经营指标详情" extra={
        <Dropdown.Button 
          overlay={
          <Menu onClick={(e)=>{
              if (e.key === '2016'){
                this.props.dispatch({
                  type: 'widgets/setParams',
                  payload: {
                    widgetId: 'BusinessIndicator',
                    params: {
                      begin_date: '20160101',
                      end_date: '20161231',
                      branch: '610000'
                    }
                  }
                });
                this.setState({period:'2016年'});
              } else {
                this.props.dispatch({
                  type: 'widgets/setParams',
                  payload: {
                    widgetId: 'BusinessIndicator',
                    params: {
                      begin_date: '20170101',
                      end_date: '20170630',
                      branch: '610000'
                    }
                  }
                });
                this.setState({period:'2017年上半年'});
              }
            }}>
            <Menu.Item key="2016">2016年</Menu.Item>
            <Menu.Item key="201701">2017年上半年</Menu.Item>
          </Menu>
        }>
          {this.state.period}
        </Dropdown.Button>
      }>
        <Table size="middle" columns={columns} dataSource={this.props.data} rowKey="branch" pagination={false} />
      </Card>
    );
  }
}

KPIDetails.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
  user: user,
  params: widgets.params.BusinessIndicator,
  data: widgets.data.BusinessIndicator,
  loading: widgets.loading.BusinessIndicator,
}))(KPIDetails)
