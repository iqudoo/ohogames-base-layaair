import toast from "./toastmanager";
import screen from "../manager/screen";
import Component from "./component";

export default class ToastView extends Component {

    static show(params, onHide) {
        toast.showToast(this, params, onHide);
    }

    static hide() {
        toast.hideToast(this);
    }

    public toast;
    public params;
    public duration = 200;
    public displayDuration = 1000;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public exitProps = null;
    public topLevel = true;

    public onShow?(): void;
    public onHide?(): void;

    constructor() {
        super(() => { this.hide() });
        this.width = screen.getDesignWidth();
        this.height = screen.getDesignHeight();
    }

    public hide() {
        toast.hideToast(this.toast, this);
    }

}