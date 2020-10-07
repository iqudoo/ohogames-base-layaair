import UIMgr from "../manager/uimgr";
import Activity from "../display/activity";
import { onNavigatorReady } from "./init";
import env, { getClassName } from "../../utils/env";

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
        this._pageName = getClassName(this._options.page);
        env.printDebug("init", this._pageName);
        let res = this._options.page.res;
        if (res && res.length > 0) {
            Laya.loader.load(res, Laya.Handler.create(this, () => {
                this._newActivity();
                setTimeout(() => { this._onLoaded(); }, 100);
                env.printDebug("onLoaded", this._pageName);
            }), Laya.Handler.create(this, (progress) => {
                env.printDebug("onLoadProgress", this._pageName, progress);
                this._onLoadProgress(progress);
            }, null, false));
        } else {
            this._newActivity();
            this._onLoaded();
            env.printDebug("onLoaded", this._pageName);
            env.printDebug("onLoadProgress", this._pageName, 1);
        }
    }

    _newActivity() {
        if (this._activity) {
            return;
        }
        env.printDebug("newActivity", this._pageName);
        this._activity = new this._options.page({
            page: this._options.page,
            params: this._options.params
        });
    }

    _onLoaded() {
        onNavigatorReady().then(() => {
            this._options.onLoaded && this._options.onLoaded(this);
            this.addChild(this._activity);
            env.printDebug("onCreate", this._pageName);
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
            env.printDebug("onResume", this._pageName);
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            Laya.Tween.to(this, toProps, duration, easeIn, Laya.Handler.create(this, () => {
                callback && callback();
            }));
        } else {
            env.printDebug("onResume", this._pageName);
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
        env.printDebug("onPause", this._pageName);
        this._activity.onPause && this._activity.onPause();
        this.visible = false;
        this.focus(false);
    }

    exit() {
        env.printDebug("onDestroy", this._pageName);
        this._activity.onDestroy && this._activity.onDestroy();
        this.destroy();
    }

    focus(focus) {
        if (this._isFocus === focus) {
            return;
        }
        this._isFocus = focus;
        env.printDebug("onFocus", this._pageName, focus);
        this._activity.onFocus && this._activity.onFocus(focus);
    }

}