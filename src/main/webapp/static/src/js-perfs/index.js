/**
 * Created by m2mbob on 2017/4/19.
 */
import './ENV'
import MemoryStats from './MemoryStats'
import Monitor from './Monitor'
import 'isomorphic-fetch'

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};

const memoryStats = new MemoryStats()
memoryStats.$mountEle.style.position = 'fixed'
memoryStats.$mountEle.style.right = '0px'
memoryStats.$mountEle.style.bottom = '0px'
document.body.appendChild(memoryStats.$mountEle)
requestAnimationFrame(function rAFloop(){
    memoryStats.syncUi()
    requestAnimationFrame(rAFloop)
})

const monitor = new Monitor()
document.body.appendChild(monitor.$mountEle)

const smrecordBtn = document.createElement('button')
smrecordBtn.classList.add('btn', 'btn-primary')
smrecordBtn.textContent = 'start record monitor'
document.body.firstChild.appendChild(smrecordBtn)

const emrecordBtn = document.createElement('button')
emrecordBtn.classList.add('btn', 'btn-primary')
emrecordBtn.textContent = 'stop record monitor'
emrecordBtn.setAttribute('disabled', 'disabled')
document.body.firstChild.appendChild(emrecordBtn)

const ssrecordBtn = document.createElement('button')
ssrecordBtn.classList.add('btn', 'btn-primary')
ssrecordBtn.textContent = 'start record memory'
document.body.firstChild.appendChild(ssrecordBtn)

const esrecordBtn = document.createElement('button')
esrecordBtn.classList.add('btn', 'btn-primary')
esrecordBtn.textContent = 'stop record memory'
esrecordBtn.setAttribute('disabled', 'disabled')
document.body.firstChild.appendChild(esrecordBtn)

let monitorRecordStatus = false
let memoryRecordStatus = false
let monitorStartTime, monitorStopTime, memoryStartTime, memoryStopTime
window.monitorRecordsCache = []
window.memoryRecordsCache = []

smrecordBtn.addEventListener('click', () => {
    monitorRecordStatus = true
    emrecordBtn.removeAttribute('disabled')
    smrecordBtn.setAttribute('disabled', 'disabled')
    monitor.setRecordStatus(monitorRecordStatus)
    monitorStartTime = Date.now()
})

emrecordBtn.addEventListener('click', () => {
    monitorRecordStatus = false
    monitor.setRecordStatus(monitorRecordStatus)
    monitorStopTime = Date.now()
    fetch('/api/monitor.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mutations: ENV.mutations(),
            type: window.pageName,
            json: JSON.stringify(window.monitorRecordsCache),
            start_time: monitorStartTime,
            stop_time: monitorStopTime,
        })
    }).then(() => {
        swal({
            title: "Success!",
            text: "post data success",
            type: "success",
            confirmButtonText: "confirm"
        })
    }).catch(() => {
        swal({
            title: "Error!",
            text: "post data error",
            type: "error",
            confirmButtonText: "confirm"
        })
    }).finally(() => {
        window.monitorRecordsCache = []
        emrecordBtn.setAttribute('disabled', 'disabled')
        smrecordBtn.removeAttribute('disabled')
        monitorStartTime = null
        monitorStopTime = null
    })
})

ssrecordBtn.addEventListener('click', () => {
    memoryRecordStatus = true
    esrecordBtn.removeAttribute('disabled')
    ssrecordBtn.setAttribute('disabled', 'disabled')
    memoryStats.setRecordStatus(memoryRecordStatus)
    memoryStartTime = Date.now()
})

esrecordBtn.addEventListener('click', () => {
    memoryRecordStatus = false
    memoryStats.setRecordStatus(memoryRecordStatus)
    memoryStopTime = Date.now()
    fetch('/api/memory.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mutations: ENV.mutations(),
            type: window.pageName,
            json: JSON.stringify(window.memoryRecordsCache),
            start_time: memoryStartTime,
            stop_time: memoryStopTime,
        })
    }).then(() => {
        swal({
            title: "Success!",
            text: "post data success",
            type: "success",
            confirmButtonText: "confirm"
        })
    }).catch(() => {
        swal({
            title: "Error!",
            text: "post data error",
            type: "error",
            confirmButtonText: "confirm"
        })
    }).finally(() => {
        window.memoryRecordsCache = []
        memoryStartTime = null
        memoryStopTime = null
        esrecordBtn.setAttribute('disabled', 'disabled')
        ssrecordBtn.removeAttribute('disabled')
    })
})

const TITLE_MAP = {
    'angular': '基于脏检查（angular1 为例）',
    'angular-trackby': '基于脏检查和 track-by（angular1 为例）',
    'innerHTML': '原生 innerHTML',
    'vue1': '基于依赖收集（vue1 为例）',
    'vue2': '基于依赖收集和 Virtual DOM（vue2 为例）',
    'react': '基于 Virtual DOM（react 为例）',
    'react-fiber': '基于 Virtual DOM 和 Fiber 架构（react Fiber 为例）',
}

const header = document.createElement('div')
header.classList.add('header')

const logo = document.createElement('a')
logo.setAttribute('href', '/')
logo.classList.add('logo')
header.appendChild(logo)

const title = document.createElement('span')
title.textContent = TITLE_MAP[location.pathname.slice(10)]
title.classList.add('title')
header.appendChild(title)

document.body.insertBefore(header, document.body.firstChild)

export default {
    memoryStats,
    monitor,
}
