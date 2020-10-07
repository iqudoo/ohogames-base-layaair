import { initBg, resizeBg } from "./bg";
import { initUI, resizeUI } from "./uimgr";

let _clientWidth = 0;
let _clientHeight = 0;
let _design_width = 0;
let _design_height = 0;
let _deviation = 0.01;

function size() {
    _clientWidth = window.innerWidth || laya.utils.Browser.clientWidth;
    _clientHeight = window.innerHeight || laya.utils.Browser.clientHeight;
    let screenRatio = 1;
    if (_clientWidth > _clientHeight) {
        screenRatio = _clientWidth / _clientHeight
    } else {
        screenRatio = _clientHeight / _clientWidth
    }
    let initRatio = _design_height / _design_width;
    let initWidth = _design_width;
    let initHeight = _design_height;
    if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
        if (screenRatio > initRatio) {
            initHeight = _design_width * screenRatio;
        } else if (screenRatio < initRatio) {
            initWidth = _design_height / screenRatio;
        }
    }
    return { initHeight, initWidth }
}

export function initScreen(is3D, width, height, ...options) {
    _design_width = width;
    _design_height = height;
    let { initHeight, initWidth } = size();
    if (is3D) {
        Laya3D.init.apply(this, [initWidth, initHeight, ...options]);
    } else {
        Laya.init.apply(this, [initWidth, initHeight, ...options]);
    }
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    if (width > height) {
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    } else {
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
    }
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    Laya.stage.on(Laya.Event.RESIZE, null, () => {
        resizeUI();
        resizeBg();
    });
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
    let scale = getScale();
    let width = getWidth();
    let height = getHeight();
    if (width > height) {
        return (height - _design_height * scale) / 2;
    }
    return (width - _design_width * scale) / 2;
}

function getOffestY() {
    let scale = getScale();
    let width = getWidth();
    let height = getHeight();
    if (width > height) {
        return (width - _design_width * scale) / 2;
    }
    return (height - _design_height * scale) / 2;
}
function setDeviation(deviation) {
    _deviation = deviation;
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
}