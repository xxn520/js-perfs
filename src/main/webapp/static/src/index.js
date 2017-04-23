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

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="fpaint">
                <Route path="monitor" component={Monitor} />
                <Route path="memory" component={Memory} />
            </Route>
            <Route path="repaint">
                <Route path="monitor" component={Monitor} />
                <Route path="memory" component={Memory} />
            </Route>
        </Route>
    </Router>
), document.getElementById('app'))
