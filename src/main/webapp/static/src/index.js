/**
 * Created by m2mbob on 2017/4/21.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/App'
import Index from './components/Index'
import Monitor from './components/Monitor'
import Memory from './components/Memory'
import Timing from './components/Timing'
import CrossPlatform from './components/CrossPlatform'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="fpaint">
                <Route path="timing" component={Timing} />
            </Route>
            <Route path="repaint">
                <Route path="monitor" component={Monitor} />
                <Route path="memory" component={Memory} />
            </Route>
            <Route path="crossplatform" component={CrossPlatform}/>
        </Route>
    </Router>
), document.getElementById('app'))
