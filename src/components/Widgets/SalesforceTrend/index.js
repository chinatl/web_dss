import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Radio, Alert, Spin, Menu, Dropdown, Button, Icon, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import classNames from 'classnames';

var indexes = [
    {
        index_code: '112000',
        dim: 'M',
        legendname: '签约人力'
    },
    {
        index_code: '113000',
        dim: 'M',
        legendname: 'T50人力'
    }
]

class SalesforceTrend extends Component {


    componentWillMount() {
        //　设置默认参数
        this.props.dispatch({
            type: 'widgets/setParams',
            payload: {
                widgetId: 'SalesforceTrend',
                params: {
                    branch: this.props.user.selectedBranch,
                    indexes: indexes,
                }
            }
        });
    }

    componentDidMount() {
        // 取控件数据
        this.props.dispatch({
            type: 'widgets/getData',
            payload: {
                widgetId: 'SalesforceTrend'
            }
        });
    }

    // 如果参数变化重新取数
    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && (nextProps.params !== this.props.params)) {
            this.props.dispatch({
                type: 'widgets/getData',
                payload: {
                    widgetId: 'SalesforceTrend'
                }
            });
        }
    }

    getOption() {
        const index_data = []
        const index_legend=[]
        for (let d of this.props.data)
            index_data.push(d.value)
        for (let i of indexes)
            index_legend.push(i.legendname)
            console.log(index_legend)
        return {
            color: ['#61A5E8', '#7ECF51', '#EECB5F', '#E4925D'],
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 15,
                    color: "#fff",
                }
            },
            legend: {
                orient: 'horizontal',
                //itemWidth:16,
                selectedMode: 'multiple',
                data: index_legend,
                textStyle: {
                    color: '#000',
                },
            },
            grid: {
                show: true,
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                //boundaryGap: false,
                //在（type: 'category'）中设置data有效
                data: this.props.data[0].time,
                splitLine: { //坐标轴在 grid 区域中的分隔线；
                    show: true,
                    interval: 0,
                    lineStyle: { //分割线颜色，可设单个，也可以设置数组。
                        color: 'rgba(170,172,178,0.33)'
                    }
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#E16757',
                        width: 2
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,0.83)',
                        fontSize: 15,
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(170,172,178,0.33)'
                    }
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: true,
                    lineStyle: {
                        color: 'rgba(170,172,178,0.53)'
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,0.83)',
                        fontSize: 12,
                    },
                },
            },
            ],
            series: [{
                name: index_legend[0],
                type: 'line',
                lineStyle: { //线条样式 
                    normal: {
                        width: 1.5
                    }
                },
                itemStyle: { //折现拐点标志的样式
                    normal: {
                        color: '#4E8ACF'
                    }
                },
                data: index_data[0],
            }, {
                name: index_legend[1],
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#76B845'
                    }
                },
                data: index_data[1],
            }
            ] //series结束
        }; // option结束
    }
    onLegendSelectChanged(e) {
    }




    onEvents = {
        'legendselectchanged': this.onLegendSelectChanged.bind(this)
    }

    render() {
        return (
            <Card
                title="人力趋势图"
                extra={
                    <Radio.Group value={this.props.params ? this.props.params.time : ''} onChange={(v) => {
                        if (v.target.value == 'M')
                            indexes = [
                                {
                                    index_code: '112000',
                                    dim: 'M',
                                    legendname: '签约人力'
                                },
                                {
                                    index_code: '113000',
                                    dim: 'M',
                                    legendname: 'T50人力'
                                }
                            ]
                        else if (v.target.value == 'Q')
                            indexes = [
                                {
                                    index_code: '111000',
                                    dim: 'Q',
                                    legendname:'有效人力'
                                }
                            ]
                        //　设置默认参数
                        this.props.dispatch({
                            type: 'widgets/setParams',
                            payload: {
                                widgetId: 'SalesforceTrend',
                                params: {
                                    indexes: indexes,
                                }
                            }
                        });
                    }}>
                        <Radio.Button value="M">月</Radio.Button>
                        <Radio.Button value="Q">季</Radio.Button>
                    </Radio.Group>
                }

            >
                {
                    this.props.data &&
                    <ReactEcharts
                        option={this.getOption()}
                        notMerge={true}
                        style={{ height: '300px', width: '100%' }}
                        lazyUpdate={true}
                        onEvents={this.onEvents}
                    />
                }
            </Card>
        );
    }
}

SalesforceTrend.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
    user,
    params: widgets.params.SalesforceTrend,
    data: widgets.data.SalesforceTrend,
    loading: widgets.loading.SalesforceTrend,
}))(SalesforceTrend)
