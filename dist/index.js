(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/adapter/_transsion.ts":
/*!***********************************!*\
  !*** ./src/adapter/_transsion.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hook_1 = __webpack_require__(/*! ../services/hook */ "./src/services/hook.ts");
// loader
if (Laya && Laya.Loader) {
    var Handler = Laya.Handler;
    var Loader = Laya.Loader;
    var HttpRequest = Laya.HttpRequest;
    var __proto = Loader.prototype;
    __proto.load = function (url, type, cache, group, ignoreCache) {
        (cache === void 0) && (cache = true);
        (ignoreCache === void 0) && (ignoreCache = false);
        this._url = url;
        if (url.indexOf("data:image") === 0)
            this._type = type = "image";
        else {
            this._type = type || (type = this.getTypeFromUrl(url));
            url = Laya.URL.formatURL(url);
        }
        this._cache = cache;
        this._data = null;
        if (!ignoreCache && Loader.loadedMap[url]) {
            this._data = Loader.loadedMap[url];
            this.event(/*laya.events.Event.PROGRESS*/ "progress", 1);
            this.event(/*laya.events.Event.COMPLETE*/ "complete", this._data);
            return;
        }
        if (group)
            Loader.setGroup(url, group);
        if (Loader.parserMap[type] != null) {
            this._customParse = true;
            if (((Loader.parserMap[type]) instanceof Handler))
                Loader.parserMap[type].runWith(this);
            else
                Loader.parserMap[type].call(null, this);
            return;
        }
        if (type === "image" || type === "htmlimage" || type === "nativeimage")
            return this._loadImage(url);
        if (type === "sound")
            return this._loadSound(url);
        if (type === "ttf")
            return this._loadTTF(url);
        try {
            // 在这里，插入添加适配读取本地资源
            if (typeof loadRuntime !== 'undefined' && !url.startsWith("http")) {
                var that = this;
                setTimeout(function () {
                    if (url.startsWith('file://')) {
                        url = url.substr('file://'.length);
                    }
                    var response;
                    if (type == 'pkm' || type === "arraybuffer") {
                        response = rt.getFileSystemManager().readFileSync(url);
                    }
                    else {
                        response = rt.getFileSystemManager().readFileSync(url, "utf8");
                        if ((type == 'atlas' || type == 'json') && typeof response !== "undefined") {
                            response = JSON.parse(response);
                        }
                    }
                    that.onLoaded(response);
                }, 0);
                return; //这里记得 return
            }
        }
        catch (error) {
        }
        // 添加适配代码结束，下面是原本 laya 代码
        var contentType;
        switch (type) {
            case "atlas":
            case "plf":
                contentType = "json";
                break;
            case "font":
                contentType = "xml";
                break;
            case "pkm":
                contentType = "arraybuffer";
                break;
            default:
                contentType = type;
        }
        if (Loader.preLoadedMap[url]) {
            this.onLoaded(Loader.preLoadedMap[url]);
        }
        else {
            if (!this._http) {
                this._http = new HttpRequest();
                this._http.on(/*laya.events.Event.PROGRESS*/ "progress", this, this.onProgress);
                this._http.on(/*laya.events.Event.ERROR*/ "error", this, this.onError);
                this._http.on(/*laya.events.Event.COMPLETE*/ "complete", this, this.onLoaded);
            }
            this._http.send(url, null, "get", contentType);
        }
    };
}
// ui
hook_1.default.onInit(function (width, height) {
    if (typeof window !== "undefined" && typeof window['getAdapterInfo'] !== "undefined") {
        var stage = Laya.stage;
        var info = window['getAdapterInfo']({ width: width, height: height, scaleMode: Laya.stage.scaleMode });
        stage.width = info.rw;
        stage.height = info.rh;
    }
});


/***/ }),

/***/ "./src/adapter/index.ts":
/*!******************************!*\
  !*** ./src/adapter/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./_transsion */ "./src/adapter/_transsion.ts");


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./adapter */ "./src/adapter/index.ts");
__webpack_require__(/*! ./polyfill */ "./src/polyfill.ts");
var bg_1 = __webpack_require__(/*! ./services/manager/bg */ "./src/services/manager/bg.ts");
var eft_1 = __webpack_require__(/*! ./services/manager/eft */ "./src/services/manager/eft.ts");
var screen_1 = __webpack_require__(/*! ./services/manager/screen */ "./src/services/manager/screen.ts");
var speaker_1 = __webpack_require__(/*! ./services/speaker */ "./src/services/speaker/index.ts");
var audio_1 = __webpack_require__(/*! ./services/audio */ "./src/services/audio.ts");
var env_1 = __webpack_require__(/*! ./services/env */ "./src/services/env.ts");
var js_1 = __webpack_require__(/*! ./services/js */ "./src/services/js.ts");
var event_1 = __webpack_require__(/*! ./services/event */ "./src/services/event.ts");
var runtime_1 = __webpack_require__(/*! ./services/runtime */ "./src/services/runtime.ts");
var message_1 = __webpack_require__(/*! ./services/message */ "./src/services/message.ts");
var utils_1 = __webpack_require__(/*! ./services/utils */ "./src/services/utils.ts");
var stack_1 = __webpack_require__(/*! ./services/navigator/stack */ "./src/services/navigator/stack.ts");
var popupmanager_1 = __webpack_require__(/*! ./services/display/popupmanager */ "./src/services/display/popupmanager.ts");
var toastmanager_1 = __webpack_require__(/*! ./services/display/toastmanager */ "./src/services/display/toastmanager.ts");
var activity_1 = __webpack_require__(/*! ./services/display/activity */ "./src/services/display/activity.ts");
var popupview_1 = __webpack_require__(/*! ./services/display/popupview */ "./src/services/display/popupview.ts");
var toastview_1 = __webpack_require__(/*! ./services/display/toastview */ "./src/services/display/toastview.ts");
var baseview_1 = __webpack_require__(/*! ./services/display/baseview */ "./src/services/display/baseview.ts");
var query_1 = __webpack_require__(/*! ./utils/query */ "./src/utils/query.ts");
var init_1 = __webpack_require__(/*! ./services/init */ "./src/services/init.ts");
var OHOGame = Object.assign({}, {
    init: init_1.init,
    init3D: init_1.init3D,
    start: init_1.start,
    getQueryString: query_1.getQueryString,
    setTransparent: init_1.setTransparent,
    setAdapterInfo: init_1.setAdapterInfo,
    env: env_1.default,
    js: js_1.default,
    bg: bg_1.default,
    eft: eft_1.default,
    screen: screen_1.default,
    speaker: speaker_1.default,
    audio: audio_1.default,
    event: event_1.default,
    runtime: runtime_1.default,
    navigator: stack_1.default,
    utils: utils_1.default,
    popup: popupmanager_1.default,
    toast: toastmanager_1.default,
    message: message_1.default,
    Activity: activity_1.default,
    PopupView: popupview_1.default,
    ToastView: toastview_1.default,
    BaseView: baseview_1.default
});
if (typeof window !== "undefined") {
    window.OHOGame = OHOGame;
}
module.exports = {
    OHOGame: OHOGame
};


/***/ }),

/***/ "./src/polyfill.ts":
/*!*************************!*\
  !*** ./src/polyfill.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}


/***/ }),

/***/ "./src/services/audio.ts":
/*!*******************************!*\
  !*** ./src/services/audio.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __webpack_require__(/*! ./env */ "./src/services/env.ts");
var looper_1 = __webpack_require__(/*! ../utils/looper */ "./src/utils/looper.ts");
function fixWechatAudioPlay(callback) {
    if (window && window['WeixinJSBridge']) {
        try {
            window['WeixinJSBridge'].invoke("getNetworkType", {}, function () {
                callback && callback();
            });
        }
        catch (e) {
            callback && callback();
        }
    }
    else {
        callback && callback();
    }
}
function fixAudioExtension(targetUrl, replaceExt) {
    var ext = Laya.Utils.getFileExtension(targetUrl);
    var searchExt = !!ext ? "." + ext : '';
    if (env_1.default.isConchApp() && searchExt != ".wav" && searchExt != ".ogg") {
        return targetUrl.substr(0, targetUrl.length - searchExt.length) + replaceExt;
    }
    return targetUrl;
}
var AudioController = /** @class */ (function () {
    function AudioController(isMusic) {
        this._auidoUrl = '';
        this._chancel = null;
        this._playing = false;
        this._onPlay = null;
        this._onPause = null;
        this._onStop = null;
        this._onError = null;
        this._onProgress = null;
        this._onComplete = null;
        this._position = -1;
        this._duration = -1;
        this._paused = false;
        this._music = false;
        this._playTime = 0;
        this._music = isMusic;
        if (!isMusic) {
            AudioController._soundList.push(this);
        }
    }
    AudioController.stopAll = function () {
        var soundList = AudioController._soundList.splice(0, AudioController._soundList.length);
        soundList.forEach(function (item) {
            item && item.stop();
        });
    };
    AudioController.prototype._update = function () {
        if (this._chancel) {
            this._position = this._chancel.position;
            this._duration = this._chancel.duration;
            if (!this._playing && this._position > 0) {
                this._playing = true;
                this._onPlay && this._onPlay();
            }
            if (this._playing && this._duration > 0) {
                this._onProgress && this._onProgress({
                    position: this.position,
                    duration: this.duration,
                });
            }
            else if (Date.now() - this._playTime > 2000) {
                this._onError && this._onError();
                this.stop();
            }
        }
    };
    AudioController.prototype.onPlay = function (callback) {
        this._onPlay = callback;
    };
    AudioController.prototype.onStop = function (callback) {
        this._onStop = callback;
    };
    AudioController.prototype.onPause = function (callback) {
        this._onPause = callback;
    };
    AudioController.prototype.onProgress = function (callback) {
        this._onProgress = callback;
    };
    AudioController.prototype.onComplete = function (callback) {
        this._onComplete = callback;
    };
    AudioController.prototype.onError = function (callback) {
        this._onError = callback;
    };
    Object.defineProperty(AudioController.prototype, "url", {
        get: function () {
            return this._auidoUrl;
        },
        set: function (url) {
            if (this._auidoUrl != url) {
                this._auidoUrl = url;
                this.stop();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioController.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioController.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    AudioController.prototype.isMusic = function () {
        return this._music;
    };
    AudioController.prototype.isPaused = function () {
        return this._paused;
    };
    AudioController.prototype.isPlaying = function () {
        return this._playing;
    };
    AudioController.prototype.play = function (loops) {
        var _this = this;
        if (loops === void 0) { loops = 1; }
        fixWechatAudioPlay(function () {
            if (_this._auidoUrl) {
                _this.stop();
                var playUrl = fixAudioExtension(_this._auidoUrl, '.ogg');
                _this._playTime = Date.now();
                if (_this._music) {
                    _this._chancel = Laya.SoundManager.playMusic(playUrl, loops, Laya.Handler.create(_this, function () {
                        _this._onComplete && _this._onComplete();
                        _this.stop();
                    }), 0);
                }
                else {
                    _this._chancel = Laya.SoundManager.playSound(playUrl, loops, Laya.Handler.create(_this, function () {
                        _this._onComplete && _this._onComplete();
                        _this.stop();
                    }), null, 0);
                }
                looper_1.default.loop(_this, _this._update);
            }
        });
    };
    AudioController.prototype.pause = function () {
        if (this._chancel && this._playing) {
            this._onPause && this._onPause();
            this._chancel.pause();
            this._paused = true;
            this._playing = false;
            looper_1.default.clear(this, this._update);
        }
    };
    AudioController.prototype.resume = function () {
        if (this._chancel && this._paused) {
            this._paused = false;
            this._chancel.resume();
            looper_1.default.loop(this, this._update);
        }
    };
    AudioController.prototype.stop = function () {
        if (this._chancel) {
            this._onStop && this._onStop();
            this._chancel.stop();
            this._paused = false;
            this._playing = false;
            if (this._music) {
                Laya.SoundManager.stopMusic();
            }
            else {
                Laya.SoundManager.stopSound(this._auidoUrl);
            }
            Laya.SoundManager.removeChannel(this._chancel);
            looper_1.default.clear(this, this._update);
            this._chancel = null;
        }
    };
    AudioController.prototype.destroy = function () {
        this.stop();
        this._onComplete = null;
        this._onProgress = null;
        this._onPlay = null;
        this._onStop = null;
        this._onPause = null;
    };
    AudioController._soundList = [];
    return AudioController;
}());
var _musicAudio = new AudioController(true);
function playMusic(url, loops) {
    if (loops === void 0) { loops = 1; }
    _musicAudio.url = url;
    _musicAudio.play(loops);
    return _musicAudio;
}
function playSound(url, loops) {
    if (loops === void 0) { loops = 1; }
    var audio = new AudioController(false);
    audio.url = url;
    audio.play(loops);
    return audio;
}
function stopMusic() {
    _musicAudio.stop();
}
function stopAllSound() {
    AudioController.stopAll();
}
function stopAll() {
    stopMusic();
    stopAllSound();
}
function setMusicVolume(volume) {
    Laya.SoundManager.setMusicVolume(volume);
}
function setSoundVolume(volume) {
    Laya.SoundManager.setSoundVolume(volume);
}
exports.default = {
    playMusic: playMusic,
    playSound: playSound,
    stopAll: stopAll,
    stopMusic: stopMusic,
    stopAllSound: stopAllSound,
    setMusicVolume: setMusicVolume,
    setSoundVolume: setSoundVolume,
};


/***/ }),

/***/ "./src/services/display/activity.ts":
/*!******************************************!*\
  !*** ./src/services/display/activity.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = __webpack_require__(/*! ../navigator/stack */ "./src/services/navigator/stack.ts");
var screen_1 = __webpack_require__(/*! ../manager/screen */ "./src/services/manager/screen.ts");
var component_1 = __webpack_require__(/*! ./component */ "./src/services/display/component.ts");
var Activity = /** @class */ (function (_super) {
    __extends(Activity, _super);
    function Activity(options) {
        var _this = _super.call(this, function () { _this.back(); }) || this;
        _this.page = null;
        _this.params = {};
        _this.duration = 0;
        _this.easeIn = null;
        _this.easeOut = null;
        _this.fromProps = null;
        _this.toProps = null;
        _this.exitProps = null;
        _this.ui = new Laya.Component;
        _this.width = screen_1.default.getDesignWidth();
        _this.height = screen_1.default.getDesignHeight();
        _this.params = Object.assign({}, options.params || {});
        _this.page = options.page;
        return _this;
    }
    Activity.create = function (opts) {
        var NewAct = /** @class */ (function (_super) {
            __extends(NewAct, _super);
            function NewAct(options) {
                var _this = _super.call(this, options) || this;
                _this.opts = null;
                _this.opts = opts || {};
                Object.assign(_this, _this.opts);
                NewAct.single = _this.opts.single;
                NewAct.res = _this.opts.res;
                return _this;
            }
            NewAct.prototype.onCreate = function () {
                this.opts.onCreate && this.opts.onCreate();
            };
            NewAct.prototype.onPause = function () {
                this.opts.onPause && this.opts.onPause();
            };
            NewAct.prototype.onResume = function () {
                this.opts.onResume && this.opts.onResume();
            };
            NewAct.prototype.onDestroy = function () {
                this.opts.onDestroy && this.opts.onDestroy();
            };
            NewAct.prototype.onFocus = function (focus) {
                this.opts.onFocus && this.opts.onFocus(focus);
            };
            NewAct.prototype.onNextProgress = function (progress) {
                this.opts.onNextProgress && this.opts.onNextProgress(progress);
            };
            return NewAct;
        }(Activity));
        return NewAct;
    };
    Activity.open = function (params, action) {
        stack_1.default.navigate(this, params, action);
    };
    Activity.finish = function () {
        stack_1.default.finish(this);
    };
    //////////////////////////
    /// navigator function
    //////////////////////////
    Activity.prototype.redirectTo = function (page, params, action, single) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (action === void 0) { action = null; }
        if (single === void 0) { single = false; }
        this.navigate(page, params, function () {
            _this.back();
            action && action();
        }, single);
    };
    Activity.prototype.navigate = function (page, params, action, single) {
        if (params === void 0) { params = {}; }
        if (action === void 0) { action = null; }
        if (single === void 0) { single = false; }
        stack_1.default.navigate(page, params, action, single);
    };
    Activity.prototype.back = function () {
        stack_1.default.finish(this.page, this);
    };
    Activity.prototype.finish = function (page, instance) {
        if (page === void 0) { page = this.page; }
        if (instance === void 0) { instance = null; }
        stack_1.default.finish(page, instance);
    };
    Activity.prototype.pop = function (number) {
        if (number === void 0) { number = 1; }
        stack_1.default.pop(number);
    };
    Activity.prototype.popToTop = function () {
        stack_1.default.popToTop();
    };
    Activity.res = [];
    Activity.unpackFile = null;
    Activity.single = false;
    return Activity;
}(component_1.default));
exports.default = Activity;


