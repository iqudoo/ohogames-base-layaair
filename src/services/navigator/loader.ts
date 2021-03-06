import UIMgr from "../manager/uimgr";
import Activity from "../display/activity";
import env, { getClassName } from "../env";
import { onNavigatorReady } from "./init";

let _indexID = 1;

function genID(obj) {
    let name = getClassName(obj) || "Activity"
    return `${name}$${_indexID++}`;
}

export default class extends Laya.Component {

    private _options = null;
    private _activity: Activity = null;
    private _isShow = false;
    private _isFocus = false;
    private _pageName = "";

    constructor(options) {
        super();
        this.visible = false;
        this._options = options;
        this._pageName = genID(this._options.page);
        env.printDebug("init", this._getPageName());
        let res = this._options.page.res;
        if (res && res.length > 0) {
            Laya.loader.load(res, Laya.Handler.create(this, () => {
                this._newActivity();
                setTimeout(() => { this._onLoaded(); }, 100);
                env.printDebug("onLoaded", this._getPageName());
            }), Laya.Handler.create(this, (progress) => {
                env.printDebug("onLoadProgress", this._getPageName(), progress);
                this._onLoadProgress(progress);
            }, null, false));
        } else {
            this._newActivity();
            this._onLoaded();
            env.printDebug("onLoaded", this._getPageName());
            env.printDebug("onLoadProgress", this._getPageName(), 1);
        }
    }

    _getPageName() {
        return this._pageName;
    }

    _newActivity() {
        if (this._activity) {
            return;
        }
        this._activity = new this._options.page({
            page: this._options.page,
            params: this._options.params
        });
        this._activity["_ID"] = this._pageName;
        env.printDebug("newActivity", this._getPageName());
    }

    _onLoaded() {
        onNavigatorReady().then(() => {
            this._options.onLoaded && this._options.onLoaded(this);
            this.addChild(this._activity);
            env.printDebug("onCreate", this._getPageName());
            this._activity.onCreate && this._activity.onCreate();
            this._options.onShow && this._options.onShow();
        });
    }

    _onLoadProgress(progress) {
        this._options.onLoadProgress && this._options.onLoadProgress(this, progress);
    }

    nextProgress(progress) {
        this._activity.onNextProgress && this._activity.onNextProgress(progress);
    }

    filter(page, activity) {
        if (page === this._options.page) {
            return !activity || activity === this._activity;
        }
        return false;
    }

    show(anim, callback) {
        if (this.visible) {
            return;
        }
        if (this._isShow) {
            return;
        }
        this._isShow = true;
        var easeIn = this._activity.easeIn || Laya.Ease.linearIn;
        var duration = this._activity.duration || 0;
        var fromProps = this._activity.fromProps || {};
        var toProps = this._activity.toProps || {};
        if (anim && easeIn && duration > 0) {
            Object.assign(this, fromProps);
            env.printDebug("onResume", this._getPageName());
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            Laya.Tween.to(this, toProps, duration, easeIn, Laya.Handler.create(this, () => {
                callback && callback();
            }));
        } else {
            env.printDebug("onResume", this._getPageName());
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            callback && callback();
        }
        UIMgr.checkFocus();
    }

    hide() {
        if (!this.visible) {
            return;
        }
        if (!this._isShow) {
            return;
        }
        this._isShow = false;
        env.printDebug("onPause", this._getPageName());
        this._activity.onPause && this._activity.onPause();
        this.visible = false;
        this.focus(false);
    }

    exit() {
        env.printDebug("onDestroy", this._getPageName());
        this._activity.onDestroy && this._activity.onDestroy();
        this.destroy();
    }

    focus(focus) {
        if (this._isFocus === focus) {
            return;
        }
        this._isFocus = focus;
        env.printDebug("onFocus", this._getPageName(), focus);
        this._activity.onFocus && this._activity.onFocus(focus);
    }

}