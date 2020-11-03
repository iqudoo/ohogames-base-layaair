import { onload } from "../utils/onload";
import { onVisibility, fixVisibility } from "../utils/visibility";
import { callHookShow, callHookHide } from "./hook";
import env from "./env";

let _isshow = false;
let _caller_show = null;
let _caller_hide = null;
let _shows = [];
let _hides = [];

function callShow() {
    if (_isshow) {
        return;
    }
    _isshow = true;
    if (_caller_show) {
        return;
    }
    env.printDebug('call on show');
    _caller_show = setTimeout(() => {
        _caller_show = null;
        callHookShow();
        _shows.forEach(show => {
            show && show();
        });
    }, 50);
}

function callHide() {
    if (!_isshow) {
        return;
    }
    _isshow = false;
    if (_caller_hide) {
        return;
    }
    env.printDebug('call on hide');
    _caller_hide = setTimeout(() => {
        _caller_hide = null;
        callHookHide();
        _hides.forEach(hide => {
            hide && hide();
        });
    }, 0);
}

function onShow(show) {
    if (show && typeof show == 'function' && _shows.indexOf(show) < 0) {
        _isshow && show();
        _shows.push(show);
    }
}

function offShow(show) {
    let index = _shows.indexOf(show);
    if (index >= 0) {
        _shows.splice(index, 1);
    }
}

function onHide(hide) {
    if (hide && typeof hide == 'function' && _hides.indexOf(hide) < 0) {
        _hides.push(hide);
    }
}

function offHide(hide) {
    let index = _hides.indexOf(hide);
    if (index >= 0) {
        _hides.splice(index, 1);
    }
}

function _initLifecycle() {
    if (typeof window !== "undefined") {
        window.addEventListener("pageshow", () => {
            callShow();
        }, false);
        onload().then(() => {
            onVisibility((visibility) => {
                if (visibility) {
                    callShow();
                } else {
                    callHide();
                }
            })
            callShow();
            fixVisibility();
        });
    } else {
        callShow();
    }
}

(function () {
    _initLifecycle();
})();

export default {
    onShow,
    offShow,
    onHide,
    offHide
}