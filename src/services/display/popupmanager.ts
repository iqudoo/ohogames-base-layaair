import { getClassName } from "../env";
import UIMgr from "../manager/uimgr";

let _popups = {};
let _fromProps = { alpha: 0 }
let _toProps = { alpha: 1 }
let _exitProps = { alpha: 0 }

function _showPopupAnim(popupView, cb) {
    let from = popupView.fromProps || _fromProps || {};
    let to = popupView.toProps || _toProps || {};
    let easeIn = popupView.easeIn || Laya.Ease.linearIn;
    let duration = popupView.duration || 500;
    Object.assign(popupView, from);
    Laya.Tween.to(popupView, to, duration, easeIn, Laya.Handler.create(this, () => {
        cb && cb(popupView);
    }));
}

function _hidePopupAnim(popupView, cb) {
    let from = popupView.toProps || _toProps || {};
    let to = popupView.exitProps || _exitProps || {};
    let easeOut = popupView.easeOut || Laya.Ease.linearOut;
    let duration = popupView.duration || 500;
    Object.assign(popupView, from);
    Laya.Tween.to(popupView, to, duration, easeOut, Laya.Handler.create(this, () => {
        cb && cb(popupView);
    }));
}

function _hidePopup(view, result) {
    _hidePopupAnim(view, () => {
        view._onHide && view._onHide(view.popup, result);
        view.isShow = false;
        view.onHide && view.onHide(view.popup, result);
        view.removeSelf && view.removeSelf();
        view.destroy && view.destroy();
        UIMgr.checkFocus();
    });
}

function _showPopup(view) {
    _showPopupAnim(view, () => {
        view.isShow = true;
    });
}

function setDefaultAnim(fromProps, toProps) {
    _fromProps = fromProps;
    _toProps = toProps;
}

function showPopup(popup, params = null, onHide = null, alias = "default") {
    var mapKey = `${alias}_${getClassName(popup)}`;
    let views = _popups[mapKey];
    let view = new popup();
    view.alias = alias;
    view.popup = popup;
    view.params = params || {};
    view._onHide = onHide;
    if (views) {
        views.push(view);
    } else {
        _popups[mapKey] = [view];
    }
    if (view.topLevel) {
        UIMgr.addViewTopLayer(view);
    } else {
        UIMgr.addViewToMainLayer(view);
    }
    view.onShow && view.onShow();
    _showPopup(view);
}

function hidePopup(popup, view = null, result = {}, alias = "default") {
    var mapKey = `${alias}_${getClassName(popup)}`;
    var views = _popups[mapKey];
    if (view) {
        let index = views ? views.indexOf(view) : -1;
        if (index < 0) {
            return;
        }
        views.splice(index, 1);
        _hidePopup(view, result);
    } else {
        views && views.splice(0, views.length).forEach(v => {
            _hidePopup(v, result || { close: true });
        });
    }
}

export default {
    setDefaultAnim,
    showPopup,
    hidePopup
}