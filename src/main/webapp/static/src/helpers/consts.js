/**
 * Created by m2mbob on 2017/4/22.
 */
export const KEY_ROUTE_MAP = {
    '0': '/js-perfs/innerHTML',
    '1': '/js-perfs/backbone',
    '2': '/js-perfs/angular',
    '3': '/js-perfs/angular-trackby',
    '4': '/js-perfs/vue1',
    '5': '/js-perfs/vue2',
    '6': '/js-perfs/react',
    '7': '/js-perfs/react-fiber',
    '8': '/',
    '9': '/fpaint/timing',
    '10': '/repaint/monitor',
    '11': '/repaint/memory',
    '12': '/crossplatform',
}

export const TYPES = [
    'innerHTML',
    'backbone',
    'angular',
    'angular-trackby',
    'vue1',
    'vue2',
    'react',
    'react-fiber',
]

export const TYPES_COLORS = {
    'innerHTML': '#f04134',
    'backbone': '#00a854',
    'angular': '#108ee9',
    'angular-trackby': '#f5317f',
    'vue1': '#f56a00',
    'vue2': '#7265e6',
    'react': '#ffbf00',
    'react-fiber': '#00a2ae',
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
