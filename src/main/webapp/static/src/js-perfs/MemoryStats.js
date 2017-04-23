export default class MemoryStats {
    static GRAPH_HEIGHT = 30
    constructor() {
        this.msMin = 100
        this.msMax = 0
        this.redrawMBThreshold = MemoryStats.GRAPH_HEIGHT
        this.recordStatus = false

        // polyfill usedJSHeapSize
        if (window.performance && !performance.memory){
            performance.memory = { usedJSHeapSize : 0, totalJSHeapSize : 0 }
        }

        // support of the API?
        if(performance.memory.totalJSHeapSize === 0){
            console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .')
        }

        this.lastTime	= Date.now()
        this.lastUsedHeap = performance.memory.usedJSHeapSize

        this.render()
    }

    static bytesToSize(bytes, nFractDigit = 0){
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        let precision
        let i
        if (bytes === 0) return 'n/a'
        precision = Math.pow(10, nFractDigit);
        i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes * precision / Math.pow(1024, i)) / precision + ' ' + sizes[i];
    }

    static updateGraph(dom, height, color) {
        const child = dom.appendChild(dom.firstChild)
        child.style.height = height + 'px'
        if( color ) child.style.backgroundColor = color
    }

    redrawGraph(dom, oHFactor, hFactor) {
        [].forEach.call(dom.children, (c) => {
            const cHeight = c.style.height.substring(0, c.style.height.length - 2)
            // Convert to MB, change factor
            const newVal = MemoryStats.GRAPH_HEIGHT - ((MemoryStats.GRAPH_HEIGHT - cHeight)/oHFactor) * hFactor;
            c.style.height = newVal + 'px'
        })
    }

    syncUi() {
        // update at 30fps
        if(Date.now() - this.lastTime < 1000/30) return
        this.lastTime = Date.now()

        const delta = performance.memory.usedJSHeapSize - this.lastUsedHeap
        this.lastUsedHeap = performance.memory.usedJSHeapSize
        if (this.recordStatus) {
            window.memoryRecordsCache.push({time: this.lastTime, memory: this.lastUsedHeap})
        }

        // if memory has gone down, consider it a GC and draw a red bar.
        const color = delta < 0 ? '#830' : '#131'

        const ms = this.lastUsedHeap
        this.msMin = Math.min(this.msMin, ms)
        this.msMax = Math.max(this.msMax, ms)
        this.$text.textContent = "Mem: " + MemoryStats.bytesToSize(ms, 2)

        const mbValue	= ms / (1024*1024);

        if(mbValue > this.redrawMBThreshold) {
            const factor = (mbValue - (mbValue % MemoryStats.GRAPH_HEIGHT)) / MemoryStats.GRAPH_HEIGHT
            const newThreshold = MemoryStats.GRAPH_HEIGHT * (factor + 1)
            this.redrawGraph(this.$graph, MemoryStats.GRAPH_HEIGHT / this.redrawMBThreshold, MemoryStats.GRAPH_HEIGHT/newThreshold)
            this.redrawMBThreshold = newThreshold
        }

        MemoryStats.updateGraph(this.$graph, MemoryStats.GRAPH_HEIGHT - mbValue * (MemoryStats.GRAPH_HEIGHT / this.redrawMBThreshold), color);
    }

    setRecordStatus(status) {
        this.recordStatus = status
    }

    render() {
        const container = document.createElement('div')
        container.id = 'memory-stats'
        container.style.cssText = 'width:80px;height:48px;opacity:0.9;cursor:pointer;overflow:hidden;z-index:10000;will-change:transform;'

        const memoryDiv = document.createElement('div')
        memoryDiv.id = 'memory-div'
        memoryDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;'
        container.appendChild(memoryDiv)

        const memoryText = document.createElement('div')
        memoryText.id	= 'memory-text'
        memoryText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px'
        memoryText.innerHTML= 'Memory'
        memoryDiv.appendChild(memoryText)

        const memoryGraph = document.createElement('div')
        memoryGraph.id = 'memory-graph'
        memoryGraph.style.cssText = 'position:relative;width:74px;height:' + MemoryStats.GRAPH_HEIGHT + 'px;background-color:#0f0'
        memoryDiv.appendChild(memoryGraph)

        while (memoryGraph.children.length < 74) {
            const bar = document.createElement( 'span' )
            bar.style.cssText = 'width:1px;height:' + MemoryStats.GRAPH_HEIGHT + 'px;float:left;background-color:#131'
            memoryGraph.appendChild(bar)
        }

        this.$mountEle = container
        this.$div = memoryDiv
        this.$text = memoryText
        this.$graph = memoryGraph
    }
}
