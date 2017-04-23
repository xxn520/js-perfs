/**
 * Created by m2mbob on 2017/4/22.
 */
/**
 * Created by m2mbob on 2017/1/21.
 */
import 'isomorphic-fetch'
import {apiHost} from './Api';

function getDefaultOptions(data, method) {
    const options = {
        method: (!method || method === 'raw') ? 'get' : method,
        headers: {}
    };

    if (method !== 'raw')
        options.headers.Accept = 'application/json';

    if (data !== undefined) {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
    }

    return options;
}

class Rest {

    constructor(base, options = () => {
    }, useTrailingSlashes) {
        this.base = base;
        this.addOptions = options;
        this.useTrailingSlashes = useTrailingSlashes;
    }

    /**
     * 把query参数拼接到uri
     * @param uri
     * @param query
     * @returns {*}
     * @private
     */
    _getUrl(uri, query) {
        uri = this.base + uri;
        let params = [];
        if (query) {
            Object.keys(query).forEach((param)=> {
                params.push(`${param}=${encodeURIComponent(query[param])}`)
            });
            params = params.join("&");
            uri = `${uri}?${params}`;
        }
        return uri;
    }

    /**
     * 添加额外的http头信息
     * @param data
     * @param method
     * @param url
     * @private
     */
    _getOptions(data, method, url) {
        let options = getDefaultOptions(data, method);
        this.addOptions(options, url);
        return options;
    }

    /**
     * 解析为text
     * @param response
     * @returns {*}
     * @private
     */
    static _parseText(response) {
        return response.text();
    }

    /**
     * 解析为json
     * @param response
     * @returns {Promise.<TResult>}
     * @private
     */
    _parseJson(response) {
        if (response.status === 204) return;
        return response.json().then(function (json) {
            if (response.status >= 200 && response.status < 300) {
                return json;
            } else {
                throw json.error;
            }
        });
    }

    _request(uri, query, data, method) {
        let url = this._getUrl(uri, query);
        let options = this._getOptions(data, method, url);
        let raw = fetch(url, options);
        if (method === 'raw')
            return raw.then(this._parseText);
        return raw.then(this._parseJson);
    }

    /**
     * get 获取 response.json()
     * @param segments
     * @param query
     * @returns {*}
     */
    get(uri, query) {
        return this._request(uri, query);
    }

    /**
     * get 获取 response.text()
     * @param segments
     * @param query
     * @returns {*}
     */
    rawGet(uri, query) {
        return this._request(uri, query, undefined, 'raw')
    }

    /**
     * 添加信息
     * @param segments
     * @param data
     * @param query
     * @returns {*}
     */
    post(uri, data, query) {
        return this._request(uri, query, data, 'post');
    }

    /**
     * 更新全部信息
     * @param segments
     * @param data
     * @param query
     * @returns {*}
     */
    put(uri, data, query) {
        return this._request(uri, query, data, 'put');
    }

    /**
     * 更新部分信息
     * @param segments
     * @param data
     * @param query
     * @returns {*}
     */
    patch(uri, data, query) {
        return this._request(uri, query, data, 'PATCH');
    }

    /**
     * delete
     * @param segments
     * @param query
     * @returns {*}
     */
    delete(uri, query) {
        return this._request(uri, query, undefined, 'delete');
    }

}

export default new Rest(apiHost);
