import popup from "./popupmanager";
import screen from "../manager/screen";
import pipeline from "../pipeline";
import Component from "./component";

export default class PopupView extends Component {

    static show(params, onHide, alias) {
        popup.showPopup(this, params, onHide, alias);
    }

    static signleShow(params, onHide, alias) {
        popup.hidePopup(this, null, null, alias);
        popup.showPopup(this, params, onHide, alias);
    }

    static pipeShow(params, onHide, alias) {
        pipeline.put("popup", () => {
            popup.showPopup(this, params, (...args) => {
                onHide && onHide(...args);
                pipeline.next("popup");
            }, alias);
        })
    }

    static hide(result, alias) {
        popup.hidePopup(this, null, result, alias);
    }

    public alias;
    public popup;
    public params;
    public duration = 300;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public exitProps = null;

    public uiDuration = 300;
    public uiEaseIn = null;
    public uiEaseOut = null;
    public uiFromProps = null;
    public uiToProps = null;
    public uiExitProps = null;
    
    public topLevel = false;
    public onShow?(): void;
    public onHide?(): void;

    public hide(result = null) {
        popup.hidePopup(this.popup, this, result, this.alias);
    }

    constructor() {
        super(() => {
            this.hide();
        });
        this.isTranslucent = false;
        this.canceledOnTouchOutside = false;
        this.nonPenetrating = true;
        this.width = screen.getDesignWidth();
        this.height = screen.getDesignHeight();
    }

}