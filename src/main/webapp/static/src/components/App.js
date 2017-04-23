/**
 * Created by m2mbob on 2017/4/21.
 */
import React, { PureComponent, PropTypes } from 'react'
import { Layout, Menu, Icon } from 'antd';
import map from 'lodash/map'
import forEach from 'lodash/foreach'
import { KEY_ROUTE_MAP, TYPES } from '../helpers/consts'
import './style.css'

const { Item, SubMenu } = Menu
const { Header, Sider, Content } = Layout

export default class App extends PureComponent {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    }
    constructor() {
        super()
        this.state = {
            current: this.getCurrent(),
        }
    }
    getCurrent() {
        let current
        let path = location.pathname
        forEach(KEY_ROUTE_MAP, (v, i) => {
            if (v === path) {
                current = i
                return false
            }
        })
        return current
    }
    handleClick = (e) => {
        const path = KEY_ROUTE_MAP[e.key]
        if (path.substr(0, 9) === '/js-perfs') {
            window.location = path
        } else {
            this.context.router.push(path)
            this.setState({
                current: e.key,
            })
        }
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <a href="/" className="logo"/>
                </Header>
                <Layout style={{ marginTop: 60 }}>
                    <Sider
                        trigger={null}
                        width={200}
                        style={{ background: '#fff' }}
                    >
                        <Menu
                            onClick={this.handleClick}
                            style={{ height: window.innerHeight - 60 }}
                            defaultOpenKeys={['fpaint', 'repaint', 'test']}
                            selectedKeys={[this.state.current]}
                            mode="inline"
                        >
                            <Item key="7">首页</Item>
                            <SubMenu key="fpaint" title={<span><Icon type="chrome" /><span>首屏渲染</span></span>}>
                                <Item key="8">帧率</Item>
                                <Item key="9">内存</Item>
                            </SubMenu>
                            <SubMenu key="repaint" title={<span><Icon type="appstore" /><span>重新渲染</span></span>}>
                                <Item key="10">帧率</Item>
                                <Item key="11">内存</Item>
                            </SubMenu>
                            <SubMenu
                                key="test"
                                title={<span><Icon type="api" /><span>测试场</span></span>}
                            >
                                {map(TYPES, ((v, i) =>
                                    <Item key={`${i}`}>{v}</Item>
                                ))}
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, maxHeight: window.innerHeight - 108 }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
