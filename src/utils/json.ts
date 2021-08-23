let _temp = {};
let _reject = {};
let _listener = false;

function _initListener() {
    if (_listener) {
        return;
    }
    _listener = true;
    Laya.loader.on(Laya.Event.ERROR, this, (url) => {
        if (_reject[url]) {
            _reject[url]("load res error: " + url);
        }
    })
}

export function loadJson(url, force = false): Promise<Array<any>> {
    if (!force && _temp[url]) {
        return Promise.resolve(_temp[url]);
    }
    _initListener();
    return new Promise((resolve, reject) => {
        _reject[url] = reject;
        Laya.loader.load([{ url: url, type: Laya.Loader.JSON }], Laya.Handler.create(this, () => {
            let val = Laya.loader.getRes(url);
            if (val) {
                _temp[url] = val;
                resolve(val);
            } else {
                reject();
            }
            delete _reject[url];
        }))
    })
}