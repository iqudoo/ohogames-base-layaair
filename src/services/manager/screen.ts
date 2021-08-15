import { initBg } from "./bg";
import { initUI } from "./uimgr";

let _padding_left = 0;
let _padding_right = 0;
let _padding_top = 0;
let _padding_bottom = 0;

let _design_width = 0;
let _design_height = 0;
let _deviation = 0;
let _adaption = true;

function size() {
    let paddingWidth = _padding_left + _padding_right;
    let paddingHeight = _padding_top + _padding_bottom;
    let clientWidth = window.innerWidth || laya.utils.Browser.clientWidth;
    let clientHeight = window.innerHeight || laya.utils.Browser.clientHeight;
    let initWidth = _design_width;
    let initHeight = _design_height;
    let screenRatio = 1;
    let initRatio = 1;
    if (initWidth < initHeight && clientWidth < clientHeight) { // 页面和游戏都是竖屏
        screenRatio = clientHeight / clientWidth
        initRatio = initHeight / initWidth
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = initWidth * screenRatio;
            } else if (screenRatio < initRatio) {
                initWidth = initHeight / screenRatio;
            }
        }
    } else if (initWidth < initHeight && clientWidth >= clientHeight) { // 页面横屏，游戏竖屏
        screenRatio = clientHeight / clientWidth
        initRatio = initWidth / initHeight;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initWidth = initHeight * screenRatio;
            } else if (screenRatio < initRatio) {
                initHeight = initWidth / screenRatio;
            }
        }
    } else if (initWidth >= initHeight && clientWidth >= clientHeight) { // 页面和游戏都是横屏
        screenRatio = clientHeight / clientWidth
        initRatio = initHeight / initWidth
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = initWidth * screenRatio;
            } else if (screenRatio < initRatio) {
                initWidth = initHeight / screenRatio;
            }
        }
    } else if (initWidth >= initHeight && clientWidth < clientHeight) { // 页面竖屏，游戏横屏
        screenRatio = clientHeight / clientWidth
        initRatio = initWidth / initHeight;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initWidth = initHeight * screenRatio;
            } else if (screenRatio < initRatio) {
                initHeight = initWidth / screenRatio;
            }
        }
    }
    return {
        initHeight: initHeight + paddingWidth,
        initWidth: initWidth + paddingHeight
    }
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

function getContentWidth() {
    return getWidth() - _padding_left - _padding_right;
}

function getContentHeight() {
    return getHeight() - _padding_top - _padding_bottom;
}

function setPaddingLeft(padding) {
    _padding_left = padding;
}

function getPaddingLeft() {
    return _padding_left;
}

function setPaddingRight(padding) {
    _padding_right = padding;
}

function getPaddingRight() {
    return _padding_right;
}

function setPaddingTop(padding) {
    _padding_top = padding;
}

function getPaddingTop() {
    return _padding_top;
}

function setPaddingBottom(padding) {
    _padding_bottom = padding;
}

function getPaddingBottom() {
    return _padding_bottom;
}

function getDesignWidth() {
    return _design_width;
}

function getDesignHeight() {
    return _design_height;
}

function getScale() {
    let width = getContentWidth();
    let height = getContentHeight();
    let designWidth = getDesignWidth();
    let designHeight = getDesignHeight();
    return Math.min(width / designWidth, height / designHeight);
}

function getOffestX() {
    if (!_adaption) {
        return _padding_left;
    }
    let scale = getScale();
    let width = getContentWidth();
    return (width - _design_width * scale) / 2 + _padding_left;
}

function getOffestY() {
    if (!_adaption) {
        return _padding_top;
    }
    let scale = getScale();
    let height = getContentHeight();
    return (height - _design_height * scale) / 2 + _padding_top;
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
    getContentWidth,
    getContentHeight,
    getDesignWidth,
    getDesignHeight,
    setDeviation,
    setPaddingLeft,
    getPaddingLeft,
    setPaddingRight,
    getPaddingRight,
    setPaddingTop,
    getPaddingTop,
    setPaddingBottom,
    getPaddingBottom,
    setAdaption,
}