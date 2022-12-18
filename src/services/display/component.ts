import Screen from "../manager/screen";
import Background from "./background";
import BaseView from "./baseview";

export default class Component extends BaseView {

    private _nonPenetrating = false;
    private _handleOnTouchOutside = null;
    private _background: Background = null;
    private _showed = false;

    public onNew?(): void;

    constructor(handleOnTouchOutside = null) {
        super();
        this._handleOnTouchOutside = handleOnTouchOutside;
        this._background = new Background((bg: Background) => {
            bg.x = -Screen.getOffestX();
            bg.y = -Screen.getOffestY();
        });
        this._background.setBgAlpha(0.5);
        this._background.setBgColor("#000000");
        this._background.setTranslucent(true);
        this.addChild(this._background);
        this._refreshOnTouchOutside();
        this.onNew && this.onNew();
    }

    public get bg() {
        return this._background;
    }

    public set nonPenetrating(nonPenetrating) {
        this._nonPenetrating = nonPenetrating;
        this._refreshOnTouchOutside();
    }

    public get nonPenetrating() {
        return this._nonPenetrating;
    }

    public get showed() {
        return this._showed;
    }

    private _onHandleOnTouchOutsideEvent(e: Laya.Event) {
        if (this.showed) {
            this._handleOnTouchOutside && this._handleOnTouchOutside();
        }
        e.stopPropagation();
    }

    private _refreshOnTouchOutside() {
        this._background && this._background.offAll();
        if ((this._handleOnTouchOutside || this.nonPenetrating) && this.ui) {
            this.ui.mouseThrough = true;
            this._background && this._background.on(Laya.Event.CLICK, this, this._onHandleOnTouchOutsideEvent);
        }
    }

    public __callSetShowed(showed) {
        this._showed = showed;
    }

    public __callOnResize() {
        this._background && this._background.resize();
    }

}