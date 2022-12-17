
import Screen from "./screen";

let _inited = false;
let _bgSprite: Laya.Sprite = null;
let _bgImage: Laya.Image = null;
let _bgColor = null;
let _bgSkin = null;
let _bgSizeGrid = null;
let _bgTexture = null;
let _bgType = 0;

function _drawBg() {
    if (_bgType == 1) {
        if (_bgSprite && _bgColor) {
            _bgSprite.graphics.clear();
            _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, _bgColor);
        }
    } else if (_bgType == 2) {
        if (_bgImage && _bgSkin) {
            _bgImage.skin = _bgSkin;
            _bgImage.sizeGrid = _bgSizeGrid || "";
        }
    } else if (_bgType == 3) {
        if (_bgSprite && _bgTexture) {
            Laya.loader.load(_bgTexture, Laya.Handler.create(this, (texture) => {
                try {
                    _bgSprite.graphics.clear();
                    _bgSprite.graphics.fillTexture(texture, 0, 0, _bgSprite.width, _bgSprite.height, 'repeat');
                } catch (error) {
                }
            }));
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
    _drawBg();
}

function setBgColor(color) {
    if (!_bgSprite) {
        return;
    }
    _bgType = 1;
    _bgColor = color;
    _drawBg();
}

function setBgSkin(url, sizeGrid = null) {
    _bgType = 2;
    _bgSkin = url;
    _bgSizeGrid = sizeGrid;
    _drawBg();
}

function setBgTexture(url) {
    _bgType = 3;
    _bgTexture = url;
    _drawBg();
}

function getBgSprite() {
    return _bgSprite;
}

export function initBg() {
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

export default {
    setBgSkin,
    setBgColor,
    setBgTexture,
    getBgSprite,
}