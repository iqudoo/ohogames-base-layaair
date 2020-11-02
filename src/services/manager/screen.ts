import { initBg } from "./bg";
import { initUI } from "./uimgr";

let _design_width = 0;
let _design_height = 0;
let _deviation = 0.01;
let _adaption = true;

function size() {
    let clientWidth = window.innerWidth || laya.utils.Browser.clientWidth;
    let clientHeight = window.innerHeight || laya.utils.Browser.clientHeight;
    let initWidth = _design_width;
    let initHeight = _design_height;
    let screenRatio = 1;
    let initRatio = 1;
    if (_design_width < _design_height && clientWidth < clientHeight) { // 页面和游戏都是竖屏
        screenRatio = clientHeight / clientWidth
        initRatio = _design_height / _design_width
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = _design_width * screenRatio;
            } else if (screenRatio < initRatio) {
                initWidth = _design_height / screenRatio;
            }
        }
    } else if (_design_width < _design_height && clientWidth >= clientHeight) { // 页面横屏，游戏竖屏
        screenRatio = clientHeight / clientWidth
        initRatio = _design_width / _design_height;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initWidth = _design_height * screenRatio;
            } else if (screenRatio < initRatio) {
                initHeight = _design_width / screenRatio;
            }
        }
    } else if (_design_width >= _design_height && clientWidth >= clientHeight) { // 页面和游戏都是横屏
        screenRatio = clientHeight / clientWidth
        initRatio = _design_height / _design_width
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = _design_width * screenRatio;
            } else if (screenRatio < initRatio) {
                initWidth = _design_height / screenRatio;
            }
        }
    } else if (_design_width >= _design_height && clientWidth < clientHeight) { // 页面竖屏，游戏横屏
        screenRatio = clientHeight / clientWidth
        initRatio = _design_width / _design_height;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initWidth = _design_height * screenRatio;
            } else if (screenRatio < initRatio) {
                initHeight = _design_width / screenRatio;
            }
        }
    }
    return { initHeight, initWidth }
}

export function initScreen(is3D, width, height, ...options) {
    _design_width = width;
    _design_height = height;
    if (_adaption) {
        let { initHeight, initWidth } = size();
        if (is3D) {
            Laya3D.init.apply(this, [initWidth, initHeight, ...options]);
        } else {
            Laya.init.apply(this, [initWidth, initHeight, ...options]);
        }
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        if (initWidth > initHeight) {
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        } else {
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        }
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    } else {
        if (is3D) {
            Laya3D.init.apply(this, [width, height, ...options]);
        } else {
            Laya.init.apply(this, [width, height, ...options]);
        }
    }
    initBg();
    initUI();
}

function getWidth() {
    return Laya.stage.width;
}

function getHeight() {
    return Laya.stage.height;
}

function getDesignWidth() {
    return _design_width;
}

function getDesignHeight() {
    return _design_height;
}

function getScale() {
    let width = getWidth();
    let height = getHeight();
    let designWidth = getDesignWidth();
    let designHeight = getDesignHeight();
    return Math.min(width / designWidth, height / designHeight);
}

function getOffestX() {
    if (!_adaption) {
        return 0;
    }
    let scale = getScale();
    let width = getWidth();
    return (width - _design_width * scale) / 2;
}

function getOffestY() {
    if (!_adaption) {
        return 0;
    }
    let scale = getScale();
    let height = getHeight();
    return (height - _design_height * scale) / 2;
}

function setDeviation(deviation) {
    _deviation = deviation;
}

function setAdaption(adaption) {
    _adaption = adaption;
}

export default {
    getWidth,
    getHeight,
    getScale,
    getOffestX,
    getOffestY,
    getDesignWidth,
    getDesignHeight,
    setDeviation,
    setAdaption,
}