/***/ }),

/***/ "./src/services/display/baseview.ts":
/*!******************************************!*\
  !*** ./src/services/display/baseview.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseView = /** @class */ (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseView.prototype, "ui", {
        get: function () {
            return this.getChildByName('_contentView');
        },
        set: function (view) {
            this.removeChildByName('_contentView');
            view.name = '_contentView';
            view.mouseThrough = true;
            this.addChild(view);
        },
        enumerable: true,
        configurable: true
    });
    return BaseView;
}(Laya.Component));
exports.default = BaseView;


/***/ }),

/***/ "./src/services/display/component.ts":
/*!*******************************************!*\
  !*** ./src/services/display/component.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var screen_1 = __webpack_require__(/*! ../manager/screen */ "./src/services/manager/screen.ts");
var baseview_1 = __webpack_require__(/*! ./baseview */ "./src/services/display/baseview.ts");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(handleOnTouchOutside) {
        if (handleOnTouchOutside === void 0) { handleOnTouchOutside = null; }
        var _this = _super.call(this) || this;
        _this._bgSprite = null;
        _this._bgAlpha = 0.5;
        _this._bgColor = '#000000';
        _this._isTranslucent = true;
        _this._isShow = false;
        _this._handleOnTouchOutside = null;
        _this._canceledOnTouchOutside = false;
        _this._mask = false;
        _this._onEvent = null;
        _this._handleOnTouchOutside = handleOnTouchOutside;
        _this._onEvent = function (e) {
            if (_this.isShow && _this.canceledOnTouchOutside) {
                _this._handleOnTouchOutside && _this._handleOnTouchOutside();
            }
            e.stopPropagation();
        };
        _this.initBg();
        return _this;
    }
    Object.defineProperty(Component.prototype, "bg", {
        get: function () {
            return this._bgSprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isShow", {
        get: function () {
            return this._isShow;
        },
        set: function (isShow) {
            this._isShow = isShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "bgAlpha", {
        get: function () {
            return this._bgAlpha;
        },
        set: function (bgAlpha) {
            this._bgAlpha = bgAlpha;
            this.refreshBg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "bgColor", {
        get: function () {
            return this._bgColor;
        },
        set: function (bgColor) {
            this._bgColor = bgColor;
            this.refreshBg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isTranslucent", {
        get: function () {
            return this._isTranslucent;
        },
        set: function (isTranslucent) {
            this._isTranslucent = isTranslucent;
            this.refreshBg();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "canceledOnTouchOutside", {
        get: function () {
            return this._canceledOnTouchOutside;
        },
        set: function (canceledOnTouchOutside) {
            this._canceledOnTouchOutside = canceledOnTouchOutside;
            this.refreshCanceledOnTouchOutside();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "nonPenetrating", {
        get: function () {
            return this._mask;
        },
        set: function (nonPenetrating) {
            this._mask = nonPenetrating;
            this.refreshCanceledOnTouchOutside();
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.refreshBg = function () {
        if (!this._bgSprite) {
            return;
        }
        this.resizeBg();
        this.refreshCanceledOnTouchOutside();
        this._bgSprite.alpha = this.bgAlpha;
        this._bgSprite.graphics.clear();
        if (!this.isTranslucent) {
            this._bgSprite.graphics.drawRect(0, 0, this._bgSprite.width, this._bgSprite.height, this.bgColor);
        }
    };
    Component.prototype.refreshCanceledOnTouchOutside = function () {
        this._bgSprite && this._bgSprite.offAll();
        if ((this.canceledOnTouchOutside || this.nonPenetrating) && this.ui) {
            this.ui.mouseThrough = true;
            this._bgSprite && this._bgSprite.on(Laya.Event.CLICK, this, this._onEvent);
        }
    };
    Component.prototype.initBg = function () {
        var _this = this;
        if (this._bgSprite) {
            return;
        }
        this._bgSprite = new Laya.Sprite();
        this.addChildAt(this._bgSprite, 0);
        setTimeout(function () { _this.refreshBg(); }, 0);
    };
    Component.prototype.resizeBg = function () {
        if (!this._bgSprite) {
            return;
        }
        this._bgSprite.x = -screen_1.default.getOffestX();
        this._bgSprite.y = -screen_1.default.getOffestY();
        this._bgSprite.width = screen_1.default.getWidth();
        this._bgSprite.height = screen_1.default.getHeight();
    };
    return Component;
}(baseview_1.default));
exports.default = Component;


/***/ }),

/***/ "./src/services/display/popupmanager.ts":
/*!**********************************************!*\
  !*** ./src/services/display/popupmanager.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __webpack_require__(/*! ../env */ "./src/services/env.ts");
var uimgr_1 = __webpack_require__(/*! ../manager/uimgr */ "./src/services/manager/uimgr.ts");
var _popups = {};
var _fromProps = { alpha: 0 };
var _toProps = { alpha: 1 };
var _exitProps = { alpha: 0 };
function _showPopupAnim(popupView, cb) {
    // ui anim
    var uiDuration = popupView.uiDuration || 300;
    var uiFromProps = popupView.uiFromProps || {};
    var uiToProps = popupView.uiToProps || {};
    var uiEaseIn = popupView.uiEaseIn || Laya.Ease.linearIn;
    Object.assign(popupView.ui, uiFromProps);
    Laya.Tween.to(popupView.ui, uiToProps, uiDuration, uiEaseIn);
    // view anim
    var duration = popupView.duration || 300;
    var from = popupView.fromProps || _fromProps || {};
    var to = popupView.toProps || _toProps || {};
    var easeIn = popupView.easeIn || Laya.Ease.linearIn;
    Object.assign(popupView, from);
    Laya.Tween.to(popupView, to, duration, easeIn, Laya.Handler.create(this, function () {
        cb && cb(popupView);
    }));
}
function _hidePopupAnim(popupView, cb) {
    // ui anim
    var uiDuration = popupView.uiDuration || 300;
    var uiToProps = popupView.uiToProps || {};
    var uiExitProps = popupView.uiExitProps || {};
    var uiEaseOut = popupView.uiEaseOut || Laya.Ease.linearOut;
    Object.assign(popupView.ui, uiToProps);
    Laya.Tween.to(popupView.ui, uiExitProps, uiDuration, uiEaseOut);
    // view anim
    var duration = popupView.duration || 300;
    var toProps = popupView.toProps || _toProps || {};
    var exitProps = popupView.exitProps || _exitProps || {};
    var easeOut = popupView.easeOut || Laya.Ease.linearOut;
    Object.assign(popupView, toProps);
    Laya.Tween.to(popupView, exitProps, duration, easeOut, Laya.Handler.create(this, function () {
        cb && cb(popupView);
    }), Math.max(0, uiDuration - duration));
}
function _hidePopup(view, result) {
    _hidePopupAnim(view, function () {
        view._onHide && view._onHide(view.popup, result);
        view.isShow = false;
        view.onHide && view.onHide(view.popup, result);
        view.removeSelf && view.removeSelf();
        view.destroy && view.destroy();
        uimgr_1.default.checkFocus();
    });
}
function _showPopup(view) {
    _showPopupAnim(view, function () {
        view.isShow = true;
    });
}
function showPopup(popup, params, onHide, alias) {
    if (params === void 0) { params = null; }
    if (onHide === void 0) { onHide = null; }
    if (alias === void 0) { alias = "default"; }
    var mapKey = alias + "_" + env_1.getClassName(popup);
    var views = _popups[mapKey];
    var view = new popup();
    view.alias = alias;
    view.popup = popup;
    view.params = params || {};
    view._onHide = onHide;
    if (views) {
        views.push(view);
    }
    else {
        _popups[mapKey] = [view];
    }
    if (view.topLevel) {
        uimgr_1.default.addViewTopLayer(view);
    }
    else {
        uimgr_1.default.addViewToMainLayer(view);
    }
    view.onShow && view.onShow();
    _showPopup(view);
}
function hidePopup(popup, view, result, alias) {
    if (view === void 0) { view = null; }
    if (result === void 0) { result = {}; }
    if (alias === void 0) { alias = "default"; }
    var mapKey = alias + "_" + env_1.getClassName(popup);
    var views = _popups[mapKey];
    if (view) {
        var index = views ? views.indexOf(view) : -1;
        if (index < 0) {
            return;
        }
        views.splice(index, 1);
        _hidePopup(view, result);
    }
    else {
        views && views.splice(0, views.length).forEach(function (v) {
            _hidePopup(v, result || { close: true });
        });
    }
}
exports.default = {
    showPopup: showPopup,
    hidePopup: hidePopup
};


/***/ }),

/***/ "./src/services/display/popupview.ts":
/*!*******************************************!*\
  !*** ./src/services/display/popupview.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var popupmanager_1 = __webpack_require__(/*! ./popupmanager */ "./src/services/display/popupmanager.ts");
var screen_1 = __webpack_require__(/*! ../manager/screen */ "./src/services/manager/screen.ts");
var pipeline_1 = __webpack_require__(/*! ../pipeline */ "./src/services/pipeline.ts");
var component_1 = __webpack_require__(/*! ./component */ "./src/services/display/component.ts");
var PopupView = /** @class */ (function (_super) {
    __extends(PopupView, _super);
    function PopupView() {
        var _this = _super.call(this, function () {
            _this.hide();
        }) || this;
        _this.duration = 300;
        _this.easeIn = null;
        _this.easeOut = null;
        _this.fromProps = null;
        _this.toProps = null;
        _this.exitProps = null;
        _this.uiDuration = 300;
        _this.uiEaseIn = null;
        _this.uiEaseOut = null;
        _this.uiFromProps = null;
        _this.uiToProps = null;
        _this.uiExitProps = null;
        _this.topLevel = false;
        _this.isTranslucent = false;
        _this.canceledOnTouchOutside = false;
        _this.nonPenetrating = true;
        _this.width = screen_1.default.getDesignWidth();
        _this.height = screen_1.default.getDesignHeight();
        return _this;
    }
    PopupView.show = function (params, onHide, alias) {
        popupmanager_1.default.showPopup(this, params, onHide, alias);
    };
    PopupView.signleShow = function (params, onHide, alias) {
        popupmanager_1.default.hidePopup(this, null, null, alias);
        popupmanager_1.default.showPopup(this, params, onHide, alias);
    };
    PopupView.pipeShow = function (params, onHide, alias) {
        var _this = this;
        pipeline_1.default.put("popup", function () {
            popupmanager_1.default.showPopup(_this, params, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                onHide && onHide.apply(void 0, args);
                pipeline_1.default.next("popup");
            }, alias);
        });
    };
    PopupView.hide = function (result, alias) {
        popupmanager_1.default.hidePopup(this, null, result, alias);
    };
    PopupView.prototype.hide = function (result) {
        if (result === void 0) { result = null; }
        popupmanager_1.default.hidePopup(this.popup, this, result, this.alias);
    };
    return PopupView;
}(component_1.default));
exports.default = PopupView;


/***/ }),

/***/ "./src/services/display/toastmanager.ts":
/*!**********************************************!*\
  !*** ./src/services/display/toastmanager.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uimgr_1 = __webpack_require__(/*! ../manager/uimgr */ "./src/services/manager/uimgr.ts");
var _toasts = {};
function _pushToast(toast, view) {
    if (_toasts[toast]) {
        _toasts[toast].push(view);
    }
    else {
        _toasts[toast] = [view];
    }
}
function _popToast(toast, view) {
    if (!_toasts[toast]) {
        return [];
    }
    if (view && _toasts[toast].length > 1) {
        _toasts[toast].splice(_toasts[toast].indexOf(view), 1);
        return [view];
    }
    else {
        var views = _toasts[toast] || [];
        delete _toasts[toast];
        return views;
    }
}
function showToast(toast, params, onHide) {
    if (params === void 0) { params = null; }
    if (onHide === void 0) { onHide = null; }
    var view = new toast;
    view._on_hide = onHide;
    view.toast = toast;
    view.params = params || {};
    view.onShow && view.onShow();
    var from = view.fromProps || { alpha: 0 };
    var to = view.toProps || { alpha: 1 };
    var exit = view.exitProps || { alpha: 0 };
    var easeIn = view.easeIn || Laya.Ease.linearIn;
    var easeOut = view.easeOut || Laya.Ease.linearOut;
    var duration = view.duration;
    var displayDuration = view.displayDuration;
    Object.assign(view, from);
    Laya.Tween.to(view, to, duration, easeIn, Laya.Handler.create(this, function () {
        view.isShow = true;
    }), 0);
    if (displayDuration != -1) {
        Laya.Tween.to(view, exit, duration, easeOut, Laya.Handler.create(this, function () {
            if (view) {
                _popToast(toast, view);
                view._on_hide && view._on_hide(view.toast);
                view.isShow = false;
                view.onHide && view.onHide();
                view.destroy();
            }
        }), displayDuration + duration);
    }
    _pushToast(toast, view);
    if (view.topLevel) {
        uimgr_1.default.addViewTopLayer(view);
    }
    else {
        uimgr_1.default.addViewToMainLayer(view);
    }
}
function hideToast(toast, view) {
    if (view === void 0) { view = null; }
    var list = _popToast(toast, view);
    list.forEach(function (view) {
        view._on_hide && view._on_hide(view.toast);
        view.isShow = false;
        view.onHide && view.onHide();
        view.destroy();
    });
}
exports.default = {
    showToast: showToast,
    hideToast: hideToast,
};


/***/ }),

