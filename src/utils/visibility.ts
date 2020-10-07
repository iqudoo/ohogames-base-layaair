let hidden, visibilityChange;

function _init() {
    if (hidden && visibilityChange) {
        return;
    }
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document['webkitHidden'] !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    } else if (typeof document['msHidden'] !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document['mozHidden'] !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    }
}

export function isVisibility() {
    _init();
    return !document[hidden];
}

export function onVisibility(callback) {
    if (typeof document != "undefined") {
        _init();
        document.addEventListener(visibilityChange, () => {
            callback && callback(isVisibility());
        }, false);
    }
}

export function fixVisibility() {
    if (typeof CustomEvent != "undefined") {
        _init();
        var visibilityEvent = new CustomEvent(visibilityChange, {
            bubbles: true,
            cancelable: false
        })
        document.dispatchEvent(visibilityEvent);
    }
}
