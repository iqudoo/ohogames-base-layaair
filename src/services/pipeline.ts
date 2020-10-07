import env from "../utils/env";

let _pipeline_map = {};

function _check(type) {
    if (_pipeline_map[type]) {
        let pipe = _pipeline_map[type];
        if (pipe.funcs.length <= 0) {
            return;
        }
        if (pipe.padding) {
            setTimeout(() => {
                _check(type);
            }, 500);
            return;
        }
        let func = pipe.funcs.shift();
        func && func();
        pipe.padding = true;
        _check(type);
    }
}

function put(type, func) {
    if (type && typeof func === "function") {
        env.printDebug("put pipe to : ", type);
        if (_pipeline_map[type]) {
            _pipeline_map[type].funcs.push(func);
        } else {
            _pipeline_map[type] = { padding: false, funcs: [func] }
        }
        _check(type);
    }
}

function next(type) {
    if (_pipeline_map[type]) {
        env.printDebug("next pipe as : ", type);
        _pipeline_map[type].padding = false;
        _check(type);
    }
}

export default {
    put,
    next,
}