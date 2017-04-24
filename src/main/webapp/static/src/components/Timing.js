/**
 * Created by m2mbob on 2017/4/23.
 */
import React, { PureComponent, PropTypes } from 'react'
import { Card, Tag } from 'antd'

export default class Timing extends PureComponent {
    handleClick = (quota) => {
        this.context.router.push(`/timing/${quota}`)
    }
    render() {
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
                            <Tag color="pink" onClick={() => this.handleClick('first_paint_time')}>firstPaintTime</Tag>
                            <p>first paint：window.chrome.loadTimes().firstPaintTime * 1000 - window.chrome.loadTimes().startLoadTime * 1000</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="red" onClick={() => this.handleClick('init_dom_tree_time')}>initDomTreeTime</Tag>
                            <p>Request to completion of the DOM loading: domInteractive - responseEnd</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="green" onClick={() => this.handleClick('dom_ready_time')}>domReadyTime</Tag>
                            <p>Time spent constructing the DOM tree: domComplete - domInteractive</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="blue" onClick={() => this.handleClick('load_time')}>loadTime</Tag>
                            <p>Total time from start to load: loadEventEnd - fetchStart</p>
                        </div>
                        <div className="timing-item">
                            <Tag color="purple" onClick={() => this.handleClick('request_time')}>requestTime</Tag>
                            <p>Time spent during the request: responseEnd - requestStart</p>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