/***/ "./src/services/display/toastview.ts":
/*!*******************************************!*\
  !*** ./src/services/display/toastview.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var toastmanager_1 = __webpack_require__(/*! ./toastmanager */ "./src/services/display/toastmanager.ts");
var screen_1 = __webpack_require__(/*! ../manager/screen */ "./src/services/manager/screen.ts");
var component_1 = __webpack_require__(/*! ./component */ "./src/services/display/component.ts");
var ToastView = /** @class */ (function (_super) {
    __extends(ToastView, _super);
    function ToastView() {
        var _this = _super.call(this, function () { _this.hide(); }) || this;
        _this.duration = 200;
        _this.displayDuration = 1000;
        _this.easeIn = null;
        _this.easeOut = null;
        _this.fromProps = null;
        _this.toProps = null;
        _this.exitProps = null;
        _this.topLevel = true;
        _this.width = screen_1.default.getDesignWidth();
        _this.height = screen_1.default.getDesignHeight();
        return _this;
    }
    ToastView.show = function (params, onHide) {
        toastmanager_1.default.showToast(this, params, onHide);
    };
    ToastView.hide = function () {
        toastmanager_1.default.hideToast(this);
    };
    ToastView.prototype.hide = function () {
        toastmanager_1.default.hideToast(this.toast, this);
    };
    return ToastView;
}(component_1.default));
exports.default = ToastView;


/***/ }),

/***/ "./src/services/env.ts":
/*!*****************************!*\
  !*** ./src/services/env.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//////////////////////////
/////  Env
//////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var isLayaApp = function () {
    if (typeof window !== "undefined") {
        return window.hasOwnProperty("Laya");
    }
    return false;
};
var isConchApp = function () {
    if (typeof window !== "undefined") {
        return window.hasOwnProperty("conch");
    }
    return false;
};
//////////////////////////
/////  Version
//////////////////////////
var _app_version = "${app_version}";
function getAppVersion() {
    if (typeof _app_version === "string" && _app_version.indexOf('${') === 0) {
        return;
    }
    return _app_version;
}
function setAppVersion(version) {
    _app_version = version;
}
//////////////////////////
/////  Version
//////////////////////////
var _lib_version = "1.1.3.1111.1732";
function getVersion() {
    if (typeof _lib_version === "string" && _lib_version.indexOf('${') === 0) {
        return '1.0.0';
    }
    return _lib_version;
}
//////////////////////////
/////  Debug
//////////////////////////
var _debugOn = '${debug}';
function isDebug() {
    if (typeof _debugOn === "string" && _debugOn.indexOf('${') === 0) {
        return false;
    }
    if (_debugOn == "false" || _debugOn == "0") {
        return false;
    }
    return !!_debugOn;
}
function setDebug(debug) {
    _debugOn = debug;
}
function printDebug(message) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    if (isDebug()) {
        console.log.apply(console, ["[ohosdk]", "[OHOGame]", message].concat(options));
    }
}
function printError(message) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    if (isDebug()) {
        console.error.apply(console, ["[ohosdk]", "[OHOGame]", message].concat(options));
    }
}
//////////////////////////
/////  Env
//////////////////////////
var _env = '${env}';
function setEnv(env) {
    _env = env;
}
function getEnv() {
    if (typeof _env === "string" && _env.indexOf('${') === 0) {
        return;
    }
    return _env;
}
//////////////////////////
/////  getClassName
//////////////////////////
var classNameMap = {};
function getClassName(obj) {
    try {
        if (obj) {
            if (obj.name) {
                return obj.name;
            }
            if (classNameMap[obj]) {
                return classNameMap[obj];
            }
            var str = obj.toString();
            var arr = void 0;
            if (str.charAt(0) == '[') {
                arr = str.match(/\w+\s∗(\w+)\w+\s∗(\w+)/);
            }
            else {
                arr = str.match(/function\s*(\w+)/);
            }
            var name_1 = "";
            if (arr && arr.length == 2) {
                name_1 = arr[1];
            }
            classNameMap[obj] = name_1;
            return name_1;
        }
    }
    catch (e) {
    }
    return undefined;
}
exports.getClassName = getClassName;
exports.default = {
    isLayaApp: isLayaApp,
    isConchApp: isConchApp,
    getVersion: getVersion,
    setAppVersion: setAppVersion,
    getAppVersion: getAppVersion,
    isDebug: isDebug,
    setDebug: setDebug,
    printError: printError,
    printDebug: printDebug,
    getEnv: getEnv,
    setEnv: setEnv
};


/***/ }),

/***/ "./src/services/event.ts":
/*!*******************************!*\
  !*** ./src/services/event.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        var _this = _super.call(this) || this;
        _this._dic = new Laya.Dictionary();
        return _this;
    }
    Event.prototype.registeredEvent = function (type, fun, thisRef, index) {
        if (index === void 0) { index = 1; }
        var arr = [];
        if (index == null)
            index = 1;
        if (this._dic[type]) {
            arr = this._dic[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].fun == fun && arr[i].thisRef == thisRef) {
                    if (index != arr[i].index) {
                        arr[i].index = index;
                        arr.sort(function (a, b) { return b.index - a.index; });
                        this._dic[type] = arr;
                    }
                    return;
                }
            }
        }
        arr.push({ fun: fun, thisRef: thisRef, index: index });
        arr.sort(function (a, b) { return b.index - a.index; });
        this._dic[type] = arr;
    };
    Event.prototype.removeEvent = function (type, fun, thisRef) {
        if (this._dic[type]) {
            var arr = this._dic[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].fun == fun && arr[i].thisRef == thisRef) {
                    arr[i] = null;
                    arr.splice(i, 1);
                    this._dic[type] = arr;
                    return;
                }
            }
        }
    };
    Event.prototype.sendEvent = function (type, args) {
        if (args === void 0) { args = null; }
        if (this._dic[type]) {
            var arr = this._dic[type];
            for (var i = 0; i < arr.length; i++) {
                arr[i].fun.apply(arr[i].thisRef, args);
            }
        }
    };
    return Event;
}(Laya.EventDispatcher));
exports.default = new Event();


/***/ }),

/***/ "./src/services/hook.ts":
/*!******************************!*\
  !*** ./src/services/hook.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _inits = [];
function callHookInit(width, height) {
    var options = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        options[_i - 2] = arguments[_i];
    }
    _inits.forEach(function (callback) { return callback.apply(void 0, [width, height].concat(options)); });
}
exports.callHookInit = callHookInit;
function onInit(callback) {
    if (callback && typeof callback == "function" && _inits.indexOf(callback) < 0) {
        _inits.push(callback);
    }
}
exports.default = {
    onInit: onInit
};


/***/ }),

/***/ "./src/services/init.ts":
/*!******************************!*\
  !*** ./src/services/init.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __webpack_require__(/*! ./env */ "./src/services/env.ts");
