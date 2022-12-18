import { setFocus } from "../navigator/stack";
import { onResize } from "../../utils/resize";
import NavLoader from "../navigator/loader";
import Screen from "./screen";
import Component from "../display/component";

let _inited = false;
let _uiManager: Laya.Sprite;
let _mainUILayer: Laya.Sprite;
let _topUILayer: Laya.Sprite;

function _checkInit() {
    if (!_inited) {
        _inited = true;
        _uiManager = new Laya.Sprite();
        _uiManager.mouseThrough = true;
        _uiManager.name = '_tape_stage';
        _mainUILayer = new Laya.Sprite();
        _mainUILayer.name = '_tape_main_layer';
        _mainUILayer.mouseThrough = true;
        _topUILayer = new Laya.Sprite();
        _topUILayer.name = '_tape_top_layer';
        _topUILayer.mouseThrough = true;
        _uiManager.addChild(_mainUILayer);
        _uiManager.addChild(_topUILayer);
        Laya.stage.addChild(_uiManager);
        Laya.stage.on(Laya.Event.RESIZE, null, () => {
            _resizeUI();
        });
        onResize(() => {
            Screen.resize();
        });
    }
    _resizeUI();
}

function _resizeUI() {
    if (_mainUILayer) {
        _mainUILayer.width = Screen.getDesignWidth();
        _mainUILayer.height = Screen.getDesignHeight();
        _mainUILayer.x = Screen.getOffestX();
        _mainUILayer.y = Screen.getOffestY();
    }
    if (_topUILayer) {
        _topUILayer.width = Screen.getDesignWidth();
        _topUILayer.height = Screen.getDesignHeight();
        _topUILayer.x = Screen.getOffestX();
        _topUILayer.y = Screen.getOffestY();
    }
    _uiManager.scaleX = Screen.getScale();
    _uiManager.scaleY = Screen.getScale();
    for (let index = 0; index < _mainUILayer.numChildren; index++) {
        let ui = _mainUILayer.getChildAt(index);
        if (ui && ui instanceof Component) {
            ui.__callOnResize();
        }
    }
    for (let index = 0; index < _topUILayer.numChildren; index++) {
        let ui = _topUILayer.getChildAt(index);
        if (ui && ui instanceof Component) {
            ui.__callOnResize();
        }
    }
}

export function initUI() {
    _checkInit();
}

function checkFocus() {
    if (_mainUILayer.numChildren > 0) {
        let last = _mainUILayer.getChildAt(_mainUILayer.numChildren - 1);
        if (last instanceof NavLoader) {
            setFocus(true);
            return;
        }
    }
    setFocus(false);
}

function moveTopToMainLayer(view: NavLoader) {
    _checkInit();
    if (view && view.parent == _mainUILayer) {
        _mainUILayer.removeChild(view);
        _mainUILayer.addChild(view);
    }
    checkFocus();
}

function addViewToMainLayer(view) {
    _checkInit();
    view && _mainUILayer.addChild(view);
    checkFocus();
}

function addViewTopLayer(view) {
    _checkInit();
    view && _topUILayer.addChild(view);
    checkFocus();
}

export default {
    checkFocus,
    moveTopToMainLayer,
    addViewToMainLayer,
    addViewTopLayer,
}