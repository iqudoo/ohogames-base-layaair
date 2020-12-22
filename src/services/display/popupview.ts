import popup from "./popupmanager";
import screen from "../manager/screen";
import pipeline from "../pipeline";
import ui from "./ui";

export default class PopupView extends ui {

    static show(params, onHide, name) {
        popup.showPopup(this, params, onHide, name);
    }

    static signleShow(params, onHide, name) {
        popup.hidePopup(this, null, null, name);
        popup.showPopup(this, params, onHide, name);
    }

    static pipeShow(params, onHide, name) {
        pipeline.put("popup", () => {
            popup.showPopup(this, params, (...args) => {
                onHide && onHide(...args);
                pipeline.next("popup");
            }, name);
        })
    }

    static hide(result, name) {
        popup.hidePopup(this, null, result, name);
    }

    public popup;
    public params;
    public duration = 500;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public exitProps = null;
    public onShow?(): void;
    public onHide?(): void;
    public isTranslucent = false;
    public canceledOnTouchOutside = false;

    public hide(result = null, key = null) {
        popup.hidePopup(this.popup, this, result, key);
    }

    constructor() {
        super(() => {
            this.hide();
        });
        this.nonPenetrating = true;
        this.width = screen.getDesignWidth();
        this.height = screen.getDesignHeight();
    }

}