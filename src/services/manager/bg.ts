
import Screen from "./screen";

let _bgSprite: Laya.Sprite = null;
let _bgImage: Laya.Image = null;
let _bgSkin = null;
let _bgSizeGrid = null;
let _inited = false;

function _checkInit() {
    if (!_inited) {
        _inited = true;
        _bgSprite = new Laya.Sprite;
        _bgSprite.name = '_tape_bg_layer';
        _bgImage = new Laya.Image;
        _bgImage.name = '_bg_image';
        Laya.stage.addChild(_bgSprite);
        Laya.stage.addChild(_bgImage);
        Laya.stage.on(Laya.Event.RESIZE, null, () => {
            _resizeBg();
        });
    }
    _resizeBg();
}


function _drawSkin() {
    if (_bgImage) {
        if (_bgSkin) {
            _bgImage.skin = _bgSkin;
        }
        if (_bgSizeGrid) {
            _bgImage.sizeGrid = _bgSizeGrid;
        } else {
            _bgImage.sizeGrid = '';
        }
    }
}

function _resizeBg() {
    if (_bgSprite) {
        _bgSprite.width = Screen.getWidth();
        _bgSprite.height = Screen.getHeight();
    }
    if (_bgImage) {
        _bgImage.width = Screen.getWidth();
        _bgImage.height = Screen.getHeight();
    }
}

export function initBg() {
    _checkInit();
    _drawSkin();
}

function setBgColor(color) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, color);
}

function setBgSkin(url, sizeGrid = null) {
    _bgSkin = url;
    _bgSizeGrid = sizeGrid;
    _drawSkin();
}

function setBgTexture(url) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    Laya.loader.load(url, Laya.Handler.create(this, (texture) => {
        try {
            _bgSprite.graphics.fillTexture(texture, 0, 0, _bgSprite.width, _bgSprite.height, 'repeat');
        } catch (error) {
        }
    }));
}

function getBgSprite() {
    return _bgSprite;
}

export default {
    setBgSkin,
    setBgColor,
    setBgTexture,
    getBgSprite,
}