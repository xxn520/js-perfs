/**
 * Created by m2mbob on 2017/4/22.
 */
export const KEY_ROUTE_MAP = {
    '0': '/js-perfs/innerHTML',
    '1': '/js-perfs/angular',
    '2': '/js-perfs/angular-trackby',
    '3': '/js-perfs/vue1',
    '4': '/js-perfs/vue2',
    '5': '/js-perfs/react',
    '6': '/js-perfs/react-fiber',
    '7': '/',
    '8': '/fpaint/monitor',
    '9': '/fpaint/memory',
    '10': '/repaint/monitor',
    '11': '/repaint/memory',
}

export const TYPES = [
    'innerHTML',
    'angular',
    'angular-trackby',
    'vue1',
    'vue2',
    'react',
    'react-fiber',
]

export const TYPES_COLORS = {
    'innerHTML': '#f04134',
    'angular': '#00a854',
    'angular-trackby': '#108ee9',
    'vue1': '#f5317f',
    'vue2': '#f56a00',
    'react': '#7265e6',
    'react-fiber': '#ffbf00',
}

export const TYPES_FILTER = TYPES.map((type) => {
    return { text: type, value: type }
})

export const MUTATIONS_FILTER = [
    {text: '大于等于 0，小于 0.2', value: 'mutations-ge=0&mutations-lt=0.2'},
    {text: '大于等于 0.2，小于 0.4', value: 'mutations-ge=0.2&mutations-lt=0.4'},
    {text: '大于等于 0.4，小于 0.6', value: 'mutations-ge=0.4&mutations-lt=0.6'},
    {text: '大于等于 0.6，小于 0.8', value: 'mutations-ge=0.6&mutations-lt=0.8'},
    {text: '大于等于 0.8，小于等于 1', value: 'mutations-ge=0.8&mutations-le=1'},
]
