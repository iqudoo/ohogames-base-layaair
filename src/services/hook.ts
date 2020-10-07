
let _inits = [];
let _shows = [];
let _hides = [];

export function callHookInit(width: number, height: number, ...options) {
    _inits.forEach(callback => callback(width, height, ...options));
}

export function callHookShow(...args) {
    _shows.forEach(callback => callback(...args));
}

export function callHookHide(...args) {
    _hides.forEach(callback => callback(...args));
}

function onInit(callback: (width: number, height: number, ...options) => void) {
    if (callback && typeof callback == "function" && _inits.indexOf(callback) < 0) {
        _inits.push(callback);
    }
}

function onShow(callback: (...args) => void) {
    if (callback && typeof callback == "function" && _shows.indexOf(callback) < 0) {
        _shows.push(callback);
    }
}

function onHide(callback: (...args) => void) {
    if (callback && typeof callback == "function" && _hides.indexOf(callback) < 0) {
        _hides.push(callback);
    }
}

export default {
    onInit,
    onShow,
    onHide
}
