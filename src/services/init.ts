import env from "./env";
import { initScreen } from "./manager/screen";
import { initNavigator, setNavigatorReady } from "./navigator/init";
import { callHookInit } from "./hook";
import js from "./js";

let _inited = false;
let _adapterInfo = null;

function handleAdapter() {
    try {
        if (_adapterInfo) {
            var stage = Laya.stage;
            stage.width = _adapterInfo.width;
            stage.height = _adapterInfo.height;
            stage.scale(_adapterInfo.scaleX, _adapterInfo.scaleY);
        }
    } catch (error) {
    }
}

export function setAdapterInfo(adapterInfo) {
    _adapterInfo = adapterInfo;
}

export function init(width: number, height: number, ...options) {
    if (_inited) {
        return;
    }
    if (!env.isLayaApp()) {
        env.printError('Please ensure that the \'Laya\' library has been introduced.');
        return;
    }
    env.printDebug(`init...`);
    env.printDebug(`version: ${env.getVersion()}`);
    env.printDebug(`debug: ${env.isDebug()}`);
    env.printDebug(`env: ${env.getEnv()}`);
    initScreen(false, width, height, ...options);
    handleAdapter();
    callHookInit(width, height, ...options);
    _inited = true;
}

export function init3D(width: number, height: number, ...options) {
    if (_inited) {
        return;
    }
    if (!env.isLayaApp()) {
        env.printError('Please ensure that the \'Laya\' library has been introduced.');
        return;
    }
    env.printDebug(`init3D...`);
    env.printDebug(`version: ${env.getVersion()}`);
    env.printDebug(`debug: ${env.isDebug()}`);
    env.printDebug(`env: ${env.getEnv()}`);
    initScreen(true, width, height, ...options);
    handleAdapter();
    callHookInit(width, height, ...options);
    _inited = true;
}

export function start(options, onLoaded = null, onLoadProgress = null) {
    if (!_inited) {
        env.printError('Please complete the initialization of Tape first.');
        return;
    }
    if (!options) {
        options = {};
    }
    let callStart = () => {
        let newOptions = {
            mainPage: options.mainPage || null,
            commonRes: options.commonRes || [],
            fileVersion: options.fileVersion,
            onLoadProgress: (progress) => {
                options.onLoadProgress && options.onLoadProgress(progress);
                onLoadProgress && onLoadProgress(progress);
            },
            onLoaded: () => {
                onLoaded && onLoaded();
                options.onLoaded && options.onLoaded();
            }
        }
        initNavigator(newOptions);
        setNavigatorReady();
    }
    if (options.vConsole) {
        js.loadJs("https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js").then(() => {
            try {
                if (typeof window !== "undefined" && typeof window['VConsole'] !== "undefined") {
                    new window['VConsole']();
                }
            } catch (error) {
            }
        }).catch(() => { }).then(() => {
            callStart();
        });
    } else {
        callStart();
    }
}