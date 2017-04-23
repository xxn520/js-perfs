/**
 * Created by m2mbob on 2017/4/20.
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import jsPerfs from './js-perfs'

class Query extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.elapsedClassName !== this.props.elapsedClassName) return true
        if (nextProps.formatElapsed !== this.props.formatElapsed) return true
        if (nextProps.query !== this.props.query) return true
        return false
    }

    render() {
        return (
            <td className={ "Query " + this.props.elapsedClassName}>
                {this.props.formatElapsed}
                <div className="popover left">
                    <div className="popover-content">{this.props.query}</div>
                    <div className="arrow"/>
                </div>
            </td>
        );
    }
}

class Database extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.lastMutationId === this.props.lastMutationId) return false
        return true
    }

    render() {
        const lastSample = this.props.lastSample;
        return (
            <tr key={this.props.dbname}>
                <td className="dbname">
                    {this.props.dbname}
                </td>
                <td className="query-count">
          <span className={this.props.lastSample.countClassName}>
            {this.props.lastSample.nbQueries}
          </span>
                </td>
                {this.props.lastSample.topFiveQueries.map(function(query, index) {
                    return <Query key={index}
                                  query={query.query}
                                  elapsed={query.elapsed}
                                  formatElapsed={query.formatElapsed}
                                  elapsedClassName={query.elapsedClassName} />
                })}
            </tr>
        );
    }
}

class DBMon extends Component {
    state = {
        databases: []
    }

    loadSamples = () => {
        this.setState({
            databases: ENV.generateData(true).toArray()
        })
        jsPerfs.monitor.syncUi()
        setTimeout(this.loadSamples, ENV.timeout)
    }

    componentDidMount() {
        this.loadSamples()
    }

    render() {
        const databases = this.state.databases.map((database) => {
            return <Database
                key={database.dbname}
                lastMutationId={database.lastMutationId}
                dbname={database.dbname}
                samples={database.samples}
                lastSample={database.lastSample} />
        })

        return (
            <div>
                <table className="table table-striped latest-data">
                    <tbody>
                    {databases}
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(<DBMon />, document.getElementById('app'))
