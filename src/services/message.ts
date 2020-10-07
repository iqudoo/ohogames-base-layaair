import env from "../utils/env";
import { toAny } from "../utils/any";

let _listeners = [];

function onMessage(callback) {
    if (callback && typeof callback == "function" && _listeners.indexOf(callback) < 0) {
        _listeners.push(callback);
    }
}

function postMessage(data = {}) {
    if (env.isConchApp()) {
        Laya.conchMarket.sendMessageToPlatform(toAny(data, "{}"), (resp) => {
            env.printDebug("conch message callback: ", resp);
        });
    } else {
        window.parent.postMessage(toAny(data, {}), '*');
    }
}

function _initMessage() {
    let name = "__dispatchMessage__";
    if (typeof window !== "undefined") {
        (window as any)[name] = function (data) {
            if (data) {
                _listeners.forEach(callback => callback(toAny(data, {})));
            }
        };
    }
    window.addEventListener("message", function (msg) {
        if (msg && msg.data) {
            _listeners.forEach(callback => callback(toAny(msg.data, {})));
        }
    });
}

(function () {
    _initMessage();
})();

export default {
    postMessage,
    onMessage
}