var screen_1 = __webpack_require__(/*! ./manager/screen */ "./src/services/manager/screen.ts");
var init_1 = __webpack_require__(/*! ./navigator/init */ "./src/services/navigator/init.ts");
var hook_1 = __webpack_require__(/*! ./hook */ "./src/services/hook.ts");
var _inited = false;
var _transparent = false;
var _adapterInfo = null;
function handleAdapter() {
    try {
        if (_adapterInfo) {
            var stage = Laya.stage;
            stage.width = _adapterInfo.width;
            stage.height = _adapterInfo.height;
            stage.scale(_adapterInfo.scaleX, _adapterInfo.scaleY);
        }
    }
    catch (error) {
    }
}
function setTransparent(transparent) {
    _transparent = transparent;
}
exports.setTransparent = setTransparent;
function setAdapterInfo(adapterInfo) {
    _adapterInfo = adapterInfo;
}
exports.setAdapterInfo = setAdapterInfo;
function init(width, height) {
    var options = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        options[_i - 2] = arguments[_i];
    }
    if (_inited) {
        return;
    }
    if (!env_1.default.isLayaApp()) {
        env_1.default.printError('Please ensure that the \'Laya\' library has been introduced.');
        return;
    }
    screen_1.initScreen.apply(void 0, [false, _transparent, width, height].concat(options));
    hook_1.callHookInit.apply(void 0, [width, height].concat(options));
    handleAdapter();
    _inited = true;
    env_1.default.printDebug("init...");
    env_1.default.printDebug("offest: " + screen_1.default.getOffestX() + ", " + screen_1.default.getOffestY());
    env_1.default.printDebug("app_version: " + env_1.default.getAppVersion());
    env_1.default.printDebug("version: " + env_1.default.getVersion());
    env_1.default.printDebug("debug: " + env_1.default.isDebug());
    env_1.default.printDebug("env: " + env_1.default.getEnv());
}
exports.init = init;
function init3D(width, height) {
    var options = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        options[_i - 2] = arguments[_i];
    }
    if (_inited) {
        return;
    }
    if (!env_1.default.isLayaApp()) {
        env_1.default.printError('Please ensure that the \'Laya\' library has been introduced.');
        return;
    }
    screen_1.initScreen.apply(void 0, [true, _transparent, width, height].concat(options));
    handleAdapter();
    hook_1.callHookInit.apply(void 0, [width, height].concat(options));
    _inited = true;
    env_1.default.printDebug("init3D...");
    env_1.default.printDebug("offest: " + screen_1.default.getOffestX() + ", " + screen_1.default.getOffestY());
    env_1.default.printDebug("app_version: " + env_1.default.getAppVersion());
    env_1.default.printDebug("version: " + env_1.default.getVersion());
    env_1.default.printDebug("debug: " + env_1.default.isDebug());
    env_1.default.printDebug("env: " + env_1.default.getEnv());
}
exports.init3D = init3D;
function start(options, onLoaded, onLoadProgress) {
    if (onLoaded === void 0) { onLoaded = null; }
    if (onLoadProgress === void 0) { onLoadProgress = null; }
    if (!_inited) {
        env_1.default.printError('Please complete the initialization of Tape first.');
        return;
    }
    if (!options) {
        options = {};
    }
    var newOptions = {
        mainPage: options.mainPage || null,
        commonRes: options.commonRes || [],
        fileVersion: options.fileVersion,
        onLoadProgress: function (progress) {
            options.onLoadProgress && options.onLoadProgress(progress);
            onLoadProgress && onLoadProgress(progress);
        },
        onLoaded: function () {
            onLoaded && onLoaded();
            options.onLoaded && options.onLoaded();
        }
    };
    init_1.initNavigator(newOptions);
    init_1.setNavigatorReady();
}
exports.start = start;


/***/ }),

/***/ "./src/services/js.ts":
/*!****************************!*\
  !*** ./src/services/js.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var onload_1 = __webpack_require__(/*! ../utils/onload */ "./src/utils/onload.ts");
function _loadJS(jspath, options, callback) {
    try {
        var _protocol = location.protocol != 'file:' ? location.protocol : 'http:';
        var _script = document.createElement("script");
        Object.keys(options).forEach(function (key) {
            _script.setAttribute(key, options[key]);
        });
        _script.type = "text/javascript";
        if (jspath.indexOf('//') == 0) {
            _script.src = _protocol + jspath;
        }
        else {
            _script.src = jspath;
        }
        document.body.appendChild(_script);
        _script.onerror = function (err) {
            callback && callback(_script, err);
        };
        _script.onload = function () {
            callback && callback(_script, null);
        };
    }
    catch (error) {
        callback && callback(undefined, error);
    }
}
function loadJs(jspath, options) {
    if (options === void 0) { options = {}; }
    return onload_1.onload().then(function () {
        return new Promise(function (resolve) {
            if (!jspath) {
                return resolve && resolve(undefined);
            }
            var index = 0;
            var jsList = jspath.split(',');
            var nodeList = [];
            jsList.forEach(function (js) {
                _loadJS(js, options, function (node, err) {
                    nodeList[index] = { node: node, err: err };
                    index++;
                    if (index == jsList.length) {
                        resolve && resolve(nodeList);
                    }
                });
            });
        });
    });
}
exports.default = {
    loadJs: loadJs
};


/***/ }),

/***/ "./src/services/manager/bg.ts":
/*!************************************!*\
  !*** ./src/services/manager/bg.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var screen_1 = __webpack_require__(/*! ./screen */ "./src/services/manager/screen.ts");
var _bgSprite = null;
var _bgImage = null;
var _bgSkin = null;
var _bgSizeGrid = null;
var _inited = false;
function _checkInit() {
    if (!_inited) {
        _inited = true;
        _bgSprite = new Laya.Sprite;
        _bgSprite.name = '_tape_bg_layer';
        _bgImage = new Laya.Image;
        _bgImage.name = '_bg_image';
        Laya.stage.addChild(_bgSprite);
        Laya.stage.addChild(_bgImage);
        Laya.stage.on(Laya.Event.RESIZE, null, function () {
            _resizeBg();
        });
    }
    _resizeBg();
}
function _drawSkin() {
    if (_bgImage) {
        if (_bgSkin) {
            _bgImage.skin = _bgSkin;
        }
        if (_bgSizeGrid) {
            _bgImage.sizeGrid = _bgSizeGrid;
        }
        else {
            _bgImage.sizeGrid = '';
        }
    }
}
function _resizeBg() {
    if (_bgSprite) {
        _bgSprite.width = screen_1.default.getWidth();
        _bgSprite.height = screen_1.default.getHeight();
    }
    if (_bgImage) {
        _bgImage.width = screen_1.default.getWidth();
        _bgImage.height = screen_1.default.getHeight();
    }
}
function initBg() {
    _checkInit();
    _drawSkin();
}
exports.initBg = initBg;
function setBgColor(color) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, color);
}
function setBgSkin(url, sizeGrid) {
    if (sizeGrid === void 0) { sizeGrid = null; }
    _bgSkin = url;
    _bgSizeGrid = sizeGrid;
    _drawSkin();
}
function setBgTexture(url) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    Laya.loader.load(url, Laya.Handler.create(this, function (texture) {
        try {
            _bgSprite.graphics.fillTexture(texture, 0, 0, _bgSprite.width, _bgSprite.height, 'repeat');
        }
        catch (error) {
        }
    }));
}
function getBgSprite() {
    return _bgSprite;
}
exports.default = {
    setBgSkin: setBgSkin,
    setBgColor: setBgColor,
    setBgTexture: setBgTexture,
    getBgSprite: getBgSprite,
};


/***/ }),

/***/ "./src/services/manager/eft.ts":
/*!*************************************!*\
  !*** ./src/services/manager/eft.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _dic = new Laya.Dictionary();
var _mcpool = new Laya.Dictionary();
var _inst = {};
function onLoadComplet(path, mc, play, loop, loadComplet, thisRef) {
    var arr = _dic[path].arr;
    for (var i = 0; i < arr.length; i++) {
        arr[i][0]["_url"] = path;
        arr[i][0]["_atlasPath"] = path.split(".swf")[0] + ".json";
        arr[i][0]["_onLoaded"]();
        if (arr[i][1])
            arr[i][0].play(0, arr[i][2]);
        else
            arr[i][0].stop();
        if (arr[i][3]) {
            arr[i][3].apply(arr[i][4], [arr[i][0]]);
        }
    }
    if (play) {
        mc.play(0, loop);
    }
    else {
        mc.stop();
    }
    if (loadComplet) {
        loadComplet.apply(thisRef, [mc]);
    }
    _dic[path].arr = [];
    mc.off(Laya.Event.LOADED, _inst, onLoadComplet);
    _dic[path].load = true;
}
function remove(mc) {
    if (!mc) {
        return;
    }
    mc.scaleX = mc.scaleY = 1;
    mc.pivotX = mc.pivotY = 0;
    mc["anchorX"] = mc["anchorY"] = 0;
    mc.alpha = 1;
    Laya.Tween.clearAll(mc);
    mc.stop();
    if (mc.parent)
        mc.parent.removeChild(mc);
    _mcpool[mc["path"]].push(mc);
}
function create(path, play, loop, loadComplet, thisRef) {
    if (play === void 0) { play = true; }
    if (loop === void 0) { loop = true; }
    if (loadComplet === void 0) { loadComplet = null; }
    if (thisRef === void 0) { thisRef = null; }
    var mc;
    if (!_mcpool[path])
        _mcpool[path] = [];
    if (_mcpool[path].length > 0) {
        mc = _mcpool[path].shift();
    }
    else {
        mc = new Laya.MovieClip();
    }
    mc["path"] = path;
    if (_dic[path]) {
        if (_dic[path].load) {
            mc["_url"] = path;
            mc["_atlasPath"] = path.split(".swf")[0] + ".json";
            mc["_onLoaded"]();
            if (play)
                mc.play(0, loop);
            else
                mc.stop();
            if (loadComplet)
                loadComplet.apply(thisRef, [mc]);
        }
        else {
            _dic[path].arr.push([mc, play, loop, loadComplet, thisRef]);
        }
    }
    else {
        _dic[path] = { load: false, arr: [] };
        mc.on(Laya.Event.LOADED, _inst, onLoadComplet, [path, mc, play, loop, loadComplet, thisRef]);
        mc.load(path, true);
    }
    return mc;
}
exports.default = {
    create: create,
    remove: remove
};


/***/ }),

/***/ "./src/services/manager/screen.ts":
/*!****************************************!*\
  !*** ./src/services/manager/screen.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bg_1 = __webpack_require__(/*! ./bg */ "./src/services/manager/bg.ts");
