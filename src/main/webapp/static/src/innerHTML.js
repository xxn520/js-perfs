/**
 * Created by m2mbob on 2017/4/20.
 */
import jsPerfs from './js-perfs'

let databases = []

const main = function() {
    databases = ENV.generateData(true).toArray()
    syncUi()
    jsPerfs.monitor.syncUi()
    setTimeout(main, ENV.timeout)
}

const syncUi = () => {
    const app = document.getElementById('app')
    const html = `<table class="table table-striped lastest-data">
            <tbody>
            ${databases.map((db) => 
                `<tr>
                    <td class="dbname">${db.dbname}</td>
                    <td class="query-count">
                        <span class="${db.lastSample.countClassName}">${db.lastSample.nbQueries}</span>
                    </td>
                    ${db.lastSample.topFiveQueries.map((q) => 
                        `<td class="Query ${q.elapsedClassName}">
                            ${q.formatElapsed}
                            <div class="popover left">
                                <div class="popover-content">${q.query}</div>
                                <div class="arrow"></div>
                            </div>
                        </td>`
                    )}
                </tr>`
            )}
            </tbody>
        </table>`
    app.innerHTML = html.split(",").join("")
}

main()
