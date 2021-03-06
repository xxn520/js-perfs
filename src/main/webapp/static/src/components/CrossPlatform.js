/**
 * Created by m2mbob on 2017/5/8.
 */
import React, { PureComponent } from 'react'
import { Row, Col, Icon } from 'antd'

export default class CrossPlatform extends PureComponent {
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <h1 style={{color: '#f04134'}}><Icon type="android" />Android</h1>
                        <iframe src="https://appetize.io/embed/h3x3cuxmwmcv8mqpnhgj15cu30?device=nexus5&scale=75&orientation=portrait&osVersion=7.0" width="306px" height="600px" style={{border: 'none'}} scrolling="no"/>
                    </Col>
                    <Col span={8}>
                        <h1 style={{color: '#108ee9'}}><Icon type="apple" />iOS</h1>
                        <iframe src="https://appetize.io/embed/wfjuz7nfk98nk3pz04vk8ugqxr?device=iphone6&scale=75&orientation=portrait&osVersion=10.3" width="317px" height="655px" style={{border: 'none'}} scrolling="no"/>
                    </Col>
                    <Col span={8}>
                        <h1 style={{color: '#00a854'}}><Icon type="chrome" />Web</h1>
                        <iframe src="https://appetize.io/embed/h3x3cuxmwmcv8mqpnhgj15cu30?device=nexus5&scale=75&orientation=portrait&osVersion=7.0" width="317px" height="655px" style={{border: 'none'}} scrolling="no"/>
                    </Col>
                </Row>
            </div>
        )
    }
}