var uimgr_1 = __webpack_require__(/*! ./uimgr */ "./src/services/manager/uimgr.ts");
var _padding_left = 0;
var _padding_right = 0;
var _padding_top = 0;
var _padding_bottom = 0;
var _design_width = 0;
var _design_height = 0;
var _deviation = 0;
var _autoAdaption = true;
var _autoDirection = false;
function size() {
    var paddingWidth = _padding_left + _padding_right;
    var paddingHeight = _padding_top + _padding_bottom;
    var clientWidth = window.innerWidth || laya.utils.Browser.clientWidth;
    var clientHeight = window.innerHeight || laya.utils.Browser.clientHeight;
    var initWidth = _design_width;
    var initHeight = _design_height;
    var screenRatio = 1;
    var initRatio = 1;
    if (!_autoDirection) {
        screenRatio = clientHeight / clientWidth;
        initRatio = initHeight / initWidth;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = initWidth * screenRatio;
            }
            else if (screenRatio < initRatio) {
                initWidth = initHeight / screenRatio;
            }
        }
    }
    else if (initWidth < initHeight && clientWidth < clientHeight) { // 页面和游戏都是竖屏
        screenRatio = clientHeight / clientWidth;
        initRatio = initHeight / initWidth;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = initWidth * screenRatio;
            }
            else if (screenRatio < initRatio) {
                initWidth = initHeight / screenRatio;
            }
        }
    }
    else if (initWidth < initHeight && clientWidth >= clientHeight) { // 页面横屏，游戏竖屏
        screenRatio = clientHeight / clientWidth;
        initRatio = initWidth / initHeight;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initWidth = initHeight * screenRatio;
            }
            else if (screenRatio < initRatio) {
                initHeight = initWidth / screenRatio;
            }
        }
    }
    else if (initWidth >= initHeight && clientWidth >= clientHeight) { // 页面和游戏都是横屏
        screenRatio = clientHeight / clientWidth;
        initRatio = initHeight / initWidth;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initHeight = initWidth * screenRatio;
            }
            else if (screenRatio < initRatio) {
                initWidth = initHeight / screenRatio;
            }
        }
    }
    else if (initWidth >= initHeight && clientWidth < clientHeight) { // 页面竖屏，游戏横屏
        screenRatio = clientHeight / clientWidth;
        initRatio = initWidth / initHeight;
        if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
            if (screenRatio > initRatio) {
                initWidth = initHeight * screenRatio;
            }
            else if (screenRatio < initRatio) {
                initHeight = initWidth / screenRatio;
            }
        }
    }
    return {
        initHeight: initHeight + paddingWidth,
        initWidth: initWidth + paddingHeight
    };
}
function initScreen(is3D, isAlpha, width, height) {
    var options = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        options[_i - 4] = arguments[_i];
    }
    _design_width = width;
    _design_height = height;
    if (_autoAdaption) {
        var _a = size(), initHeight = _a.initHeight, initWidth = _a.initWidth;
        if (is3D) {
            if (isAlpha) {
                Config.isAlpha = true;
            }
            Laya3D.init.apply(this, [initWidth, initHeight].concat(options));
        }
        else {
            Laya.init.apply(this, [initWidth, initHeight].concat(options));
        }
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        if (_autoDirection) {
            if (initWidth > initHeight) {
                Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
            }
            else {
                Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            }
        }
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        if (isAlpha) {
            Laya.stage.bgColor = "none";
            Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        }
    }
    else {
        if (is3D) {
            Laya3D.init.apply(this, [width, height].concat(options));
        }
        else {
            Laya.init.apply(this, [width, height].concat(options));
        }
    }
    bg_1.initBg();
    uimgr_1.initUI();
}
exports.initScreen = initScreen;
function getWidth() {
    return Laya.stage.width;
}
function getHeight() {
    return Laya.stage.height;
}
function getContentWidth() {
    return getWidth() - _padding_left - _padding_right;
}
function getContentHeight() {
    return getHeight() - _padding_top - _padding_bottom;
}
function setPaddingLeft(padding) {
    _padding_left = padding;
}
function getPaddingLeft() {
    return _padding_left;
}
function setPaddingRight(padding) {
    _padding_right = padding;
}
function getPaddingRight() {
    return _padding_right;
}
function setPaddingTop(padding) {
    _padding_top = padding;
}
function getPaddingTop() {
    return _padding_top;
}
function setPaddingBottom(padding) {
    _padding_bottom = padding;
}
function getPaddingBottom() {
    return _padding_bottom;
}
function getDesignWidth() {
    return _design_width;
}
function getDesignHeight() {
    return _design_height;
}
function getScale() {
    var width = getContentWidth();
    var height = getContentHeight();
    var designWidth = getDesignWidth();
    var designHeight = getDesignHeight();
    return Math.min(width / designWidth, height / designHeight);
}
function getOffestX() {
    if (!_autoAdaption) {
        return _padding_left;
    }
    var scale = getScale();
    var width = getContentWidth();
    return (width - _design_width * scale) / 2 + _padding_left;
}
function getOffestY() {
    if (!_autoAdaption) {
        return _padding_top;
    }
    var scale = getScale();
    var height = getContentHeight();
    return (height - _design_height * scale) / 2 + _padding_top;
}
function setDeviation(deviation) {
    _deviation = deviation;
}
function setAutoDirection(auto) {
    _autoDirection = auto;
}
function setAutoAdaption(adaption) {
    _autoAdaption = adaption;
}
exports.default = {
    getWidth: getWidth,
    getHeight: getHeight,
    getScale: getScale,
    getOffestX: getOffestX,
    getOffestY: getOffestY,
    getContentWidth: getContentWidth,
    getContentHeight: getContentHeight,
    getDesignWidth: getDesignWidth,
    getDesignHeight: getDesignHeight,
    setDeviation: setDeviation,
    setPaddingLeft: setPaddingLeft,
    getPaddingLeft: getPaddingLeft,
    setPaddingRight: setPaddingRight,
    getPaddingRight: getPaddingRight,
    setPaddingTop: setPaddingTop,
    getPaddingTop: getPaddingTop,
    setPaddingBottom: setPaddingBottom,
    getPaddingBottom: getPaddingBottom,
    setAutoDirection: setAutoDirection,
    setAutoAdaption: setAutoAdaption,
};


/***/ }),

/***/ "./src/services/manager/uimgr.ts":
/*!***************************************!*\
  !*** ./src/services/manager/uimgr.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = __webpack_require__(/*! ../navigator/stack */ "./src/services/navigator/stack.ts");
var loader_1 = __webpack_require__(/*! ../navigator/loader */ "./src/services/navigator/loader.ts");
var screen_1 = __webpack_require__(/*! ./screen */ "./src/services/manager/screen.ts");
var _inited = false;
var _uiManager;
var _mainUILayer;
var _topUILayer;
function _checkInit() {
    if (!_inited) {
        _inited = true;
        _uiManager = new Laya.Sprite();
        _uiManager.mouseThrough = true;
        _uiManager.name = '_tape_stage';
        _mainUILayer = new Laya.Sprite();
        _mainUILayer.name = '_tape_main_layer';
        _mainUILayer.mouseThrough = true;
        _topUILayer = new Laya.Sprite();
        _topUILayer.name = '_tape_top_layer';
        _topUILayer.mouseThrough = true;
        _uiManager.addChild(_mainUILayer);
        _uiManager.addChild(_topUILayer);
        Laya.stage.addChild(_uiManager);
        Laya.stage.on(Laya.Event.RESIZE, null, function () {
            _resizeUI();
        });
    }
    _resizeUI();
}
function _resizeUI() {
    if (_mainUILayer) {
        _mainUILayer.width = screen_1.default.getDesignWidth();
        _mainUILayer.height = screen_1.default.getDesignHeight();
        _mainUILayer.x = screen_1.default.getOffestX();
        _mainUILayer.y = screen_1.default.getOffestY();
    }
    if (_topUILayer) {
        _topUILayer.width = screen_1.default.getDesignWidth();
        _topUILayer.height = screen_1.default.getDesignHeight();
        _topUILayer.x = screen_1.default.getOffestX();
        _topUILayer.y = screen_1.default.getOffestY();
    }
    _uiManager.scaleX = screen_1.default.getScale();
    _uiManager.scaleY = screen_1.default.getScale();
}
function initUI() {
    _checkInit();
}
exports.initUI = initUI;
function checkFocus() {
    if (_mainUILayer.numChildren > 0) {
        var last = _mainUILayer.getChildAt(_mainUILayer.numChildren - 1);
        if (last instanceof loader_1.default) {
            stack_1.setFocus(true);
            return;
        }
    }
    stack_1.setFocus(false);
}
function moveTopToMainLayer(view) {
    _checkInit();
    if (view && view.parent == _mainUILayer) {
        _mainUILayer.removeChild(view);
        _mainUILayer.addChild(view);
    }
    checkFocus();
}
function addViewToMainLayer(view) {
    _checkInit();
    view && _mainUILayer.addChild(view);
    checkFocus();
}
function addViewTopLayer(view) {
    _checkInit();
    view && _topUILayer.addChild(view);
    checkFocus();
}
exports.default = {
    checkFocus: checkFocus,
    moveTopToMainLayer: moveTopToMainLayer,
    addViewToMainLayer: addViewToMainLayer,
    addViewTopLayer: addViewTopLayer,
};


/***/ }),

/***/ "./src/services/message.ts":
/*!*********************************!*\
  !*** ./src/services/message.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __webpack_require__(/*! ./env */ "./src/services/env.ts");
var any_1 = __webpack_require__(/*! ../utils/any */ "./src/utils/any.ts");
var _listeners = [];
function onMessage(callback) {
    if (callback && typeof callback == "function" && _listeners.indexOf(callback) < 0) {
        _listeners.push(callback);
    }
}
function postMessage(data) {
    if (data === void 0) { data = {}; }
    if (env_1.default.isConchApp()) {
        Laya.conchMarket.sendMessageToPlatform(any_1.toAny(data, "{}"), function (resp) {
            env_1.default.printDebug("conch message callback: ", resp);
        });
    }
    else {
        window.parent.postMessage(any_1.toAny(data, {}), '*');
    }
}
function _initMessage() {
    var name = "__dispatchMessage__";
    if (typeof window !== "undefined") {
        window[name] = function (data) {
            if (data) {
                _listeners.forEach(function (callback) { return callback(any_1.toAny(data, {})); });
            }
        };
    }
    window.addEventListener("message", function (msg) {
        if (msg && msg.data) {
            _listeners.forEach(function (callback) { return callback(any_1.toAny(msg.data, {})); });
        }
    });
}
(function () {
    _initMessage();
})();
exports.default = {
    postMessage: postMessage,
    onMessage: onMessage
};


/***/ }),

/***/ "./src/services/navigator/init.ts":
/*!****************************************!*\
  !*** ./src/services/navigator/init.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = __webpack_require__(/*! ./stack */ "./src/services/navigator/stack.ts");
var _options = null;
var _inited = false;
var _isReady = false;
var _readyResolve = null;
var _readyPromise = new Promise(function (resolve) {
    _readyResolve = resolve;
});
function _enableResourceVersion() {
    if (_options && _options.fileVersion) {
        Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        Laya.ResourceVersion.enable(_options.fileVersion, Laya.Handler.create(null, function () {
            _beginLoadStaticRes();
        }));
    }
    else {
        _beginLoadStaticRes();
    }
}
function _beginLoadStaticRes() {
    var res = _options.commonRes || [];
    if (res.length > 0) {
        Laya.loader.load(res, Laya.Handler.create(null, function () {
            _onStaticResLoaded();
            _options.onLoaded && _options.onLoaded();
        }), Laya.Handler.create(this, function (progress) {
            _options.onLoadProgress && _options.onLoadProgress(progress);
        }, null, false));
    }
    else {
        _options.onLoadProgress && _options.onLoadProgress(100);
        _options.onLoaded && _options.onLoaded();
        _onStaticResLoaded();
    }
}
function _onStaticResLoaded() {
    _options.mainPage && stack_1.default.navigate(_options.mainPage);
}
function initNavigator(options) {
    if (!options || _inited) {
        return;
    }
    _options = options;
    _enableResourceVersion();
    _inited = true;
}
exports.initNavigator = initNavigator;
function onNavigatorReady() {
    if (_isReady) {
        return Promise.resolve();
    }
    return _readyPromise;
}
exports.onNavigatorReady = onNavigatorReady;
function setNavigatorReady() {
    if (_isReady) {
        return;
    }
    _isReady = true;
    _readyResolve();
    _readyResolve = null;
    _readyPromise = null;
}
exports.setNavigatorReady = setNavigatorReady;


/***/ }),

/***/ "./src/services/navigator/loader.ts":
/*!******************************************!*\
  !*** ./src/services/navigator/loader.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var uimgr_1 = __webpack_require__(/*! ../manager/uimgr */ "./src/services/manager/uimgr.ts");
