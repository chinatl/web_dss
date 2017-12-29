import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Row, Col, Card, Spin } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

const SFlegend = ['当前签约人力', '当月T50人力', '今日参会人力', '当季有效人力']
class CurrentSalesforce extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: {
                ['当前签约人力']: true,
                ['当月T50人力']: true,
                ['今日参会人力']: false,
                ['当季有效人力']: false,
            },
        }
    }


    componentWillMount() {
        //　设置默认参数
        this.props.dispatch({
            type: 'widgets/setParams',
            payload: {
                widgetId: 'CurrentSalesforce',
                params: {
                    indexes: ['112000', '113000', '116000', '111000'],
                    branch: this.props.user.selectedBranch,
                }
            }
        });
    }

    componentDidMount() {
        // 取控件数据
        this.props.dispatch({
            type: 'widgets/getData',
            payload: {
                widgetId: 'CurrentSalesforce',
            }
        });
    }

    // 如果参数变化重新取数

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && (nextProps.params !== this.props.params)) {
            this.props.dispatch({
                type: 'widgets/getData',
                payload: {
                    widgetId: 'CurrentSalesforce',
                }
            });
        }
    }


    getOption() {

        //this.props.data
        const dataAxis = [];
        const signedSF = [];
        const t50 = [];
        const attendSF = [];
        const standardSF = [];

        if (this.props.data) {
            for (let d of this.props.data) {
                Object.keys(d).forEach((key, index) => {

                    if (key == '112000') {
                        signedSF.push(d[key])
                        dataAxis.push(d.branch_name)
                    }
                    else if (key == '113000')
                        t50.push(d[key])
                    else if (key == '116000')
                        attendSF.push(d[key])
                    else if (key == '111000')
                        standardSF.push(d[key])
                }
                )
            }
        }

        /*var dataAxis = ['西安', '咸阳', '宝鸡', '渭南', '铜川', '榆林', '延安', '汉中', '安康', '商洛'];
        var signedSF = [8255, 5666, 3000, 4434, 590, 3666, 1000, 1320, 1523, 1025];
        var t50 = [8255, 5666, 3000, 4434, 590, 3666, 1000, 1320, 1523, 1025];
        var attendSF = [8255, 5666, 3000, 4434, 590, 3666, 1000, 1320, 1523, 1025];
        var standardSF = [8255, 5666, 3000, 4434, 590, 3666, 1000, 1320, 1523, 1025];*/

        return {
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                top: '10%',
                containLabel: true
            },
            legend: {
                top: 0,
                data: SFlegend,
                selectedMode: 'multiple',
                selected: this.state.selected
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    saveAsImage: { show: true }
                }
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    interval: 0,
                    formatter: function (params) {
                        return params.split("").join("\n");
                    },
                    //rotate: -30,
                    //inside: true,
                    textStyle: {
                        color: '#000'
                    }
                },
                /*axisTick: {
                    show: false
                },*/
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            series: [
                {
                    name: '当前签约人力',
                    type: 'bar',
                    barMaxWidth: 25,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#99BDF9' },
                                    { offset: 1, color: '#4285F4' }
                                ])
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#4285F4' },
                                    { offset: 1, color: '#99BDF9' }
                                ])
                        }
                    },
                    data: signedSF
                },
                {
                    name: '当月T50人力',
                    type: 'bar',
                    barMaxWidth: 25,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#c2efa9' },
                                    { offset: 1, color: '#7ecf51' }
                                ])
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#7ecf51' },
                                    { offset: 1, color: '#c2efa9' }
                                ])
                        }
                    },
                    data: t50
                },
                {
                    name: '今日参会人力',
                    type: 'bar',
                    barMaxWidth: 25,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#f9e7ae' },
                                    { offset: 1, color: '#eecb5f' }
                                ])
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#eecb5f' },
                                    { offset: 1, color: '#f9e7ae' }
                                ])
                        }
                    },
                    data: attendSF
                },
                {
                    name: '当季有效人力',
                    type: 'bar',
                    barMaxWidth: 25,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#f3b5ac' },
                                    { offset: 1, color: '#e16757' }
                                ])
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: '#e16757' },
                                    { offset: 1, color: '#f3b5ac' }
                                ])
                        }
                    },
                    data: standardSF
                }
            ]
        };
    }
    onChartClick(e) {

    }
    onLegendSelectChanged(e) {
        console.log(e)
        for (var i = 0; i < SFlegend.length; i++)
            e.selected[SFlegend[i]] = false
        e.selected[e.name] = true
        e.selected['当前签约人力'] = true
        this.setState({
            selected: e.selected
        });
    }

    onEvents = {
        'legendselectchanged': this.onLegendSelectChanged.bind(this)
    }
    render() {
        return (
            <Spin spinning={this.props.loading} size="large" tip="加载中...">
                <Card
                    title="当前人力统计"
                >
                    {
                        <ReactEcharts
                            option={this.getOption()}
                            notMerge={true}
                            style={{ height: '300px', width: '100%' }}
                            lazyUpdate={true}
                            onEvents={this.onEvents}
                        />
                    }
                </Card>
            </Spin>
        );
    }
}
CurrentSalesforce.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
}
export default connect(({ global, widgets, user }) => ({
    global,
    user,
    params: widgets.params.CurrentSalesforce,
    data: widgets.data.CurrentSalesforce,
    loading: widgets.loading.CurrentSalesforce,
}))(CurrentSalesforce)