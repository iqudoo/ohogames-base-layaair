
import Screen from "../manager/screen";

export default class Background extends Laya.Component {

    private _onResize: Function = null;
    private _bgSprite: Laya.Sprite = null;
    private _bgImage: Laya.Image = null;
    private _bgAlpha = 1;
    private _bgColor = null;
    private _bgSkin = null;
    private _bgSizeGrid = null;
    private _bgTexture = null;
    private _bgType = 0;

    constructor(resize: Function = null) {
        super();
        this._onResize = resize;
        this._bgSprite = new Laya.Sprite;
        this._bgImage = new Laya.Image;
        this.addChild(this._bgSprite);
        this.addChild(this._bgImage);
        this.resize();
    }

    private _drawBg() {
        this._bgImage.alpha = this._bgAlpha;
        this._bgSprite.alpha = this._bgAlpha;
        if (this._bgType == 1) {
            if (this._bgSprite && this._bgColor) {
                this._bgSprite.graphics.clear();
                this._bgSprite.graphics.drawRect(0, 0, this._bgSprite.width, this._bgSprite.height, this._bgColor);
            }
        } else if (this._bgType == 2) {
            if (this._bgImage && this._bgSkin) {
                this._bgImage.skin = this._bgSkin;
                this._bgImage.sizeGrid = this._bgSizeGrid || "";
            }
        } else if (this._bgType == 3) {
            if (this._bgSprite && this._bgTexture) {
                Laya.loader.load(this._bgTexture, Laya.Handler.create(this, (texture) => {
                    try {
                        this._bgSprite.graphics.clear();
                        this._bgSprite.graphics.fillTexture(texture, 0, 0, this._bgSprite.width, this._bgSprite.height, 'repeat');
                    } catch (error) {
                    }
                }));
            }
        }
    }

    public resize() {
        if (this._bgSprite) {
            this._bgSprite.width = Screen.getWidth();
            this._bgSprite.height = Screen.getHeight();
        }
        if (this._bgImage) {
            this._bgImage.width = Screen.getWidth();
            this._bgImage.height = Screen.getHeight();
        }
        this._onResize && this._onResize(this);
        this._drawBg();
    }

    public setBgAlpha(bgAlpha) {
        this._bgAlpha = bgAlpha;
        this._drawBg();
    }

    public setBgColor(color) {
        this._bgType = 1;
        this._bgColor = color;
        this._drawBg();
    }

    public setBgSkin(url, sizeGrid = null) {
        this._bgType = 2;
        this._bgSkin = url;
        this._bgSizeGrid = sizeGrid;
        this._drawBg();
    }

    public setBgTexture(url) {
        this._bgType = 3;
        this._bgTexture = url;
        this._drawBg();
    }

    public getBgSprite() {
        return this._bgSprite;
    }

}