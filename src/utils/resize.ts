import { onAttachEvent } from "./event";

let _initialized = false;
let _callbacks = [];

function _handleChanged() {
    _callbacks.forEach(callback => {
        callback && callback();
    });
}

function _initialize() {
    if (_initialized) {
        return;
    }
    _initialized = true;
    if (typeof window !== "undefined") {
        onAttachEvent(window, 'touchmove', _handleChanged);
        onAttachEvent(window, 'scroll', _handleChanged);
        onAttachEvent(window, 'resize', _handleChanged);
    }
    if (typeof document !== "undefined") {
        onAttachEvent(document, 'DOMContentLoaded', _handleChanged);
    }
}

export function offResize(callback) {
    if (callback && typeof callback == 'function') {
        let index = _callbacks.indexOf(callback);
        if (index >= 0) {
            _callbacks.splice(index, 1);
        }
    }
}

export function onResize(callback) {
    _initialize();
    if (callback && typeof callback == 'function' && _callbacks.indexOf(callback) < 0) {
        _callbacks.push(callback);
        callback && callback();
    }
}