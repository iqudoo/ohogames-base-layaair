import { onload } from "../utils/onload";

function _loadJS(jspath, options, callback) {
    try {
        var _protocol = location.protocol != 'file:' ? location.protocol : 'http:';
        var _script = document.createElement("script");
        Object.keys(options).forEach(key => {
            _script.setAttribute(key, options[key])
        });
        _script.type = "text/javascript";
        if (jspath.indexOf('//') == 0) {
            _script.src = _protocol + jspath;
        } else {
            _script.src = jspath;
        }
        document.body.appendChild(_script);
        _script.onerror = function (err) {
            callback && callback(_script, err);
        }
        _script.onload = function () {
            callback && callback(_script, null);
        }
    } catch (error) {
        callback && callback(undefined, error);
    }
}

function loadJs(jspath, options = {}) {
    return onload().then(() => {
        return new Promise((resolve) => {
            if (!jspath) {
                return resolve && resolve(undefined);
            }
            var index = 0;
            var jsList = jspath.split(',');
            var nodeList = [];
            jsList.forEach(function (js) {
                _loadJS(js, options, function (node, err) {
                    nodeList[index] = { node, err };
                    index++;
                    if (index == jsList.length) {
                        resolve && resolve(nodeList);
                    }
                })
            });
        })
    });
}

export default {
    loadJs
}