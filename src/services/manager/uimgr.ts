import { setFocus } from "../navigator/stack";
import NavLoader from "../navigator/loader";
import Screen from "./screen";

let _inited = false;
let _uiManager: Laya.Sprite;
let _mainUILayer: Laya.Sprite;
let _topUILayer: Laya.Sprite;
let _scale = 1;
let _offsetX = 0;
let _offsetY = 0;

export function initUI() {
    _checkInit();
}

export function resizeUI() {
    _scale = Screen.getScale();
    _offsetX = Screen.getOffestX();
    _offsetY = Screen.getOffestY();
    if (_mainUILayer) {
        _mainUILayer.x = _offsetX;
        _mainUILayer.y = _offsetY;
    }
    if (_topUILayer) {
        _topUILayer.x = _offsetX;
        _topUILayer.y = _offsetY;
    }
    _uiManager.scaleX = _scale;
    _uiManager.scaleY = _scale;
}

function _checkInit() {
    if (!_inited) {
        _uiManager = new Laya.Sprite();
        _uiManager.name = '_tape_stage';
        _mainUILayer = new Laya.Sprite();
        _mainUILayer.name = '_tape_main_layer';
        _topUILayer = new Laya.Sprite();
        _topUILayer.name = '_tape_top_layer';
        _uiManager.addChild(_mainUILayer);
        _uiManager.addChild(_topUILayer);
        Laya.stage.addChild(_uiManager);
        _inited = true;
    }
    resizeUI();
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