
let _inits = [];

export function callHookInit(width: number, height: number, ...options) {
    _inits.forEach(callback => callback(width, height, ...options));
}

function onInit(callback: (width: number, height: number, ...options) => void) {
    if (callback && typeof callback == "function" && _inits.indexOf(callback) < 0) {
        _inits.push(callback);
    }
}

export default {
    onInit
}
