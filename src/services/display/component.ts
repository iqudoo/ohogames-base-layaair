import Screen from "../manager/screen";
import Background from "./background";
import BaseView from "./baseview";

export default class Component extends BaseView {

    private _bgAlpha = 0.5;
    private _bgColor = '#000000';
    private _isTranslucent = true;
    private _handleOnTouchOutside = null;
    private _canceledOnTouchOutside = false;
    private _nonPenetrating = false;
    private _onEvent = null;
    private _background: Background = null;
    private _isShow = false;

    constructor(handleOnTouchOutside = null) {
        super();
        this._onEvent = (e) => {
            if (this.isShow && this.canceledOnTouchOutside) {
                this._handleOnTouchOutside && this._handleOnTouchOutside();
            }
            e.stopPropagation();
        }
        this._handleOnTouchOutside = handleOnTouchOutside;
        this._background = new Background((bg: Background) => {
            bg.x = -Screen.getOffestX();
            bg.y = -Screen.getOffestY();
        });
        this.addChild(this._background);
        this._refreshBg();
    }

    public get bg() {
        return this._background;
    }

    public set isShow(isShow) {
        this._isShow = isShow;
    }

    public get isShow() {
        return this._isShow;
    }

    public get bgAlpha() {
        return this._bgAlpha;
    }

    public set bgAlpha(bgAlpha) {
        this._bgAlpha = bgAlpha;
        this._refreshBg();
    }

    public get bgColor() {
        return this._bgColor;
    }

    public set bgColor(bgColor) {
        this._bgColor = bgColor;
        this._refreshBg();
    }

    public get isTranslucent() {
        return this._isTranslucent;
    }

    public set isTranslucent(isTranslucent) {
        this._isTranslucent = isTranslucent;
        this._refreshBg();
    }

    public set canceledOnTouchOutside(canceledOnTouchOutside) {
        this._canceledOnTouchOutside = canceledOnTouchOutside;
        this._refreshCanceledOnTouchOutside();
    }

    public get canceledOnTouchOutside() {
        return this._canceledOnTouchOutside;
    }

    public set nonPenetrating(nonPenetrating) {
        this._nonPenetrating = nonPenetrating;
        this._refreshCanceledOnTouchOutside();
    }

    public get nonPenetrating() {
        return this._nonPenetrating;
    }

    private _refreshCanceledOnTouchOutside() {
        this._background && this._background.offAll();
        if ((this.canceledOnTouchOutside || this.nonPenetrating) && this.ui) {
            this.ui.mouseThrough = true;
            this._background && this._background.on(Laya.Event.CLICK, this, this._onEvent);
        }
    }

    private _refreshBg() {
        this._background.setBgAlpha(this.bgAlpha);
        this._background.setBgColor(this.bgColor);
        this._background.visible = !this.isTranslucent;
        this._refreshCanceledOnTouchOutside();
    }

    protected _callOnResize() {
        this._background
            && this._background.resize();
    }

}