import UIMgr from "../manager/uimgr";
import Activity from "../display/activity";
import env, { getClassName } from "../env";
import { onNavigatorReady } from "./init";
import { loadJson } from "../../utils/json";

let _indexID = 1;

function genID(obj) {
    let name = getClassName(obj) || "Activity"
    return `${name}$${_indexID++}`;
}

function getRes(unpackFile, res) {
    if (unpackFile) {
        return loadJson(unpackFile, true).catch(() => {
            return [];
        }).then(data => {
            return [...res, ...data.map((item) => {
                return {
                    url: item,
                    tyep: Laya.Loader.IMAGE
                }
            })];
        });
    }
    return Promise.resolve(res);
}

export default class extends Laya.Component {

    private _options = null;
    private _activity: Activity = null;
    private _isFocus = false;
    private _pageName = "";

    constructor(options) {
        super();
        this.visible = false;
        this._options = options;
        this._pageName = genID(this._options.page);
        env.printDebug("init", this._getPageName());
        getRes(this._options.page.unpackFile, this._options.page.res || []).catch(() => {
            return [];
        }).then(res => {
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
        })
    }


    _getPageName() {
        return this._pageName;
    }

    _newActivity() {
        if (this._activity) {
            return;
        }
        this._activity = new this._options.page();
        this._activity.page = this._options.page;
        this._activity.params = Object.assign({}, this._options.params || {});
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
        if (this._activity.isShow) {
            return;
        }
        this._activity.isShow = true;
        var easeIn = this._activity.easeIn || Laya.Ease.linearIn;
        var duration = this._activity.duration || 0;
        var fromProps = this._activity.fromProps || {};
        var toProps = this._activity.toProps || {};
        if (anim && duration > 0) {
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

    hide(anim, callback) {
        if (!this.visible) {
            return;
        }
        if (!this._activity.isShow) {
            return;
        }
        this._activity.isShow = false;
        var easeOut = this._activity.easeOut || Laya.Ease.linearIn;
        var duration = this._activity.duration || 0;
        var fromProps = this._activity.toProps || {};
        var toProps = this._activity.exitProps || {};
        if (anim && duration > 0) {
            Object.assign(this, fromProps);
            env.printDebug("onPause", this._getPageName());
            this._activity.onPause && this._activity.onPause();
            Laya.Tween.to(this, toProps, duration, easeOut, Laya.Handler.create(this, () => {
                this.visible = true;
                callback && callback();
            }));
        } else {
            env.printDebug("onPause", this._getPageName());
            this._activity.onPause && this._activity.onPause();
            this.visible = false;
            callback && callback();
        }
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