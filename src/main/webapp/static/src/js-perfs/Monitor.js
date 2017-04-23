/**
 * Created by m2mbob on 2017/4/19.
 */
export default class Monitor {
    constructor(config = { bucketSize: 20 }) {
        this.bucketSize = config.bucketSize
        this.bucket = []
        this.lastTime = Date.now()
        this.recordStatus = false

        this.render()
    }

    syncUi() {
        const start = this.lastTime
        const stop = Date.now()
        const rate = 1000 / (stop - start)
        this.bucket.push(rate)
        if (this.recordStatus) {
            window.monitorRecordsCache.push({start, stop, rate})
        }
        if (this.bucket.length > this.bucketSize) {
            this.bucket.shift()
        }
        let sum = 0
        for (let i = 0; i < this.bucket.length; i++) {
            sum = sum + this.bucket[i]
        }
        this.$monitorText.textContent = "Repaint rate: " + (sum / this.bucket.length).toFixed(2) + "/sec"
        this.lastTime = stop
    }

    setRecordStatus(status) {
        this.recordStatus = status
    }

    render(){
        const container = document.createElement('div')
        container.id  = 'monitor'
        container.style.cssText = 'width:150px;opacity:0.9;cursor:pointer;position:fixed;right:80px;bottom:0px;'

        const monitorDiv = document.createElement('div')
        monitorDiv.id  = 'monitor-div'
        monitorDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;'
        container.appendChild(monitorDiv)

        const monitorText  = document.createElement('div')
        monitorText.id = 'monitor-text'
        monitorText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px'
        monitorText.innerHTML= 'Repaint rate: 0/sec'
        monitorDiv.appendChild(monitorText)

        this.$mountEle = container
        this.$monitorDiv = monitorDiv
        this.$monitorText = monitorText
    }
}
