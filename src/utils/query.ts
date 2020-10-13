export function stringifyQuery(query) {
    return Object.keys(query).map(key => {
        const value = query[key];
        return `${key}=${encodeURIComponent(value)}`;
    }).join('&');
}

export function decodeQuery(query) {
    return Object.keys(query).reduce((result, key) => {
        const value = query[key];
        result[key] = decodeURIComponent(value);
        return result;
    }, {});
}

export function parseQueryParams(path) {
    let url = '';
    let params = {};
    if (!path || typeof path !== 'string') {
        return { url, params }
    }
    let queryString = '';
    let indexE = path.indexOf('?');
    let indexW = path.indexOf('#');
    let indexQ = path.indexOf('=');
    if (indexE >= 0) {
        url = path.substring(0, indexE);
        queryString = path.substring(indexE + 1, indexW > 0 ? indexW : path.length);
    } else if (indexQ >= 0) {
        url = '';
        queryString = path;
    } else {
        url = path;
        queryString = '';
    }
    queryString.split('&').map(item => {
        let index = item.indexOf("=");
        if (index > 0) {
            let key = item.substring(0, index);
            let value = item.substring(index + 1);
            params[key] = decodeURIComponent(value);
        }
    });
    return { url, params };
}

export function appendQueryParams(path, query = {}) {
    const { url, params } = parseQueryParams(path);
    Object.keys(query).forEach(key => {
        let value = query[key];
        if (value !== undefined && value !== null) {
            params[key] = value;
        } else {
            delete params[key];
        }
    });
    const queryString = Object.keys(params).map(key => {
        const value = params[key];
        return `${key}=${encodeURIComponent(value)}`;
    }).join('&');;
    if (!url) {
        return queryString;
    }
    if (!queryString) {
        return url;
    }
    return `${url}?${queryString}`;
}

export function getQueryString(key, def) {
    if (typeof window !== "undefined" && window.location) {
        let search = window.location.search || '';
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(unescape(r[2]));
        }
    }
    return def;
}