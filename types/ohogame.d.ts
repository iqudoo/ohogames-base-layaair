declare module OHOGame {

    /** obj */
    type obj = {
        [key: string]: any
    }

    /** AdapterInfo */
    type AdapterInfo = {
        /** 宽度 */
        width: number;
        /** 高度 */
        height: number;
        /** X轴缩放 */
        scaleX: number;
        /** Y轴缩放 */
        scaleY: number;
    }

    /** ActivityOptions */
    interface ActivityOptions {
        /** single */
        single?: boolean;
        /** res */
        res?: { url: string, type: string }[];
        /** ui */
        ui?: any;
        /** activity on focus change */
        onFocus?(focus: boolean): void;
        /** activity on create */
        onCreate?(): void;
        /** activity on resume */
        onResume?(): void;
        /** activity on pause */
        onPause?(): void;
        /** activity on destroy */
        onDestroy?(): void;
        /** activity on next page load progress */
        onNextProgress?(progress: number): void;
    }

    /** StartOptions */
    interface StartOptions {
        mainPage?: any;
        commonRes?: { url: string, type: string }[];
        fileVersion?: string;
        vConsole?: boolean,
        onLoadProgress?: (progress: number) => void;
        onLoaded?: () => void;
    }

    /** AudioController */
    interface AudioController {
        readonly url: string;
        readonly position: number;
        readonly duration: number;
        onPlay(callback: () => void): void;
        onStop(callback: () => void): void;
        onPause(callback: () => void): void;
        onProgress(callback: (progress: { position: number, duration: number }) => void): void;
        onComplete(callback: () => void): void;
        isPaused(): void;
        isPlaying(): void;
        play(loops?: number): void
        pause(): void;
        resume(): void;
        stop(): void;
        destroy(): void;
    }

    /** 设置适配信息 */
    function setAdapterInfo(adapterInfo: AdapterInfo): void;
    /** 初始化 for 2D */
    function init(width: number, height: number, ...options): void;
    /** 初始化 for 3D */
    function init3D(width: number, height: number, ...options): void;
    /** 启动游戏 */
    function start(options: StartOptions | any, onLoaded?: () => void, onLoadProgress?: (progress: number) => void): void;
    /** 监听页面回到前台 */
    function onShow(showListener: () => void): void;
    /** 取消监听页面回到前台 */
    function offShow(showListener: () => void): void;
    /** 监听页面退到后台 */
    function onHide(hideListener: () => void): void;
    /** 取消监听页面退到后台 */
    function offHide(hideListener: () => void): void;
    /** 获取地址中带的参数 */
    function getQueryString(key: string): string;

    /** js */
    module js {
        /**  loadJs */
        function loadJs(jspath: string, options?: obj): Promise<any>;
    }

    /** env */
    module env {
        /** isLayaApp */
        function isLayaApp(): boolean;
        /** isConchApp */
        function isConchApp(): boolean;
        /** getVersion */
        function getVersion(): string;
        /** setDebug */
        function setDebug(debug: boolean): void;
        /** printDebug */
        function printDebug(message: any, ...options): void;
        /** printError */
        function printError(message: any, ...options): void;
        /** setEnv */
        function setEnv(env): void;
        /** getEnv */
        function getEnv(): string;
    }

    /** bg */
    module bg {
        /** setBgColor */
        function setBgColor(color: string): void;
        /** setBgSkin */
        function setBgSkin(url: string, sizeGrid?: string): void;
        /** setBgTexture */
        function setBgTexture(url: string): void;
        /** getBgSprite */
        function getBgSprite(): Laya.Sprite;
    }

    /** message */
    module message {
        /** create */
        function postMessage(data: obj): void;
        /** remove */
        function onMessage(callback: (data: obj) => void): void;
    }

    /** eft */
    module eft {
        /** create */
        function create(path: string, play?: boolean, loop?: boolean, loadComplet?: Function, thisRef?: any): Laya.MovieClip;
        /** remove */
        function remove(mc: Laya.MovieClip): void;
    }

    /** screen */
    module screen {
        /** getScale */
        function getScale(): number;
        /** getWidth */
        function getWidth(): number;
        /** getHeight */
        function getHeight(): number;
        /** getDesignWidth */
        function getDesignWidth(): number;
        /** getDesignHeight */
        function getDesignHeight(): number;
        /** getOffestX */
        function getOffestX(): number;
        /** getOffestY */
        function getOffestY(): number;
        /** setPaddingLeft */
        function setPaddingLeft(padding: number): void;
        /** getPaddingLeft */
        function getPaddingLeft(): number;
        /** setPaddingRight */
        function setPaddingRight(padding: number): void;
        /** getPaddingRight */
        function getPaddingRight(): number;
        /** setPaddingTop */
        function setPaddingTop(padding: number): void;
        /** getPaddingTop */
        function getPaddingTop(): number;
        /** setPaddingBottom */
        function setPaddingBottom(padding: number): void;
        /** getPaddingBottom */
        function getPaddingBottom(): number;
        /** setDeviation */
        function setDeviation(deviation: number): void;
        /** setAdaption */
        function setAdaption(adaption: boolean): void;
    }

    /** audio */
    module audio {
        /** playMusic */
        function playMusic(url: string, loops?: number): AudioController;
        /** playSound */
        function playSound(url: string, loops?: number): AudioController;
        /** stopMusic */
        function stopMusic(): void;
        /** stopAll */
        function stopAll(): void;
        /** stopAllSound */
        function stopAllSound(): void;
        /** setMusicVolume */
        function setMusicVolume(volume: number): void;
        /** setSoundVolume */
        function setSoundVolume(volume: number): void;
    }

    /** utils */
    module utils {
        /** randomUUID */
        function randomUUID(): string;
        /** randomNumber */
        function randomNumber(minNum: number, maxNum: number): number;
        /** randomNumber */
        function randomInteger(minNum: number, maxNum: number): number;
        /** randomArray */
        function randomArray(source: any[], length?: number): any[];
        /** randomArrayItem */
        function randomArrayItem(source: any[]): any;
        /** toAny */
        function toAny(source: any, def: any): any;
    }

    /** event */
    module event {
        /** registeredEvent */
        function registeredEvent(type: any, func: Function, thisRef: any, index?: number): void
        /** removeEvent */
        function removeEvent(type: any, func: Function, thisRef: any): void;
        /** sendEvent */
        function sendEvent(type: any, args?: Array<any>): void;
    }

    /** pipeline */
    module pipeline {
        /** put */
        function put(type: string, func: Function): void;
        /** next */
        function next(type: string): void;
    }

    /** runtime */
    module runtime {
        /** clickSound */
        let clickSound: string;
        /** scaleTime */
        let scaleTime: number;
        /** scaleSmalValue */
        let scaleSmalValue: number;
        /** scaleBigValue */
        let scaleBigValue: number;
        /** bindClick */
        function bindClick(view, onClick?: () => void, onDown?: () => void, onUp?: () => void, onOut?: () => void): void;
        /** btn */
        class btn extends Laya.Button {
            public sound: string;
        }

        /** btn_img */
        class btn_img extends Laya.Image {
            public sound: string;
        }

        /** btn_label */
        class btn_label extends Laya.Label {
            public sound: string;
        }

        /** btn_sprite */
        class btn_sprite extends Laya.Sprite {
            public sound: string;
        }

        /** btn_box */
        class btn_box extends Laya.Box {
            public sound: string;
        }
    }

    /** navigator */
    module navigator {
        /** navigate */
        function navigate(page, params?: any, action?: Function): void;
        /** finish activity */
        function finish(page, instance?: any): void;
        /** pop to top */
        function popToTop(): void;
        /** pop */
        function pop(num?: number): void;
    }

    /** popup */
    module popup {
        /** showPop */
        function showPopup(pop, params?, onHide?: (pop, result?: any) => void, alias?: string): void;
        /** hidePop */
        function hidePopup(pop, view?: any, result?: any, alias?: string): void;
    }

    /** toast */
    module toast {
        /** showToast */
        function showToast(toast, params?, onHide?: (toast) => void): void;
        /** hideToast */
        function hideToast(toast, view?: any): void;
    }

    /** Activity */
    class Activity extends Laya.Component {

        /** create */
        static create(options: ActivityOptions): any;
        /** open */
        static open(params?: any, action?: () => void): void;
        /** finish */
        static finish(): void;
        /** res */
        static res: { url: string, type: string }[];
        /** single */
        static single: boolean;
        /** page */
        protected page: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** easeIn */
        protected easeIn: Function;
        /** easeOut */
        protected easeOut: Function;
        /** fromProps */
        protected fromProps: obj;
        /** toProps */
        protected toProps: obj;
        /** bgAlpha */
        protected bgAlpha: number;
        /** bgColor */
        protected bgColor: string;
        /** isTranslucent */
        protected isTranslucent: boolean;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean;
        /** activity on focus change */
        protected onFocus?(focus: boolean): void;
        /** activity on create */
        protected onCreate?(): void;
        /** activity on resume */
        protected onResume?(): void;
        /** activity on pause */
        protected onPause?(): void;
        /** activity on destroy */
        protected onDestroy?(): void;
        /** activity on next page load progress */
        protected onNextProgress?(progress: number): void;
        /** redirectTo */
        protected redirectTo(page, params?: any, action?: () => void, single?: boolean): void;
        /** navigate */
        protected navigate(page, params?: any, action?: () => void, single?: boolean): void;
        /** finish self */
        protected back(): void;
        /** finish activity */
        protected finish(page?, instance?: any): void;
        /** pop */
        protected pop(num?: number): void;
        /** pop to top */
        protected popToTop(): void;
        /** constructor */
        constructor(options: obj);

    }

    /** PopupView */
    class PopupView extends Laya.Component {
        /** show */
        static show(params?: any, onHide?: (pop, result?: any) => void, alias?: string): void;
        /** signleShow */
        static signleShow(params?: any, onHide?: (pop, result?: any) => void, alias?: string): void;
        /** pipeShow */
        static pipeShow(params?: any, onHide?: (pop, result?: any) => void, alias?: string): void;
        /** hide */
        static hide(result?: any, alias?: string): void;
        /** topLevel */
        protected topLevel: boolean;
        /** pop */
        protected pop: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** easeIn */
        protected easeIn: Function;
        /** easeOut */
        protected easeOut: Function;
        /** fromProps */
        protected fromProps: obj;
        /** toProps */
        protected toProps: obj;
        /** exitProps */
        protected exitProps: obj;
        /** bgAlpha */
        protected bgAlpha: number;
        /** bgColor */
        protected bgColor: string;
        /** isTranslucent */
        protected isTranslucent: boolean;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean;
        /** pop on show */
        protected onShow?(): void;
        /** pop on hide */
        protected onHide?(): void;
        /** hide pop */
        protected hide(result?: any): void;
        /** constructor */
        constructor();
    }

    /** ToastView */
    class ToastView extends Laya.Component {

        /** show */
        static show(params?: any, onHide?: (toast) => void): void;
        /** hide */
        static hide(): void;
        /** topLevel */
        protected topLevel: boolean;
        /** toast */
        protected toast: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** displayDuration */
        protected displayDuration: number;
        /** easeIn */
        protected easeIn: Function;
        /** easeOut */
        protected easeOut: Function;
        /** fromProps */
        protected fromProps: obj;
        /** toProps */
        protected toProps: obj;
        /** exitProps */
        protected exitProps: obj;
        /** bgAlpha */
        protected bgAlpha: number;
        /** bgColor */
        protected bgColor: string;
        /** isTranslucent */
        protected isTranslucent: boolean;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean;
        /** toast on show */
        protected onShow?(): void;
        /** toast on hide */
        protected onHide?(): void;
        /** hide toast */
        protected hide(): void;
        /** constructor */
        constructor();

    }

    /** ToastView */
    class BaseView extends Laya.Component {

        /** ui */
        protected ui: any;

    }

}