/**
 * Created by m2mbob on 2017/4/22.
 */
export const baseUrl = "http://localhost:8080";
export const apiHost = `${baseUrl}/api/`;

export default {
    monitor: 'monitor.json',
    memory: 'memory.json',
    deleteMonitor: (id) => `monitor/${id}.json`,
    deleteMemory: (id) => `memory/${id}.json`,
    timing: 'timing.json',
}
