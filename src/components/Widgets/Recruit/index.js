import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Card, Alert, Spin, Menu, Dropdown, Button, Icon, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import classNames from 'classnames';

var month_choose = new Date().getMonth() + 1

class Recruit extends Component {

    componentWillMount() {
        //　设置默认参数
        this.props.dispatch({
            type: 'widgets/setParams',
            payload: {
                widgetId: 'addsalesforce',
                params: {
                    branch: this.props.user.selectedBranch,
                    dim: 'M',
                    time: new Date().getMonth() + 1
                }
            }
        });
    }



    componentDidMount() {
        // 取控件数据
        this.props.dispatch({
            type: 'widgets/getData',
            payload: {
                widgetId: 'addsalesforce',
            }
        });
    }

    // 如果参数变化重新取数

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && (nextProps.params !== this.props.params)) {
            this.props.dispatch({
                type: 'widgets/getData',
                payload: {
                    widgetId: 'addsalesforce',
                }
            });
        }
    }

    getOption() {

        const dataAxis = []
        const rescission = []
        const recruit = []
        const recruitP = []

        if (this.props.data) {
            for (let d of this.props.data) {
                if (d.recruit > 0) {
                    dataAxis.push(d.branch_name)
                    rescission.push(d.rescission)
                    recruit.push(d.recruit)
                    recruitP.push((d.recruitP * 100).toFixed(2))
                }
            }
        }


        return {
            color: ['#7ECF51', '#EECB5F', '#61A5E8'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                left: '1%',
                right: '1%',
                bottom: '1%',
                top: '1.5%',
                containLabel: true
            },
            legend: {
                top: 0,
                data: ['月增员', '月解约', '净增员率'],
                selectedMode: 'multiple',
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    interval: 0,
                    formatter: function (params) {
                        return params.split("").join("\n");
                    },
                    //inside: true,
                    textStyle: {
                        color: '#000'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(170,172,178,0.53)'
                    },
                },
                z: 10
            },
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(170,172,178,0.33)'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(170,172,178,0.53)'
                    },

                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            }, {
                type: 'value',
                margin: 1,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(170,172,178,0.53)'
                    },

                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                        formatter: '{value}%'
                    }
                }
            }
            ],
            visualMap: {
                show: false,
                pieces: [{
                    lt: 0,
                    color: '#096'
                }, {
                    gte: 0,
                    lt: 4,
                    color: '#ffde33'
                }, {
                    gte: 4,
                    color: '#ff9933'
                }],
                seriesIndex: 0,
            },
            series: [
                {
                    name: '净增员率',
                    type: 'line',
                    yAxisIndex: 1,

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
                    data: recruitP,
                    markLine: {
                        silent: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        data: [{
                            yAxis: 0,
                            lineStyle: {
                                normal: {
                                    color: '#096'
                                }
                            }
                        }, {
                            yAxis: 4,
                            lineStyle: {
                                normal: {
                                    color: '#ffde33'
                                }
                            }
                        }]
                    }
                },
                {
                    name: '月增员',
                    visualMap: false,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#76B845'
                        }
                    },
                    data: recruit,

                },
                {
                    name: '月解约',
                    visualMap: false,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#D9A84C'
                        }
                    },
                    data: rescission,

                }
            ]
        };
    }

    onEvents = {
    }

    handleMenuClick(e) {
        month_choose=e.key
        this.props.dispatch({
            type: 'widgets/setParams',
            payload: {
                widgetId: 'addsalesforce',
                params: {
                    time: e.key,
                }
            }
        });
    }

    render() {
        var month = []
        for (var i = 0; i <= new Date().getMonth(); i++)
            month[i] = i + 1;
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                {
                    month.map((item) => {
                        return <Menu.Item key={item}>{item}月</Menu.Item>
                    })
                }
            </Menu>
        );
        return (
            <Card
                title="月增员分析"
                extra={
                    <Dropdown overlay={menu}>
                        <Button style={{ marginLeft: 8 }}>
                            {month_choose}月 <Icon type="down" />
                        </Button>
                    </Dropdown>
                }
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
        );
    }
}

Recruit.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
}

export default connect(({ user, widgets }) => ({
    user,
    params: widgets.params.addsalesforce,
    data: widgets.data.addsalesforce,
    loading: widgets.loading.addsalesforce,
}))(Recruit)