var env_1 = __webpack_require__(/*! ../env */ "./src/services/env.ts");
var init_1 = __webpack_require__(/*! ./init */ "./src/services/navigator/init.ts");
var json_1 = __webpack_require__(/*! ../../utils/json */ "./src/utils/json.ts");
var _indexID = 1;
function genID(obj) {
    var name = env_1.getClassName(obj) || "Activity";
    return name + "$" + _indexID++;
}
function getRes(unpackFile, res) {
    if (unpackFile) {
        return json_1.loadJson(unpackFile, true).catch(function () {
            return [];
        }).then(function (data) {
            return res.concat(data.map(function (item) {
                return {
                    url: item,
                    tyep: Laya.Loader.IMAGE
                };
            }));
        });
    }
    return Promise.resolve(res);
}
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(options) {
        var _this = _super.call(this) || this;
        _this._options = null;
        _this._activity = null;
        _this._isShow = false;
        _this._isFocus = false;
        _this._pageName = "";
        _this.visible = false;
        _this._options = options;
        _this._pageName = genID(_this._options.page);
        env_1.default.printDebug("init", _this._getPageName());
        getRes(_this._options.page.unpackFile, _this._options.page.res || []).catch(function () {
            return [];
        }).then(function (res) {
            if (res && res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(_this, function () {
                    _this._newActivity();
                    setTimeout(function () { _this._onLoaded(); }, 100);
                    env_1.default.printDebug("onLoaded", _this._getPageName());
                }), Laya.Handler.create(_this, function (progress) {
                    env_1.default.printDebug("onLoadProgress", _this._getPageName(), progress);
                    _this._onLoadProgress(progress);
                }, null, false));
            }
            else {
                _this._newActivity();
                _this._onLoaded();
                env_1.default.printDebug("onLoaded", _this._getPageName());
                env_1.default.printDebug("onLoadProgress", _this._getPageName(), 1);
            }
        });
        return _this;
    }
    default_1.prototype._getPageName = function () {
        return this._pageName;
    };
    default_1.prototype._newActivity = function () {
        if (this._activity) {
            return;
        }
        this._activity = new this._options.page({
            page: this._options.page,
            params: this._options.params
        });
        this._activity["_ID"] = this._pageName;
        env_1.default.printDebug("newActivity", this._getPageName());
    };
    default_1.prototype._onLoaded = function () {
        var _this = this;
        init_1.onNavigatorReady().then(function () {
            _this._options.onLoaded && _this._options.onLoaded(_this);
            _this.addChild(_this._activity);
            env_1.default.printDebug("onCreate", _this._getPageName());
            _this._activity.onCreate && _this._activity.onCreate();
            _this._options.onShow && _this._options.onShow();
        });
    };
    default_1.prototype._onLoadProgress = function (progress) {
        this._options.onLoadProgress && this._options.onLoadProgress(this, progress);
    };
    default_1.prototype.nextProgress = function (progress) {
        this._activity.onNextProgress && this._activity.onNextProgress(progress);
    };
    default_1.prototype.filter = function (page, activity) {
        if (page === this._options.page) {
            return !activity || activity === this._activity;
        }
        return false;
    };
    default_1.prototype.show = function (anim, callback) {
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
        if (anim && duration > 0) {
            Object.assign(this, fromProps);
            env_1.default.printDebug("onResume", this._getPageName());
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            Laya.Tween.to(this, toProps, duration, easeIn, Laya.Handler.create(this, function () {
                callback && callback();
            }));
        }
        else {
            env_1.default.printDebug("onResume", this._getPageName());
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            callback && callback();
        }
        uimgr_1.default.checkFocus();
    };
    default_1.prototype.hide = function (anim, callback) {
        var _this = this;
        if (!this.visible) {
            return;
        }
        if (!this._isShow) {
            return;
        }
        this._isShow = false;
        var easeOut = this._activity.easeOut || Laya.Ease.linearIn;
        var duration = this._activity.duration || 0;
        var fromProps = this._activity.toProps || {};
        var toProps = this._activity.exitProps || {};
        if (anim && duration > 0) {
            Object.assign(this, fromProps);
            env_1.default.printDebug("onPause", this._getPageName());
            this._activity.onPause && this._activity.onPause();
            Laya.Tween.to(this, toProps, duration, easeOut, Laya.Handler.create(this, function () {
                _this.visible = true;
                callback && callback();
            }));
        }
        else {
            env_1.default.printDebug("onPause", this._getPageName());
            this._activity.onPause && this._activity.onPause();
            this.visible = false;
            callback && callback();
        }
        this.focus(false);
    };
    default_1.prototype.exit = function () {
        env_1.default.printDebug("onDestroy", this._getPageName());
        this._activity.onDestroy && this._activity.onDestroy();
        this.destroy();
    };
    default_1.prototype.focus = function (focus) {
        if (this._isFocus === focus) {
            return;
        }
        this._isFocus = focus;
        env_1.default.printDebug("onFocus", this._getPageName(), focus);
        this._activity.onFocus && this._activity.onFocus(focus);
    };
    return default_1;
}(Laya.Component));
exports.default = default_1;


/***/ }),

/***/ "./src/services/navigator/stack.ts":
/*!*****************************************!*\
  !*** ./src/services/navigator/stack.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var loader_1 = __webpack_require__(/*! ./loader */ "./src/services/navigator/loader.ts");
var uimgr_1 = __webpack_require__(/*! ../manager/uimgr */ "./src/services/manager/uimgr.ts");
var _loaders = [];
function _all() {
    return _loaders;
}
function _length() {
    return _loaders.length;
}
function _getStack(index) {
    if (index === void 0) { index = 0; }
    var len = _length();
    return len > index ? _loaders[len - 1 - index] : null;
}
function _showStack(index, anim, callback) {
    if (index === void 0) { index = 0; }
    if (anim === void 0) { anim = false; }
    if (callback === void 0) { callback = null; }
    var stack = _getStack(index);
    if (!stack) {
        return;
    }
    stack.show(anim && _length() > 1, callback);
}
function _pushStack(stack) {
    _loaders.push(stack);
}
function _topStack(stack) {
    var index = _loaders.indexOf(stack);
    if (index >= 0) {
        _loaders.splice(index, 1);
        _loaders.push(stack);
        _refreshStack(null);
        uimgr_1.default.moveTopToMainLayer(stack);
    }
}
function _refreshStack(callback) {
    _showStack(0, true, function () {
        var stack = _getStack(1);
        if (!stack) {
            return;
        }
        stack.hide();
        callback && callback();
    });
}
function _finishStack(stacks) {
    if (!stacks || stacks.length <= 0) {
        return;
    }
    for (var i = 0; _length() > 1 && i < stacks.length; i++) {
        var stack = stacks[i];
        _loaders.splice(_loaders.indexOf(stack), 1);
        stack.hide(true, function () {
            stack.exit();
        });
    }
    _showStack(0);
}
function _popStack(count) {
    if (count >= _length()) {
        count = _length() - 1;
    }
    if (count <= 0) {
        return;
    }
    var pops = _loaders.splice(_length() - count, count);
    pops.forEach(function (stack) {
        stack.hide(true, function () {
            stack.exit();
        });
    });
    _showStack(0);
}
function setFocus(focus) {
    var stack = _getStack();
    if (stack) {
        stack.focus(focus);
    }
}
exports.setFocus = setFocus;
function navigate(page, params, action, single) {
    if (params === void 0) { params = null; }
    if (action === void 0) { action = null; }
    if (single === void 0) { single = false; }
    if (!params) {
        params = {};
    }
    var open = function () {
        new loader_1.default({
            page: page,
            params: params,
            onShow: function () {
                _refreshStack(function () {
                    action && action(true);
                });
            },
            onLoaded: function (loader) {
                uimgr_1.default.addViewToMainLayer(loader);
                _pushStack(loader);
            },
            onLoadProgress: function (loader, progress) {
                var stack = _getStack();
                stack && stack.nextProgress(progress);
            }
        });
    };
    if (single || page.single) {
        var stacks = [];
        _all().forEach(function (stack) {
            if (stack.filter(page)) {
                stacks.push(stack);
            }
        });
        stacks.length > 0 ? _topStack(stacks.pop()) : open();
    }
    else {
        open();
    }
}
function popToTop() {
    _popStack(_length());
}
function pop(number) {
    if (number === void 0) { number = 1; }
    _popStack(number);
}
function finish(page, instance) {
    if (instance === void 0) { instance = null; }
    var stacks = [];
    _all().forEach(function (stack) {
        if (stack.filter(page, instance)) {
            stacks.push(stack);
        }
    });
    _finishStack(stacks);
}
exports.default = {
    navigate: navigate,
    pop: pop,
    popToTop: popToTop,
    finish: finish,
};


/***/ }),

/***/ "./src/services/pipeline.ts":
/*!**********************************!*\
  !*** ./src/services/pipeline.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __webpack_require__(/*! ./env */ "./src/services/env.ts");
var _pipeline_map = {};
function _check(type) {
    if (_pipeline_map[type]) {
        var pipe = _pipeline_map[type];
        if (pipe.funcs.length <= 0) {
            return;
        }
        if (pipe.padding) {
            setTimeout(function () {
                _check(type);
            }, 500);
            return;
        }
        var func = pipe.funcs.shift();
        func && func();
        pipe.padding = true;
        _check(type);
    }
}
function put(type, func) {
    if (type && typeof func === "function") {
        env_1.default.printDebug("put pipe to : ", type);
        if (_pipeline_map[type]) {
            _pipeline_map[type].funcs.push(func);
        }
        else {
            _pipeline_map[type] = { padding: false, funcs: [func] };
        }
        _check(type);
    }
}
function next(type) {
    if (_pipeline_map[type]) {
        env_1.default.printDebug("next pipe as : ", type);
        _pipeline_map[type].padding = false;
        _check(type);
    }
}
exports.default = {
    put: put,
    next: next,
};


/***/ }),

