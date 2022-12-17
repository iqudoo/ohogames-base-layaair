import "./adapter";
import "./polyfill";
import eft from "./services/manager/eft";
import screen from "./services/manager/screen";
import speaker from './services/speaker';
import audio from './services/audio';
import env from "./services/env";
import js from "./services/js";
import event from "./services/event";
import runtime from "./services/runtime";
import message from "./services/message";
import utils from './services/utils';
import navigator from "./services/navigator/stack";
import popup from "./services/display/popupmanager";
import toast from "./services/display/toastmanager";
import Activity from "./services/display/activity";
import PopupView from "./services/display/popupview";
import ToastView from "./services/display/toastview";
import BaseView from "./services/display/baseview";
import { getQueryString } from "./utils/query";
import { init, init3D, start, setTransparent, setAdapterInfo } from './services/init';

const OHOGame = Object.assign({}, {
    init,
    init3D,
    start,
    getQueryString,
    setTransparent,
    setAdapterInfo,
    getBg: screen.getBg,
    env,
    js,
    eft,
    screen,
    speaker,
    audio,
    event,
    runtime,
    navigator,
    utils,
    popup,
    toast,
    message,
    Activity,
    PopupView,
    ToastView,
    BaseView
});

if (typeof window !== "undefined") {
    (window as any).OHOGame = OHOGame;
}

export = {
    OHOGame
}
