/**
 * Created by m2mbob on 2017/4/23.
 */
import React, { PureComponent, PropTypes } from 'react'
import { Card, Tag, message, Modal, Button } from 'antd'
import { BarChart, Bar, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend } from 'recharts'
import Api from '../helpers/Api'
import Rest from '../helpers/Rest'

export default class Timing extends PureComponent {
    state = {
        visible: false,
        data: [],
        quota: '',
        color: '',
    }
    componentDidMount() {
        Rest.get(Api.timing)
            .then((data) => {
                this.setState({data})
            })
            .catch(() => {
                message.error('load timing error!')
            })
    }
    handleOk = () => {
        this.setState({
            visible: false,
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleClick = (quota, color) => {
        this.setState({
            quota,
            visible: true,
            color,
        })
    }
    render() {
        const {
            visible,
            quota,
            data,
            color,
        } = this.state
        return (
            <div>
                <Card
                    title="首屏各项时间指标"
                >
                    <div className="timing-image">
                        <img alt="timing" src="/static/assets/images/timing.png" />
                    </div>
                    <div className="timing-card">
                        <div className="timing-item">
                            <Tag color="pink" onClick={() => this.handleClick('first_paint_time', '#f7629e')}>firstPaintTime</Tag>
                            <p>first paint：window.chrome.loadTimes().firstPaintTime * 1000 - window.chrome.loadTimes().startLoadTime * 1000</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="red" onClick={() => this.handleClick('init_dom_tree_time', '#f79992')}>initDomTreeTime</Tag>
                            <p>Request to completion of the DOM loading: domInteractive - responseEnd</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="green" onClick={() => this.handleClick('dom_ready_time', '#76d0a3')}>domReadyTime</Tag>
                            <p>Time spent constructing the DOM tree: domComplete - domInteractive</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="blue" onClick={() => this.handleClick('load_time', '#7ec2f3')}>loadTime</Tag>
                            <p>Total time from start to load: loadEventEnd - fetchStart</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="purple" onClick={() => this.handleClick('request_time', '#b3acf2')}>requestTime</Tag>
                            <p>Time spent during the request: responseEnd - requestStart</p>
                        </div>
                    </div>
                </Card>
                <Modal
                    title={`${quota.replace(/_([a-z])/g, '$1').toUpperCase()} 指标`}
                    visible={visible}
                    width={732}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    wrapClassName="vertical-center-modal"
                    footer={<Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>}
                >
                    <BarChart
                        width={700} height={300} data={data}
                        margin={{top: 20, right: 50, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="type" name="类型" />
                        <YAxis name="时间" unit="ms" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={`${quota}`} fill={color} />
                    </BarChart>
                </Modal>
            </div>
        )
    }
}
