import env from "../utils/env";
import { initScreen } from "./manager/screen";
import { initNavigator, setNavigatorReady } from "./navigator/init";
import { callHookInit } from "./hook";

let _inited = false;

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