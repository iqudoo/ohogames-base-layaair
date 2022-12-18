import UIMgr from "../manager/uimgr";
import ToastView from "./toastview";

let _toasts: { [key: string]: any[] } = {};

function _pushToast(toast, view: ToastView) {
    if (_toasts[toast]) {
        _toasts[toast].push(view);
    } else {
        _toasts[toast] = [view];
    }
}

function _popToast(toast, view: ToastView) {
    if (!_toasts[toast]) {
        return [];
    }
    if (view && _toasts[toast].length > 1) {
        _toasts[toast].splice(_toasts[toast].indexOf(view), 1);
        return [view];
    } else {
        let views = _toasts[toast] || [];
        delete _toasts[toast];
        return views;
    }
}

function showToast(toast, params = null, onHide = null) {
    var view = new toast as ToastView;
    view['__hideCallback__'] = onHide;
    view.toast = toast;
    view.params = params || {};
    view.onShow && view.onShow();
    let from = view.fromProps || { alpha: 0 };
    let to = view.toProps || { alpha: 1 };
    let exit = view.exitProps || { alpha: 0 };
    let easeIn = view.easeIn || Laya.Ease.linearIn;
    let easeOut = view.easeOut || Laya.Ease.linearOut;
    let duration = view.duration;
    let displayDuration = view.displayDuration;
    Object.assign(view, from);
    Laya.Tween.to(view, to, duration, easeIn, Laya.Handler.create(this, () => {
        view.__callSetShowed(true);
    }), 0);
    if (displayDuration != -1) {
        Laya.Tween.to(view, exit, duration, easeOut, Laya.Handler.create(this, () => {
            if (view) {
                _popToast(toast, view);
                view.__callSetShowed(false);
                view['__hideCallback__'] && view['__hideCallback__'](view.toast);
                view.onHide && view.onHide();
                view.destroy();
            }
        }), displayDuration + duration);
    }
    _pushToast(toast, view);
    if (view.topLevel) {
        UIMgr.addViewTopLayer(view);
    } else {
        UIMgr.addViewToMainLayer(view);
    }
}

function hideToast(toast, view: ToastView = null) {
    let list = _popToast(toast, view);
    list.forEach(view => {
        view._on_hide && view._on_hide(view.toast);
        view.showState = false;
        view.onHide && view.onHide();
        view.destroy();
    });
}

export default {
    showToast,
    hideToast,
}