/**
 * Created by m2mbob on 2017/4/22.
 */
import React, { PureComponent } from 'react'
import { message, Table, Popconfirm, Modal, Button } from 'antd';
import {LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend} from 'recharts'
import { TYPES_FILTER, MUTATIONS_FILTER } from '../helpers/consts'
import { DateFormat } from '../helpers/DateUtils'
import Rest from '../helpers/Rest'
import Api from '../helpers/Api'

export default class Monitor extends PureComponent {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        visible: false,
        chartData: [],
    }
    getColumns() {
        function cancel() {
            message.info('已取消！');
        }
        return [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            filters: TYPES_FILTER,
        }, {
            title: '重绘比率',
            dataIndex: 'mutations',
            key: 'mutations',
            filters: MUTATIONS_FILTER,
            filterMultiple: false,
        }, {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
            render: text => <span>{DateFormat(new Date(text), 'yyyy-MM-dd mm:ss')}</span>,
        }, {
            title: '结束时间',
            dataIndex: 'stop_time',
            key: 'stop_time',
            render: text => <span>{DateFormat(new Date(text), 'yyyy-MM-dd mm:ss')}</span>,
        }, {
            title: '持续时间',
            key: 'keep',
            render: (text, record) => (
                <span>
                {record.stop_time - record.start_time} ms
            </span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:void(0);" onClick={() => this.openModal(record)}>图表</a>
                    <span className="ant-divider" />
                    <a href="javascript:void(0);" onClick={() => this.openModal(record)}>比较</a>
                    <span className="ant-divider" />
                    <Popconfirm title="是否要删除？" onConfirm={() => this.handleDelete(record.id)} onCancel={cancel} okText="确定" cancelText="取消">
                        <a href="javascript:void(0);">删除</a>
                    </Popconfirm>
                </span>
            ),
        }]
    }
    handleTableChange = (pagination, filters) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({
            pagination: pager,
        })
        if (filters.mutations && filters.mutations[0]) {
            const mutations = filters.mutations[0].split('&')
            mutations.forEach((m, i) => {
                const p = m.split('=')
                filters[p[0]] = p[1]
            })
            delete filters.mutations
        }
        this.fetch({
            page: pagination.current - 1,
            ...filters
        });
    }
    handleDelete = (id) => {
        Rest.delete(Api.deleteMonitor(id)).then((data) => {
            message.success('删除成功！');
            this.fetch({ page: this.state.pagination.current - 1 })
        }).catch((e) => {
            message.error('删除失败！');
        })
    }
    handleOk = () => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    convertData = (data) => {
        const d = JSON.parse(data)
        return d.map((v, i) => {
            v.time = DateFormat(new Date(Math.floor((v.start + v.stop) / 2)), 'yyyy-MM-dd mm:ss')
            return v
        })
    }
    openModal = (record) => {
        this.setState({
            visible: true,
            title: `${record.type} 帧率图表`,
            chartData: this.convertData(record.json),
        })
    }
    fetch = (params = { }) => {
        this.setState({ loading: true });
        Rest.get(Api.monitor, params).then((data) => {
            const pagination = { ...this.state.pagination };
            pagination.total = data.total_pages
            this.setState({
                loading: false,
                data: data.content,
                pagination,
            })
        }).catch((e) => {
            this.setState({
                loading: false,
            });
            message.error('加载失败！');
        })
    }
    componentDidMount() {
        this.fetch({ page: this.state.pagination.current - 1 });
    }
    render() {
        return (
            <div>
                <Table columns={this.getColumns()}
                       rowKey={record => `monitor-${record.id}`}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                />
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    width={632}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>}
                >
                    <LineChart
                        width={600} height={300} data={this.state.chartData}
                        margin={{top: 20, right: 50, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="time"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                    </LineChart>
                </Modal>
            </div>
        );
    }
}
