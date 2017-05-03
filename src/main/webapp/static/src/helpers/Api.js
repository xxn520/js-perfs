/**
 * Created by m2mbob on 2017/4/22.
 */
let url
if (process.env.NODE_ENV === 'develop') {
    url = "http://localhost:8080"
} else {
    url = "http://172.104.83.94:8080"
}
export const baseUrl = url
export const apiHost = `${baseUrl}/api/`;

export default {
    monitor: 'monitor.json',
    memory: 'memory.json',
    deleteMonitor: (id) => `monitor/${id}.json`,
    deleteMemory: (id) => `memory/${id}.json`,
    timing: 'timing.json',
}
