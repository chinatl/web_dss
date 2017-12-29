import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio, Alert, Spin } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import classNames from 'classnames';
class PremTrend extends Component {
    // 构建函数
    constructor(props) {
        super(props);
        this.state = {
            channel:'P',
        }
    }
    componentWillMount() {
        //　设置默认参数
        this.props.dispatch({
            type: 'widgets/setParams',
            payload: {
                widgetId: 'PremTrend',
                params: {
                    branch: this.props.user.selectedBranch,
                    index_code: ['015100','015000','035100','035000','025100','025000'],
                    time: 'D',
                    period: 28
                }
            }
        });
    }
    componentDidMount() {
        // 取控件数据
        this.props.dispatch({
            type: 'widgets/getData',
            payload: {
                widgetId: 'PremTrend'
            }
        });
    }
    // 如果参数变化重新取数
    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && nextProps.params.index_code && (nextProps.params !== this.props.params)) {
            this.props.dispatch({
                type: 'widgets/getData',
                payload: {
                    widgetId: 'PremTrend'
                }
            });
        }
    }
    getOption(index) {
        return {
            color: ['#61A5E8', '#7ECF51', '#EECB5F'],
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 15,
                    color: "#fff",
                }
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },            
            legend:{
                orient: 'horizontal',
                itemGap: 20,
                //itemWidth:16,
                //itemHeight:12,
                data: ['生效','录单'],
                textStyle: {
                    color: '#000',
                },
                left: 8,
            },
            grid: {
                left: '3%',
                right: '4%',
                top:'10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                //在（type: 'category'）中设置data有效
                data: this.props.data[index].time,
            }],
            yAxis: [{
                type: 'value',
            }],
            series: [{
                name: '录单',
                type: 'line',
                symbolSize: 8,
                lineStyle: { //线条样式 
                    normal: {
                        width: 2
                    }
                },
                itemStyle: { //折现拐点标志的样式
                    normal: {
                        color: '#EECB5F'
                    }
                },
                data: this.props.data[index+1].data,
            }, {
                name: '生效',
                type: 'line',
                symbolSize: 8,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#7ECF51'
                    }
                },
                data: this.props.data[index].data,
            }
            ] //series结束
        }; // option结束
    }

    render() {

        return (
            <Spin spinning={this.props.loading} size="large" tip="加载中...">
                <Card
                    title="保费平台"
                    extra={
                        <div>
                        <span style={{marginRight:'15px'}} >
                        <Radio.Group  size="small" value={this.state.channel} onChange={(v)=>{
                          this.setState({
                             channel: v.target.value,
                          });
                        }}>
                            <Radio.Button value="P">个险</Radio.Button>
                            <Radio.Button value="G">团险</Radio.Button>
                            <Radio.Button value="B">银保</Radio.Button>
                        </Radio.Group>
                        </span>
                        <Radio.Group  size="small" value={this.props.params ? this.props.params.time : ''} onChange={(v) => {
                            //　设置默认参数
                            this.props.dispatch({
                                type: 'widgets/setParams',
                                payload: {
                                    widgetId: 'PremTrend',
                                    params: {
                                        time: v.target.value,
                                        period: classNames({
                                            28: v.target.value === 'D',
                                            12: v.target.value === 'M',
                                            10: v.target.value === 'W',
                                            5: v.target.value === 'Y',
                                        })
                                    }
                                }
                            });
                        }}>
                            <Radio.Button value="D">日</Radio.Button>
                            <Radio.Button value="W">周</Radio.Button>
                            <Radio.Button value="M">月</Radio.Button>
                            <Radio.Button value="Y">年</Radio.Button>
                        </Radio.Group>
                        </div>
                    }
                    bodyStyle={{ padding: 0}}
                >
                    {
                        this.props.data &&
                        <ReactEcharts
                            option={this.getOption(parseInt(classNames({
                                0: this.state.channel === 'P',
                                2: this.state.channel === 'G',
                                4: this.state.channel === 'B',
                            })))}
                            notMerge={true}
                            style={{ height: '410px', width: '100%', marginBottom: '9px'}}
                            lazyUpdate={true}
                        />
                    }
                    {
                        !this.props.data &&
                        <Alert
                            message="提示"
                            description="暂无数据"
                            type="warning"
                            showIcon
                        />
                    }
                </Card>
            </Spin>
        );
    }
}
PremTrend.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
}
export default connect(({ user, widgets }) => ({
    user,
    params: widgets.params.PremTrend,
    data: widgets.data.PremTrend,
    loading: widgets.loading.PremTrend,
}))(PremTrend)