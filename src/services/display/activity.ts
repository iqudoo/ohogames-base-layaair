import NavStack from "../navigator/stack";
import ui from "./ui";
import screen from "../manager/screen";

export default class Activity extends ui {

    static create(opts) {
        class NewAct extends Activity {

            opts = null;

            constructor(options) {
                super(options);
                this.opts = opts || {};
                Object.assign(this, this.opts);
                NewAct.single = this.opts.single;
                NewAct.res = this.opts.res;
            }

            onCreate() {
                this.opts.onCreate && this.opts.onCreate();
            }

            onPause() {
                this.opts.onPause && this.opts.onPause();
            }

            onResume() {
                this.opts.onResume && this.opts.onResume();
            }

            onDestroy() {
                this.opts.onDestroy && this.opts.onDestroy();
            }

            onFocus(focus) {
                this.opts.onFocus && this.opts.onFocus(focus);
            }

            onNextProgress(progress) {
                this.opts.onNextProgress && this.opts.onNextProgress(progress);
            }

        }
        return NewAct;
    }

    static open(params, action) {
        NavStack.navigate(this, params, action);
    }

    static finish() {
        NavStack.finish(this);
    }

    static res = [];
    static single = false;

    public ui = new Laya.Component;
    public page = null;
    public params = {};
    public duration = 0;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;

    public onFocus?(focus): void;
    public onCreate?(): void;
    public onResume?(): void;
    public onPause?(): void;
    public onDestroy?(): void;
    public onNextProgress?(progress): void;

    constructor(options) {
        super(() => { this.back(); });
        this.width = screen.getDesignWidth();
        this.height = screen.getDesignHeight();
        this.params = Object.assign({}, options.params || {});
        this.page = options.page;
    }

    //////////////////////////
    /// navigator function
    //////////////////////////

    redirectTo(page, params = {}, action = null, single = false) {
        this.navigate(page, params, () => {
            this.back();
            action && action();
        }, single);
    }

    navigate(page, params = {}, action = null, single = false) {
        NavStack.navigate(page, params, action, single);
    }

    back() {
        NavStack.finish(this.page, this);
    }

    finish(page = this.page, instance = null) {
        NavStack.finish(page, instance);
    }

    pop(number = 1) {
        NavStack.pop(number);
    }

    popToTop() {
        NavStack.popToTop();
    }

}