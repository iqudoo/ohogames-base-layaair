export function onAttachEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
    } else {
        return elem[event] = fn;
    }
}