/***/ "./src/services/runtime.ts":
/*!*********************************!*\
  !*** ./src/services/runtime.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var runtime;
(function (runtime) {
    runtime.clickSound = null;
    runtime.clickAnimDuration = 100;
    runtime.clickNormalProps = { scaleX: 1, scaleY: 1 };
    runtime.clickDownProps = { scaleX: 1.2, scaleY: 1.2 };
    function pivotCenter(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }
    function setViewProps(view, props, duration) {
        pivotCenter(view);
        Laya.Tween.to(view, props, duration);
    }
    function playClickSound(sound) {
        if (sound) {
            sound != 'none' && Laya.SoundManager.playSound(sound, 1);
        }
        else if (runtime.clickSound) {
            runtime.clickSound != 'none' && Laya.SoundManager.playSound(runtime.clickSound, 1);
        }
    }
    function bindClick(view, onClick, onDown, onUp, onOut) {
        pivotCenter(view);
        view.offAll();
        view.on(Laya.Event.CLICK, view, function () {
            onClick && onClick();
            playClickSound(view.clickSound);
        });
        view.on(Laya.Event.MOUSE_DOWN, view, function () {
            setViewProps(view, view.clickDownProps || runtime.clickDownProps, view.clickAnimDuration || runtime.clickAnimDuration);
            onDown && onDown();
        });
        view.on(Laya.Event.MOUSE_UP, view, function () {
            setViewProps(view, view.clickNormalProps || runtime.clickNormalProps, view.clickAnimDuration || runtime.clickAnimDuration);
            onUp && onUp();
        });
        view.on(Laya.Event.MOUSE_OUT, view, function () {
            setViewProps(view, view.clickNormalProps || runtime.clickNormalProps, view.clickAnimDuration || runtime.clickAnimDuration);
            onOut && onOut();
        });
    }
    runtime.bindClick = bindClick;
    var btn = /** @class */ (function (_super) {
        __extends(btn, _super);
        function btn() {
            var _this = _super.call(this) || this;
            _this.clickAnimDuration = null;
            _this.clickDownProps = null;
            _this.clickNormalProps = null;
            _this.clickSound = null;
            bindClick(_this);
            return _this;
        }
        return btn;
    }(Laya.Button));
    runtime.btn = btn;
    var btn_img = /** @class */ (function (_super) {
        __extends(btn_img, _super);
        function btn_img() {
            var _this = _super.call(this) || this;
            _this.clickAnimDuration = null;
            _this.clickDownProps = null;
            _this.clickNormalProps = null;
            _this.clickSound = null;
            bindClick(_this);
            return _this;
        }
        return btn_img;
    }(Laya.Image));
    runtime.btn_img = btn_img;
    var btn_label = /** @class */ (function (_super) {
        __extends(btn_label, _super);
        function btn_label() {
            var _this = _super.call(this) || this;
            _this.clickAnimDuration = null;
            _this.clickDownProps = null;
            _this.clickNormalProps = null;
            _this.clickSound = null;
            bindClick(_this);
            return _this;
        }
        return btn_label;
    }(Laya.Label));
    runtime.btn_label = btn_label;
    var btn_sprite = /** @class */ (function (_super) {
        __extends(btn_sprite, _super);
        function btn_sprite() {
            var _this = _super.call(this) || this;
            _this.clickAnimDuration = null;
            _this.clickDownProps = null;
            _this.clickNormalProps = null;
            _this.clickSound = null;
            bindClick(_this);
            return _this;
        }
        return btn_sprite;
    }(Laya.Sprite));
    runtime.btn_sprite = btn_sprite;
    var btn_box = /** @class */ (function (_super) {
        __extends(btn_box, _super);
        function btn_box() {
            var _this = _super.call(this) || this;
            _this.clickAnimDuration = null;
            _this.clickDownProps = null;
            _this.clickNormalProps = null;
            _this.clickSound = null;
            bindClick(_this);
            return _this;
        }
        return btn_box;
    }(Laya.Box));
    runtime.btn_box = btn_box;
    var page_list = /** @class */ (function (_super) {
        __extends(page_list, _super);
        function page_list() {
            var _this = _super.call(this) || this;
            _this._isDown = false;
            _this._onLoadMoreHandler = null;
            _this._loading = false;
            _this._preCount = 5;
            _this.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.onMouseOut);
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
            _this.renderHandler = Laya.Handler.create(_this, _this.renderItem);
            return _this;
        }
        page_list.prototype.destroy = function () {
            this.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
        };
        page_list.prototype.refresh = function () {
            _super.prototype.refresh.call(this);
            this._updatePage();
        };
        page_list.prototype.onMouseDown = function () {
            this._isDown = true;
        };
        page_list.prototype.onMouseUp = function (event) {
            this._updatePage();
            this._isDown = false;
        };
        page_list.prototype.onMouseOut = function (event) {
            this._updatePage();
            this._isDown = false;
        };
        Object.defineProperty(page_list.prototype, "preCount", {
            get: function () {
                return this._preCount;
            },
            set: function (count) {
                this._preCount = count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(page_list.prototype, "loading", {
            get: function () {
                return this._loading;
            },
            set: function (loading) {
                this._loading = loading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(page_list.prototype, "onLoadMoreHandler", {
            get: function () {
                return this._onLoadMoreHandler;
            },
            set: function (handler) {
                this._onLoadMoreHandler = handler;
            },
            enumerable: true,
            configurable: true
        });
        page_list.prototype._updatePage = function () {
            if (!this._isDown) {
                return;
            }
            var length = this._array.length;
            var maxHeight = length * this._cellSize;
            var currentPos = this._cellOffset + this.scrollBar.value + this.height;
            var lastCount = Math.floor((maxHeight - currentPos) / this._cellSize);
            if (lastCount < 0) {
                lastCount = 0;
            }
            if (!this._loading && this.preCount >= lastCount) {
                this._onLoadMoreHandler && this._onLoadMoreHandler(lastCount);
            }
        };
        return page_list;
    }(Laya.List));
    runtime.page_list = page_list;
    var page_view = /** @class */ (function (_super) {
        __extends(page_view, _super);
        function page_view() {
            var _this = _super.call(this) || this;
            _this._isDown = false;
            _this._currentPage = 0;
            _this._onPageChange = null;
            _this.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.onMouseOut);
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
            _this.renderHandler = Laya.Handler.create(_this, _this.renderItem);
            return _this;
        }
        page_view.prototype.destroy = function () {
            this.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
        };
        Object.defineProperty(page_view.prototype, "pageId", {
            get: function () {
                return this._currentPage;
            },
            set: function (n) {
                this._currentPage = n;
                if (this._currentPage < 0) {
                    this._currentPage = 0;
                }
                this.tweenTo(n);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(page_view.prototype, "onPageChangeHandler", {
            get: function () {
                return this._onPageChange;
            },
            set: function (handler) {
                this._onPageChange = handler;
            },
            enumerable: true,
            configurable: true
        });
        page_view.prototype.onMouseDown = function () {
            this._isDown = true;
        };
        page_view.prototype.onMouseUp = function (event) {
            this._updatePage();
            this._isDown = false;
        };
        page_view.prototype.onMouseOut = function (event) {
            this._updatePage();
            this._isDown = false;
        };
        page_view.prototype._updatePage = function () {
            if (!this._isDown) {
                return;
            }
            this.scrollBar.stopScroll();
            var total = this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage;
            if (total > 1) {
                var changeSize = this._cellSize / 6;
                var sss = this._currentPage * this._cellSize;
                if (Math.abs(this.scrollBar.value - sss) > changeSize) {
                    if (this.scrollBar.value > sss) {
                        this._currentPage++;
                    }
                    else {
                        this._currentPage--;
                    }
                }
                if (this._currentPage > total) {
                    this._currentPage = total + 1;
                }
                if (this._currentPage < 0) {
                    this._currentPage = 0;
                }
            }
            this.tweenTo(this._currentPage);
            if (this._onPageChange) {
                this._onPageChange(this._currentPage);
            }
        };
        return page_view;
    }(Laya.List));
    runtime.page_view = page_view;
})(runtime || (runtime = {}));
exports.default = runtime;


/***/ }),

/***/ "./src/services/speaker/_chancel.ts":
/*!******************************************!*\
  !*** ./src/services/speaker/_chancel.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _peaks_1 = __webpack_require__(/*! ./_peaks */ "./src/services/speaker/_peaks.ts");
var _loadres_1 = __webpack_require__(/*! ./_loadres */ "./src/services/speaker/_loadres.ts");
var FixAudioContext = AudioContext || webkitAudioContext
    || mozAudioContext || msAudioContext;
var _CHANCELS = [];
var SpeakerChancel = /** @class */ (function () {
    function SpeakerChancel(url, onError, options) {
        if (options === void 0) { options = {}; }
        this._audioUrl = url;
        this._onErrorCallback = onError;
        this._options = options;
        this.amplitudeThreshold = 0.02;
        this.audioCtx = new FixAudioContext({
            sampleRate: this._options && this._options.sampleRate || 44100
        });
        this.sourceNode = this.audioCtx.createBufferSource();
        this.analyserNode = this.audioCtx.createAnalyser();
        this.analyserNode.fftSize = this._options && this._options.fftSize || 2048;
        this.windowSize = this.analyserNode.frequencyBinCount;
        this.gaussianFilters = _peaks_1.default.generateGaussianFilter(7, 5);
        this.sourceNode.disconnect();
        this.sourceNode.connect(this.analyserNode);
    }
    Object.defineProperty(SpeakerChancel.prototype, "url", {
        get: function () {
            return this._audioUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpeakerChancel.prototype, "position", {
        get: function () {
            return this.audioCtx && this.audioCtx.currentTime || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpeakerChancel.prototype, "duration", {
        get: function () {
            return this.sourceNode
                && this.sourceNode.buffer
                && this.sourceNode.buffer.duration || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpeakerChancel.prototype, "formant", {
        get: function () {
            var currentAudioData = new Uint8Array(this.windowSize);
            this.analyserNode.getByteFrequencyData(currentAudioData);
            var currentAudioSpectrum = _peaks_1.default.discreteCosineTransform(currentAudioData);
            var amplitudeSum = 0.0;
            for (var k = 0; k < currentAudioSpectrum.length; k++) {
                amplitudeSum += currentAudioSpectrum[k];
            }
            if (amplitudeSum >= this.amplitudeThreshold) {
                var formantSize = this._options && this._options.formantSize || 2;
                var smoothedAudioSpectrum = _peaks_1.default.convoluteDataAndFilter(currentAudioSpectrum, this.gaussianFilters, "Repet");
                var _a = _peaks_1.default.findLocalLargestPeaks(smoothedAudioSpectrum, formantSize), peakValues = _a.peakValues, peakPositions = _a.peakPositions;
                var frequencyUnit = this.audioCtx.sampleRate / this.windowSize;
                var formantArray = [];
                for (var i = 0; i < peakPositions.length; i++) {
                    formantArray[i] = peakPositions[i] * (peakValues[i] / frequencyUnit);
                }
                var formantAverage_1 = 0;
                formantArray.forEach(function (formantVal) {
                    formantAverage_1 += formantVal;
                });
                return formantAverage_1 / formantArray.length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    SpeakerChancel.prototype.play = function () {
        var _this = this;
        _loadres_1.default.loadRes(this._audioUrl, function (audioData) {
            _this.audioCtx.decodeAudioData(audioData, function (buffer) {
                _this.sourceNode.buffer = buffer;
                _this.sourceNode.connect(_this.analyserNode);
                _this.sourceNode.connect(_this.audioCtx.destination);
                _this.sourceNode.start();
            }, function (e) {
                var errorMsg = "error decoding audio data: " + _this._audioUrl;
                _this._onErrorCallback && _this._onErrorCallback(errorMsg, e);
            });
        }, function () {
            var errorMsg = "load audio failure: " + _this._audioUrl;
            _this._onErrorCallback && _this._onErrorCallback(errorMsg);
        });
    };
    SpeakerChancel.prototype.stop = function () {
        var indexOf = _CHANCELS.indexOf(this);
        if (indexOf >= 0) {
            _CHANCELS.splice(indexOf, 1);
        }
        try {
            if (this.sourceNode) {
                this.sourceNode.stop();
            }
        }
        catch (error) {
        }
    };
    return SpeakerChancel;
}());
exports.SpeakerChancel = SpeakerChancel;
function playSpeak(url, onError, options) {
    var cancel = new SpeakerChancel(url, onError, options);
    cancel.play();
    _CHANCELS.push(cancel);
    return cancel;
}
exports.default = {
    playSpeak: playSpeak
};


/***/ }),

/***/ "./src/services/speaker/_loadres.ts":
/*!******************************************!*\
  !*** ./src/services/speaker/_loadres.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function loadRes(url, callback, failure) {
    var request = new XMLHttpRequest();
    request.responseType = "arraybuffer";
    request.open('GET', url, true);
    request.onload = function () {
        callback && callback(request.response);
    };
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status !== 200) {
                failure && failure();
            }
        }
    };
    request.send();
}
exports.default = {
    loadRes: loadRes
};


/***/ }),

/***/ "./src/services/speaker/_peaks.ts":
/*!****************************************!*\
  !*** ./src/services/speaker/_peaks.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getValueFromArray(data, index, paddleType) {
    if (index >= 0 && index < data.length) {
        return data[index];
    }
    else {
        switch (paddleType) {
            case "Zero":
                return 0;
            case "Repeat":
                return index < 0 ? data[0] : data[data.length - 1];
            case "Loop":
                var actualIndex = index;
                while (actualIndex < 0) {
                    actualIndex += data.length;
                }
                actualIndex %= data.length;
                return data[actualIndex];
            default:
                return 0;
        }
    }
}
function generateGaussianFilter(size, deviationSquare) {
    var result = [];
    var sum = 0;
    var mu = (size - 1) / 2;
    for (var i = 0; i < size; i++) {
        var param = -((i - mu) * (i - mu)) / (2 * deviationSquare);
        result[i] = Math.exp(param);
        sum += result[i];
    }
    for (var j = 0; j < size; j++) {
        result[j] /= sum;
    }
    return result;
}
function discreteCosineTransform(data) {
    var result = [];
    var sumCos = 0;
    data.forEach(function (_, i) {
        sumCos = 0;
        data.forEach(function (d2, j) {
            sumCos += d2 * Math.cos((Math.PI / data.length) * i * (j + 0.5));
        });
        result[i] = Math.abs(sumCos);
    });
    return result;
}
/**
 * Convolute data and filter. Result is sent to output, which must not be shorter than data.
 */
function convoluteDataAndFilter(data, filter, paddleType) {
    if (paddleType === void 0) { paddleType = "Repeat"; }
    var output = [];
    var filterMiddlePoint = Math.floor(filter.length / 2);
    for (var n = 0; n < data.length; n++) {
        output[n] = 0.0;
        for (var m = 0; m < filter.length; m++) {
            output[n] += getValueFromArray(data, n - filterMiddlePoint + m, paddleType) * filter[filter.length - m - 1];
        }
    }
    return output;
}
function findLocalLargestPeaks(data, length) {
    var peakNum = 0;
    var lastPeak = 0;
    var lastPeakPositions = 0;
    var isIncreasing = false;
    var isPeakIncreasing = false;
    var peakValues = [];
    var peakPositions = [];
    for (var i = 0; i < data.length - 1; i++) {
        if (data[i] < data[i + 1]) {
            isIncreasing = true;
        }
        else {
            if (isIncreasing == true) {
                // Peak found.
                if (lastPeak < data[i]) {
                    isPeakIncreasing = true;
                }
                else {
                    if (isPeakIncreasing == true) {
                        // Local largest peak found.
                        peakValues[peakNum] = lastPeak;
                        peakPositions[peakNum] = lastPeakPositions;
                        ++peakNum;
                    }
                    isPeakIncreasing = false;
                }
                lastPeak = data[i];
                lastPeakPositions = i;
            }
            isIncreasing = false;
        }
        if (peakNum >= length) {
            break;
        }
    }
    return { peakValues: peakValues, peakPositions: peakPositions };
}
exports.default = {
    generateGaussianFilter: generateGaussianFilter,
    discreteCosineTransform: discreteCosineTransform,
    convoluteDataAndFilter: convoluteDataAndFilter,
    findLocalLargestPeaks: findLocalLargestPeaks
};


/***/ }),

/***/ "./src/services/speaker/index.ts":
/*!***************************************!*\
  !*** ./src/services/speaker/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var looper_1 = __webpack_require__(/*! ../../utils/looper */ "./src/utils/looper.ts");
var _chancel_1 = __webpack_require__(/*! ./_chancel */ "./src/services/speaker/_chancel.ts");
var vowelsByFormantJP = ["i", "u", "e", "o", "a"];
var vowelFormantFloorJP = [0, 500, 600, 900, 1200];
var vowelsByFormantCN = ["i", "v", "u", "e", "o", "a"];
var vowelFormantFloorCN = [0, 200, 500, 600, 900, 1200];
function getVowelByFormant(formantValue, language) {
    var result = "-";
    var currentVowels = vowelsByFormantCN;
    var currentVowelFormantCeilValues = vowelFormantFloorCN;
    if (language == 'jp' || language == 'japanese') {
        currentVowels = vowelsByFormantJP;
        currentVowelFormantCeilValues = vowelFormantFloorJP;
    }
    for (var m = 0; m < currentVowelFormantCeilValues.length; m++) {
        if (formantValue > currentVowelFormantCeilValues[m]) {
            result = currentVowels[m];
        }
    }
    return result;
}
function fixWechatAudioPlay(callback) {
    if (window && window['WeixinJSBridge']) {
        try {
            window['WeixinJSBridge'].invoke("getNetworkType", {}, function () {
                callback && callback();
            });
        }
        catch (e) {
            callback && callback();
        }
    }
    else {
        callback && callback();
    }
}
var SpeakerController = /** @class */ (function () {
    function SpeakerController(options) {
        this._onPlay = null;
        this._onStop = null;
        this._onError = null;
        this._onProgress = null;
        this._onComplete = null;
        this._options = null;
        this._playTime = 0;
        this._auidoUrl = null;
        this._position = -1;
        this._duration = -1;
        this._formant = null;
        this._speaking = false;
        this._language = "chinese";
        this._chancel = null;
        this._options = options;
    }
    SpeakerController.prototype._update = function () {
        if (this._chancel) {
            this._formant = this._chancel.formant;
            this._position = this._chancel.position;
            this._duration = this._chancel.duration;
            if (!this._speaking && this._position > 0) {
                this._speaking = true;
                this._onPlay && this._onPlay();
            }
            if (this._speaking && this._duration > 0) {
                if (this._position > this._duration) {
                    this._onComplete && this._onComplete();
                    this.stop();
                }
                else {
                    this._onProgress && this._onProgress({
                        position: this._position,
                        duration: this._duration,
                    });
                }
            }
            else if (Date.now() - this._playTime > 2000) {
                this._onError && this._onError();
                this.stop();
            }
        }
    };
    Object.defineProperty(SpeakerController.prototype, "url", {
        get: function () {
            return this._auidoUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpeakerController.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpeakerController.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    SpeakerController.prototype.onPlay = function (callback) {
        this._onPlay = callback;
    };
    SpeakerController.prototype.onStop = function (callback) {
        this._onStop = callback;
    };
    SpeakerController.prototype.onProgress = function (callback) {
        this._onProgress = callback;
    };
    SpeakerController.prototype.onComplete = function (callback) {
        this._onComplete = callback;
    };
    SpeakerController.prototype.onError = function (callback) {
        this._onError = callback;
    };
    SpeakerController.prototype.getFormant = function () {
        return this._formant;
    };
    SpeakerController.prototype.getVowel = function () {
        return getVowelByFormant(this._formant, this._language);
    };
    SpeakerController.prototype.isSpeaking = function () {
        return this._speaking;
    };
    SpeakerController.prototype.speak = function (url, language) {
        var _this = this;
        if (language === void 0) { language = 'chinese'; }
        this._auidoUrl = url;
        this._language = language;
        fixWechatAudioPlay(function () {
            if (_this._auidoUrl) {
                _this.stop();
                _this._playTime = Date.now();
                _this._chancel = _chancel_1.default.playSpeak(_this._auidoUrl, _this._onError, _this._options);
                looper_1.default.loop(_this, _this._update);
            }
        });
    };
    SpeakerController.prototype.stop = function () {
        if (!this._chancel) {
            return;
        }
        if (!this._speaking) {
            return;
        }
        this._onStop && this._onStop();
        this._chancel.stop();
        this._chancel = null;
        this._speaking = false;
        looper_1.default.clear(this, this._update);
    };
    return SpeakerController;
}());
function create(options) {
    return new SpeakerController(options);
}
exports.default = {
    create: create
};


/***/ }),

/***/ "./src/services/utils.ts":
/*!*******************************!*\
  !*** ./src/services/utils.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var any_1 = __webpack_require__(/*! ../utils/any */ "./src/utils/any.ts");
var json_1 = __webpack_require__(/*! ../utils/json */ "./src/utils/json.ts");
function randomUUID() {
    var _s4 = function () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); };
    return (_s4() + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + _s4() + _s4());
}
function randomNumber(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return Math.random() * minNum + 1;
        case 2:
            return Math.random() * (maxNum - minNum + 1) + minNum;
        default:
            return 0;
    }
}
function randomInteger(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return Math.floor(Math.random() * minNum + 1);
        case 2:
            return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        default:
            return 0;
    }
}
function randomArray(source, length) {
    if (length === void 0) { length = -1; }
    var randomLength = length == -1 ? source.length : length;
    randomLength = Math.min(randomLength, source.length);
    var copy = source.concat([]);
    var result = [];
    while (result.length < randomLength) {
        var randomObj = randomArrayItem(copy);
        result.push(randomObj);
        copy.splice(copy.indexOf(randomLength), 1);
    }
    return result;
}
function randomArrayItem(source) {
    if (source.length > 0) {
        return source[Math.floor(Math.random() * source.length)];
    }
    return undefined;
}
exports.default = {
    randomUUID: randomUUID,
    randomInteger: randomInteger,
    randomNumber: randomNumber,
    randomArray: randomArray,
    randomArrayItem: randomArrayItem,
    loadJson: json_1.loadJson,
    toAny: any_1.toAny
};


/***/ }),

