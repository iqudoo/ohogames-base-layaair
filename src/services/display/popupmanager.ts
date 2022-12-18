import { getClassName } from "../env";
import UIMgr from "../manager/uimgr";
import PopupView from "./popupview";

let _popups = {};
let _fromProps = { alpha: 0 }
let _toProps = { alpha: 1 }
let _exitProps = { alpha: 0 }

function _showPopupAnim(popupView: PopupView, cb: Function) {
    // ui anim
    let uiDuration = popupView.uiDuration || 300;
    let uiFromProps = popupView.uiFromProps || {};
    let uiToProps = popupView.uiToProps || {};
    let uiEaseIn = popupView.uiEaseIn || Laya.Ease.linearIn;
    Object.assign(popupView.ui, uiFromProps);
    Laya.Tween.to(popupView.ui, uiToProps, uiDuration, uiEaseIn);
    // view anim
    let duration = popupView.duration || 300;
    let from = popupView.fromProps || _fromProps || {};
    let to = popupView.toProps || _toProps || {};
    let easeIn = popupView.easeIn || Laya.Ease.linearIn;
    Object.assign(popupView, from);
    Laya.Tween.to(popupView, to, duration, easeIn, Laya.Handler.create(this, () => {
        cb && cb(popupView);
    }));
}

function _hidePopupAnim(popupView, cb) {
    // ui anim
    let uiDuration = popupView.uiDuration || 300;
    let uiToProps = popupView.uiToProps || {};
    let uiExitProps = popupView.uiExitProps || {};
    let uiEaseOut = popupView.uiEaseOut || Laya.Ease.linearOut;
    Object.assign(popupView.ui, uiToProps);
    Laya.Tween.to(popupView.ui, uiExitProps, uiDuration, uiEaseOut);
    // view anim
    let duration = popupView.duration || 300;
    let toProps = popupView.toProps || _toProps || {};
    let exitProps = popupView.exitProps || _exitProps || {};
    let easeOut = popupView.easeOut || Laya.Ease.linearOut;
    Object.assign(popupView, toProps);
    Laya.Tween.to(popupView, exitProps, duration, easeOut, Laya.Handler.create(this, () => {
        cb && cb(popupView);
    }), Math.max(0, uiDuration - duration));
}

function _hidePopup(view: PopupView, result) {
    _hidePopupAnim(view, () => {
        view.__callSetShowed(false);
        view['__hideCallback__'] && view['__hideCallback__'](view.popup, result);
        view.onHide && view.onHide(view.popup, result);
        view.removeSelf && view.removeSelf();
        view.destroy && view.destroy();
        UIMgr.checkFocus();
    });
}

function showPopup(popup, params = null, onHide = null, alias = "default") {
    var mapKey = `${alias}_${getClassName(popup)}`;
    let views = _popups[mapKey];
    let view = new popup() as PopupView;
    view.alias = alias;
    view.popup = popup;
    view.params = params || {};
    view['__hideCallback__'] = onHide;
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
    _showPopupAnim(view, () => {
        view.__callSetShowed(true);
    });
}

function hidePopup(popup, view: PopupView = null, result = {}, alias = "default") {
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
    showPopup,
    hidePopup
}