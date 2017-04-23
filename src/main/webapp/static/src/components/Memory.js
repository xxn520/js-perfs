/**
 * Created by m2mbob on 2017/4/22.
 */
import React, { PureComponent } from 'react'
import { message, Table, Popconfirm, Modal, Button, Tooltip as AntTooltip } from 'antd';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'
import findIndex from 'lodash/findIndex'
import { TYPES_FILTER, MUTATIONS_FILTER, TYPES, TYPES_COLORS } from '../helpers/consts'
import { DateFormat } from '../helpers/DateUtils'
import Rest from '../helpers/Rest'
import Api from '../helpers/Api'

export default class Memory extends PureComponent {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        visible: false,
        chartData: [],
        selectedRowKeys: [],
        analyseVisible: false,
        analyseChartData: [],
        analyseLoading: false,
        compareData: [],
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
        Rest.delete(Api.deleteMemory(id)).then((data) => {
            message.success('删除成功！');
            this.fetch({ page: this.state.pagination.current - 1 })
        }).catch((e) => {
            message.error('删除失败！');
        })
    }
    handleAnalyseOk = () => {
        this.setState({
            analyseVisible: false,
        })
    }
    handleAnalyseCancel = () => {
        this.setState({
            analyseVisible: false,
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
    convertData = (data) => {
        const d = JSON.parse(data)
        return d.map((v, i) => {
            v.time = DateFormat(new Date(v.time), 'yyyy-MM-dd mm:ss')
            v.memory = v.memory / (1024*1024)
            return v
        })
    }
    openModal = (record) => {
        this.setState({
            visible: true,
            title: `${record.type} 内存图表`,
            chartData: this.convertData(record.json),
        })
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    analyse = () => {
        this.setState({
            analyseLoading: true,
        })
        setTimeout(() => {
            const { data, selectedRowKeys } = this.state
            const convertKeys = selectedRowKeys.map((v) => {
                return +v.split('-')[1]
            })
            const records = []
            convertKeys.forEach((key) => {
                const index = findIndex(data, (d) => {
                    return key === d.id
                })
                if (index !== -1) {
                    records.push(data[index])
                }
            })
            const analyseChartData = []
            const compareData = []
            records.forEach((r) => {
                const { type, start_time } = r
                const data = JSON.parse(r.json)
                let sum = 0
                data.forEach((d) => {
                    const time = (d.time - start_time)
                    const memory = d.memory / (1024*1024)
                    sum += memory
                    analyseChartData.push({time, [type]: memory})
                })
                compareData.push({name: type, memory: sum / data.length})
            })
            this.setState({
                compareData,
                analyseChartData,
                analyseVisible: true,
                analyseLoading: false,
            })
        }, 1000)
    }
    fetch = (params = { }) => {
        this.setState({ loading: true });
        Rest.get(Api.memory, params).then((data) => {
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
    getHasSelected() {
        let result = true
        let mutation
        const { data, selectedRowKeys } = this.state
        const convertKeys = selectedRowKeys.map((v) => {
            return +v.split('-')[1]
        })
        const mutations = []
        const types = {}
        convertKeys.forEach((key) => {
            const index = findIndex(data, (d) => {
                return key === d.id
            })
            if (index !== -1) {
                if (mutation && mutation !== data[index].mutations) {
                    result = false
                    return false
                }
                if (!types[data[index].type]) {
                    types[data[index].type] = true
                } else {
                    result = false
                    return false
                }
                mutation = data[index].mutations
                mutations.push(mutation)
            }
        })
        if (mutations.length < 2) {
            return false
        } else {
            return result
        }
    }
    componentDidMount() {
        this.fetch({ page: this.state.pagination.current - 1 });
    }
    render() {
        const {
            title,
            visible,
            selectedRowKeys,
            chartData,
            data,
            pagination,
            loading,
            analyseVisible,
            analyseChartData,
            analyseLoading,
            compareData,
        } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const hasSelected = this.getHasSelected()
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <AntTooltip placement="top" title="对比分析要求所有记录的重回比率相同，且同类型记录只有一条">
                        <Button
                            type="primary"
                            onClick={this.analyse}
                            disabled={!hasSelected}
                            loading={analyseLoading}
                        >
                            对比分析
                        </Button>
                    </AntTooltip>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择 ${selectedRowKeys.length} 条` : ''}</span>
                </div>
                <Table columns={this.getColumns()}
                       rowKey={record => `monitor-${record.id}`}
                       dataSource={data}
                       pagination={pagination}
                       loading={loading}
                       onChange={this.handleTableChange}
                       rowSelection={rowSelection}
                />
                <Modal
                    title={title}
                    visible={visible}
                    width={732}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    wrapClassName="vertical-center-modal"
                    footer={<Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>}
                >
                    <LineChart
                        width={700} height={300} data={chartData}
                        margin={{top: 20, right: 50, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="time" name="时间" />
                        <YAxis name="内存" unit="MB" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="memory" stroke="#8884d8" />
                    </LineChart>
                </Modal>
                <Modal
                    title="内存对比分析"
                    visible={analyseVisible}
                    width={732}
                    onOk={this.handleAnalyseOk}
                    onCancel={this.handleAnalyseCancel}
                    wrapClassName="vertical-center-modal"
                    footer={<Button key="back" size="large" onClick={this.handleAnalyseCancel}>关闭</Button>}
                >
                    <LineChart
                        width={700} height={300} data={analyseChartData}
                        margin={{top: 20, right: 50, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="time" type="number" unit="ms" name="时间" />
                        <YAxis unit="MB" name="内存" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        {
                            TYPES.map(t =>
                                <Line type="monotone" dataKey={t} stroke={TYPES_COLORS[t]} />
                            )
                        }
                    </LineChart>
                    <BarChart
                        width={700} height={300} data={compareData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="name" name="类型" />
                        <YAxis name="内存" unit="MB" />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="memory" fill="#00a2ae" />
                    </BarChart>
                </Modal>
            </div>
        );
    }
}