/***/ "./src/utils/any.ts":
/*!**************************!*\
  !*** ./src/utils/any.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function _toNumber_(value) {
    try {
        return JSON.parse(value);
    }
    catch (ex) {
        return parseFloat(value);
    }
}
function _toBoolean_(value) {
    return !!value && value != 'false' && value != '0';
}
function _toString_(value, def) {
    try {
        var type = typeof value;
        if (type === 'string') {
            return value;
        }
        else if (type === 'boolean') {
            return value ? 'true' : 'false';
        }
        else if (type === 'number') {
            return "" + value;
        }
        else if (type === 'object') {
            return JSON.stringify(value);
        }
    }
    catch (ex) {
    }
    return def;
}
function _toObject_(value, def) {
    if (typeof value === 'object') {
        return value;
    }
    try {
        return JSON.parse(value);
    }
    catch (ex) {
    }
    return def;
}
function _inferType(value) {
    if (typeof value !== 'string') {
        return typeof value;
    }
    try {
        var parsed = JSON.parse(value);
        return typeof parsed;
    }
    catch (ex) {
        // might be a pure number
        var number = parseFloat(value);
        if (!isNaN(number) && "" + number === value) {
            return 'number';
        }
        return 'string';
    }
}
function toAny(value, def) {
    if (value === undefined || value === null) {
        return def;
    }
    // try to infer type and return
    var type = _inferType(value);
    if (def !== undefined && def !== null) {
        type = typeof def;
    }
    switch (type) {
        case 'number':
            return _toNumber_(value);
        case 'boolean':
            return _toBoolean_(value);
        case 'object':
            return _toObject_(value, def);
        case 'string':
            return _toString_(value, def);
        default:
            break;
    }
    return def;
}
exports.toAny = toAny;


/***/ }),

/***/ "./src/utils/json.ts":
/*!***************************!*\
  !*** ./src/utils/json.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _temp = {};
var _reject = {};
var _listener = false;
function _initListener() {
    if (_listener) {
        return;
    }
    _listener = true;
    Laya.loader.on(Laya.Event.ERROR, this, function (url) {
        if (_reject[url]) {
            _reject[url]("load res error: " + url);
        }
    });
}
function loadJson(url, force) {
    var _this = this;
    if (force === void 0) { force = false; }
    if (!force && _temp[url]) {
        return Promise.resolve(_temp[url]);
    }
    _initListener();
    return new Promise(function (resolve, reject) {
        _reject[url] = reject;
        Laya.loader.load([{ url: url, type: Laya.Loader.JSON }], Laya.Handler.create(_this, function () {
            var val = Laya.loader.getRes(url);
            if (val) {
                _temp[url] = val;
                resolve(val);
            }
            else {
                reject();
            }
            delete _reject[url];
        }));
    });
}
exports.loadJson = loadJson;


/***/ }),

/***/ "./src/utils/looper.ts":
/*!*****************************!*\
  !*** ./src/utils/looper.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function removeItemForWhere(array, where) {
    if (typeof where === 'function') {
        var removeIndexArray_1 = [];
        array.forEach(function (value, index) {
            if (where(value)) {
                removeIndexArray_1.push(index);
            }
        });
        removeIndexArray_1.reverse();
        removeIndexArray_1.forEach(function (index) {
            array.splice(index, 1);
        });
    }
}
var Looper = /** @class */ (function () {
    function Looper() {
        this._tasks = [];
        this._hasLoop = false;
    }
    Looper.prototype._checkLoop = function () {
        var _this = this;
        if (this._tasks.length > 0) {
            if (!this._hasLoop) {
                Laya.timer.frameLoop(1, this, function () {
                    _this._tasks.forEach(function (task) {
                        var caller = task.caller, callback = task.callback;
                        callback.apply(caller);
                    });
                });
                this._hasLoop = true;
            }
        }
        else {
            if (this._hasLoop) {
                Laya.timer.clearAll(this);
                this._hasLoop = false;
            }
        }
    };
    Looper.prototype.loop = function (caller, callback) {
        var filterTasks = this._tasks.filter(function (task) {
            return task.caller == caller && task.callback == callback;
        });
        if (filterTasks.length == 0) {
            this._tasks.push({
                caller: caller,
                callback: callback,
            });
            this._checkLoop();
        }
    };
    Looper.prototype.clear = function (caller, callback) {
        removeItemForWhere(this._tasks, function (task) {
            return task.caller == caller && (!callback || task.callback == callback);
        });
        this._checkLoop();
    };
    return Looper;
}());
exports.Looper = Looper;
exports.default = new Looper;


/***/ }),

/***/ "./src/utils/onload.ts":
/*!*****************************!*\
  !*** ./src/utils/onload.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ready = null;
function onload() {
    if (!_ready) {
        _ready = new Promise(function (reslove, reject) {
            var _timer;
            var _pollingDocument = function () {
                if (!!document && document.readyState == 'complete') {
                    _timer && clearTimeout(_timer);
                    reslove(Date.now());
                }
                else {
                    _timer = setTimeout(_pollingDocument, 1);
                }
            };
            _timer = setTimeout(_pollingDocument, 1);
        });
    }
    return _ready;
}
exports.onload = onload;


/***/ }),

/***/ "./src/utils/query.ts":
/*!****************************!*\
  !*** ./src/utils/query.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function stringifyQuery(query) {
    return Object.keys(query).map(function (key) {
        var value = query[key];
        return key + "=" + encodeURIComponent(value);
    }).join('&');
}
exports.stringifyQuery = stringifyQuery;
function decodeQuery(query) {
    return Object.keys(query).reduce(function (result, key) {
        var value = query[key];
        result[key] = decodeURIComponent(value);
        return result;
    }, {});
}
exports.decodeQuery = decodeQuery;
function parseQueryParams(path) {
    var url = '';
    var params = {};
    if (!path || typeof path !== 'string') {
        return { url: url, params: params };
    }
    var queryString = '';
    var indexE = path.indexOf('?');
    var indexW = path.indexOf('#');
    var indexQ = path.indexOf('=');
    if (indexE >= 0) {
        url = path.substring(0, indexE);
        queryString = path.substring(indexE + 1, indexW > 0 ? indexW : path.length);
    }
    else if (indexQ >= 0) {
        url = '';
        queryString = path;
    }
    else {
        url = path;
        queryString = '';
    }
    queryString.split('&').map(function (item) {
        var index = item.indexOf("=");
        if (index > 0) {
            var key = item.substring(0, index);
            var value = item.substring(index + 1);
            params[key] = decodeURIComponent(value);
        }
    });
    return { url: url, params: params };
}
exports.parseQueryParams = parseQueryParams;
function appendQueryParams(path, query) {
    if (query === void 0) { query = {}; }
    var _a = parseQueryParams(path), url = _a.url, params = _a.params;
    Object.keys(query).forEach(function (key) {
        var value = query[key];
        if (value !== undefined && value !== null) {
            params[key] = value;
        }
        else {
            delete params[key];
        }
    });
    var queryString = Object.keys(params).map(function (key) {
        var value = params[key];
        return key + "=" + encodeURIComponent(value);
    }).join('&');
    ;
    if (!url) {
        return queryString;
    }
    if (!queryString) {
        return url;
    }
    return url + "?" + queryString;
}
exports.appendQueryParams = appendQueryParams;
function getQueryString(key, def) {
    if (typeof window !== "undefined" && window.location) {
        var search = window.location.search || '';
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(unescape(r[2]));
        }
    }
    return def;
}
exports.getQueryString = getQueryString;


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map