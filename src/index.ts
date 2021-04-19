import "./adapter";
import "./polyfill";
import bg from "./services/manager/bg";
import eft from "./services/manager/eft";
import screen from "./services/manager/screen";
import audio from './services/audio';
import env from "./services/env";
import js from "./services/js";
import event from "./services/event";
import pipeline from "./services/pipeline";
import runtime from "./services/runtime";
import message from "./services/message";
import utils from './services/utils';
import navigator from "./services/navigator/stack";
import popup from "./services/display/popupmanager";
import toast from "./services/display/toastmanager";
import BaseView from "./services/display/ui";
import Activity from "./services/display/activity";
import PopupView from "./services/display/popupview";
import ToastView from "./services/display/toastview";
import lifecycle from "./services/lifecycle";
import { getQueryString } from "./utils/query";
import { init, init3D, start } from './services/init';

const OHOGame = Object.assign({}, lifecycle, {
    init,
    init3D,
    start,
    getQueryString,
    env,
    js,
    bg,
    eft,
    screen,
    audio,
    event,
    runtime,
    pipeline,
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
