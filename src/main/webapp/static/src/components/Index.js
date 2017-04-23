/**
 * Created by m2mbob on 2017/4/23.
 */
import React, { PureComponent, PropTypes } from 'react'
import { Card, Col, Row } from 'antd'

export default class Index extends PureComponent {
    go = (url) => {
        location.href = url
    }
    render() {
        return (
            <div className="perfs-box">
                <Row>
                    <Col span="6">
                        <Card
                            title="innerHTML 模式"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/innerHTML')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/html.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>直接操作原生DOM</h3>
                                <p>https://www.w3.org/TR/html5/</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card
                            title="脏检查"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/angular')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/angular.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>Angular1 为代表</h3>
                                <p>https://angularjs.org/</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card
                            title="脏检查 + trackBy"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/angular-trackby')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/angular.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>Angular1 为代表</h3>
                                <p>https://angularjs.org/</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card
                            title="依赖收集"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/vue1')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/vue.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>Vue1 为代表</h3>
                                <p>http://v1.vuejs.org/</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card
                            title="依赖收集 + Virtual DOM"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/vue2')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/vue.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>Vue2 为代表</h3>
                                <p>http://vuejs.org/</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card
                            title="Virtual DOM"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/react')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/react.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>React 为代表</h3>
                                <p>https://facebook.github.io/react/</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card
                            title="Virtual DOM + Fiber 架构"
                            extra={<a href="javascript:void(0)" onClick={() => this.go('/js-perfs/react-fiber')}>更多</a>}
                        >
                            <div className="custom-image">
                                <img alt="example" src="/static/assets/images/react.svg" />
                            </div>
                            <div className="custom-card">
                                <h3>React Next</h3>
                                <p>http://isfiberreadyyet.com/</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
