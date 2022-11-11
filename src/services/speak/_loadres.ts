function loadRes(url: string, callback: Function, failure: Function) {
    var request = new XMLHttpRequest();
    request.responseType = "arraybuffer";
    request.open('GET', url, true);
    request.onload = function () {
        callback && callback(request.response);
    };
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status !== 200) {
                failure && failure();
            }
        }
    };
    request.send();
}

export default {
    loadRes
}