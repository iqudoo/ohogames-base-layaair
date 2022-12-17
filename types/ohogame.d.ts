declare module OHOGame {

    /** obj */
    type obj = {
        [key: string]: any
    }

    /** 屏幕适配选项 */
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

    /** 初始化选项 */
    interface StartOptions {
        mainPage?: any;
        commonRes?: { url: string, type: string }[];
        fileVersion?: string;
        vConsole?: boolean,
        onLoadProgress?: (progress: number) => void;
        onLoaded?: () => void;
    }

    /** 页面选项 */
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

    /**
     * 简述人配置
     */
    interface SpeakerOptions {
        /** 取样频率 */
        sampleRate?: number;
        /** 傅里叶变换系数 */
        fftSize?: number;
    }

    /**
     * 讲述人控制器
     */
    interface SpeakerController {
        /** 音频地址 */
        readonly url: string;
        /** 当前播放进度 */
        readonly position: number;
        /** 音频长度 */
        readonly duration: number;
        /** 开始播放回调 */
        onPlay(callback: () => void): void;
        /** 停止播放回调 */
        onStop(callback: () => void): void;
        /** 播放进度回调 */
        onProgress(callback: (progress: { position: number, duration: number }) => void): void;
        /** 播放完成回调 */
        onComplete(callback: () => void): void;
        /** 获取当前共振峰 */
        getFormant(): number;
        /** 获取当前元音 */
        getVowel(): number;
        /** 正在讲述中 */
        isSpeaking(): boolean;
        /** 开始讲述 */
        speak(url: string, language?: string): void
        /** 停止 */
        stop(): void;
    }

    /** 音频控制器 */
    interface AudioController {
        /** 音频地址 */
        readonly url: string;
        /** 当前播放进度 */
        readonly position: number;
        /** 音频长度 */
        readonly duration: number;
        /** 开始播放回调 */
        onPlay(callback: () => void): void;
        /** 停止播放回调 */
        onStop(callback: () => void): void;
        /** 暂停播放回调 */
        onPause(callback: () => void): void;
        /** 播放进度回调 */
        onProgress(callback: (progress: { position: number, duration: number }) => void): void;
        /** 播放完成回调 */
        onComplete(callback: () => void): void;
        /** 背景音乐 */
        isMusic(): boolean;
        /** 暂停状态 */
        isPaused(): boolean;
        /** 正在播放中 */
        isPlaying(): boolean;
        /** 开始播放 */
        play(loops?: number): void
        /** 暂停 */
        pause(): void;
        /** 开始 */
        resume(): void;
        /** 停止 */
        stop(): void;
        /** 销毁 */
        destroy(): void;
    }

    /** 获取场景背景 */
    function getBg(): Background;
    /** 设置透明模式 */
    function setTransparent(transparent: boolean): void;
    /** 设置适配信息 */
    function setAdapterInfo(adapterInfo: AdapterInfo): void;
    /** 初始化 for 2D */
    function init(width: number, height: number, ...options): void;
    /** 初始化 for 3D */
    function init3D(width: number, height: number, ...options): void;
    /** 启动游戏 */
    function start(options: StartOptions | any, onLoaded?: () => void, onLoadProgress?: (progress: number) => void): void;
    /** 获取地址中带的参数 */
    function getQueryString(key: string): string;

    /** JS处理 */
    module js {
        /**  加载JS文件 */
        function loadJs(jspath: string, options?: obj): Promise<any>;
    }

    /** 环境 */
    module env {
        /** Laya缓存中 */
        function isLayaApp(): boolean;
        /** Laya runtime 环境中 */
        function isConchApp(): boolean;
        /** 当前版本号 */
        function getVersion(): string;
        /** 设置应用版本号 */
        function setAppVersion(version: string): void;
        /** 获取应用版本号 */
        function getAppVersion(): string;
        /** 设置调试模式，开启后打印日志 */
        function setDebug(debug: boolean): void;
        /** 打印调试日志 */
        function printDebug(message: any, ...options): void;
        /** 打印错误日志 */
        function printError(message: any, ...options): void;
        /** 设置当前环境变量 */
        function setEnv(env): void;
        /** 获取当前环境变量 */
        function getEnv(): string;
    }

    /** 消息 */
    module message {
        /** 发送消息 */
        function postMessage(data: obj): void;
        /** 监听消息 */
        function onMessage(callback: (data: obj) => void): void;
    }

    /** 特效 */
    module eft {
        /** 创建特效 */
        function create(path: string, play?: boolean, loop?: boolean, loadComplet?: Function, thisRef?: any): Laya.MovieClip;
        /** 销毁特效 */
        function remove(mc: Laya.MovieClip): void;
    }

    /** 屏幕 */
    module screen {

        /** 刷新场景尺寸 */
        function resize(): void;
        /** 获取场景背景 */
        function getBg(): Background;
        /** 获取屏幕缩放比例 */
        function getScale(): number;
        /** 获取画布宽度 */
        function getWidth(): number;
        /** 获取画布高度 */
        function getHeight(): number;
        /** 获取内容尺寸宽度 */
        function getContentWidth(): number;
        /** 获取内容尺寸高度 */
        function getContentHeight(): number;
        /** 获取设计尺寸宽度 */
        function getDesignWidth(): number;
        /** 获取设计尺寸高度 */
        function getDesignHeight(): number;
        /** 获取x轴偏移量 */
        function getOffestX(): number;
        /** 获取y轴偏移量 */
        function getOffestY(): number;
        /** 设置左边距 */
        function setPaddingLeft(padding: number): void;
        /** 获取左边距 */
        function getPaddingLeft(): number;
        /** 设置右边距 */
        function setPaddingRight(padding: number): void;
        /** 获取右边距 */
        function getPaddingRight(): number;
        /** 设置上边距 */
        function setPaddingTop(padding: number): void;
        /** 获取上边距 */
        function getPaddingTop(): number;
        /** 设置下边距 */
        function setPaddingBottom(padding: number): void;
        /** 获取下边距 */
        function getPaddingBottom(): number;
        /** 设置触发适配阈值 */
        function setDeviation(deviation: number): void;
        /** 设置是否自适应方向 */
        function setAutoDirection(autoDirection: boolean): void;
        /** 设置是否适配屏幕 */
        function setAutoAdaption(autoAdaption: boolean): void;

    }

    /**
     * 讲述人
     */
    module speaker {

        /**
         * 创建讲述人
         */
        function create(options?: SpeakerOptions): SpeakerController;

    }

    /** 音频模块 */
    module audio {

        /** 播放背景音乐 */
        function playMusic(url: string, loops?: number): AudioController;
        /** 播放音效 */
        function playSound(url: string, loops?: number): AudioController;
        /** 停止背景音乐 */
        function stopMusic(): void;
        /** 停止背景音乐及所有音效 */
        function stopAll(): void;
        /** 停止所有音效 */
        function stopAllSound(): void;
        /** 设置背景音乐音量 */
        function setMusicVolume(volume: number): void;
        /** 设置音效音量 */
        function setSoundVolume(volume: number): void;

    }

    /** 工具模块 */
    module utils {

        /** 随机uuid */
        function randomUUID(): string;
        /** 生成随机数 */
        function randomNumber(minNum: number, maxNum: number): number;
        /** 生成随机整数 */
        function randomInteger(minNum: number, maxNum: number): number;
        /** 基于原数组生成新的随机数 */
        function randomArray(source: any[], length?: number): any[];
        /** 随机从数组中获取一条数据 */
        function randomArrayItem(source: any[]): any;
        /** 加载JSON文件 */
        function loadJson(url: string, force: boolean): Promise<any>;
        /** 数据格式转换 */
        function toAny(source: any, def: any): any;

    }

    /** 事件 */
    module event {

        /** 注册事件 */
        function registeredEvent(type: any, func: Function, thisRef: any, index?: number): void
        /** 取消注册事件 */
        function removeEvent(type: any, func: Function, thisRef: any): void;
        /** 发送事件 */
        function sendEvent(type: any, args?: Array<any>): void;

    }

    /** 默认点击效果集合 */
    module runtime {

        /** 点击效果动画时长 */
        let clickAnimDuration: number;
        /** 点击缩放值 */
        let clickDownProps: obj;
        /** 松开缩放值 */
        let clickNormalProps: obj;
        /** 点击音效 */
        let clickSound: string;

        /** 绑定点击效果 */
        function bindClick(view, onClick?: () => void, onDown?: () => void, onUp?: () => void, onOut?: () => void): void;

        /** 按钮 */
        class btn extends Laya.Button {
            public clickAnimDuration: number;
            public clickDownProps: obj;
            public clickNormalProps: obj;
            public clickSound: string;
        }

        /** 图片 */
        class btn_img extends Laya.Image {
            public clickAnimDuration: number;
            public clickDownProps: obj;
            public clickNormalProps: obj;
            public clickSound: string;
        }

        /** 文字标签 */
        class btn_label extends Laya.Label {
            public clickAnimDuration: number;
            public clickDownProps: obj;
            public clickNormalProps: obj;
            public clickSound: string;
        }

        /** 精灵 */
        class btn_sprite extends Laya.Sprite {
            public clickAnimDuration: number;
            public clickDownProps: obj;
            public clickNormalProps: obj;
            public clickSound: string;
        }

        /** 控件组 */
        class btn_box extends Laya.Box {
            public clickAnimDuration: number;
            public clickDownProps: obj;
            public clickNormalProps: obj;
            public clickSound: string;
        }

        /** 翻页控件 */
        class page_view extends Laya.List {
            public onPageChangeHandler: (pageId: number) => void;
            public pageId: number;
        }

        /** 上拉加载更多 */
        class page_list extends Laya.List {
            public loading: boolean;
            public onLoadMoreHandler: (lastCount: number) => void;
            public preCount: number;
        }

    }

    /** 页面导航模块 */
    module navigator {
        /** 打开新页面 */
        function navigate(page, params?: any, action?: Function): void;
        /** 关闭页面 */
        function finish(page, instance?: any): void;
        /** 退到第一个页面 */
        function popToTop(): void;
        /** 页面后退 */
        function pop(num?: number): void;
    }

    /** 弹窗 */
    module popup {

        /** 显示弹窗 */
        function showPopup(pop, params?, onHide?: (pop, result?: any) => void, alias?: string): void;
        /** 隐藏弹窗 */
        function hidePopup(pop, view?: any, result?: any, alias?: string): void;

    }

    /** 提示 */
    module toast {

        /** 显示提示内容 */
        function showToast(toast, params?, onHide?: (toast) => void): void;
        /** 隐藏提示内容 */
        function hideToast(toast, view?: any): void;

    }

    /** 页面组件 */
    class Activity extends Component {

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
        constructor();

    }

    /** 弹窗组件 */
    class PopupView extends Component {

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
        /** uiDuration */
        protected uiDuration: number;
        /** uiEaseIn */
        protected uiEaseIn: obj;
        /** uiEaseOut */
        protected uiEaseOut: obj;
        /** uiFromProps */
        protected uiFromProps: obj;
        /** uiToProps */
        protected uiToProps: obj;
        /** uiExitProps */
        protected uiExitProps: obj;
        /** pop on show */
        protected onShow?(): void;
        /** pop on hide */
        protected onHide?(): void;
        /** hide pop */
        protected hide(result?: any): void;
        /** constructor */
        constructor();

    }

    /** 提示内容组件 */
    class ToastView extends Component {

        /** show */
        static show(params?: any, onHide?: (toast) => void): void;
        /** hide */
        static hide(): void;
        /** toast */
        protected toast: any;
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
        /** topLevel */
        protected topLevel: boolean;
        /** toast on show */
        protected onShow?(): void;
        /** toast on hide */
        protected onHide?(): void;
        /** hide toast */
        protected hide(): void;
        /** constructor */
        constructor();

    }

    class Component extends BaseView {

        /** bg */
        protected readonly bg: Background;
        /** bgAlpha */
        protected bgAlpha: number;
        /** bgColor */
        protected bgColor: string;
        /** isTranslucent */
        protected isTranslucent: boolean;
        /** isTranslucent */
        protected nonPenetrating: boolean;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean;
        /** constructor */
        constructor(handleOnTouchOutside?: Function);

    }

    /** 基础组件 */
    class BaseView extends Laya.Component {

        /** ui */
        protected ui: any;
        /** constructor */
        constructor();

    }

    class Background extends Laya.Component {

        /** 重置大小 */
        public resize(): void;
        /** 设置背景透明度 */
        public setBgAlpha(alpha: number): void;
        /** 设置背景颜色 */
        public setBgColor(color: string): void;
        /** 设置背景图片 */
        public setBgSkin(url: string, sizeGrid?: string): void;
        /** 设置背景贴图 */
        public setBgTexture(url: string): void;
        /** 获取背景精灵 */
        public getBgSprite(): Laya.Sprite;
        /** constructor */
        constructor(onResize?: (bg: Background) => void);

    }

}