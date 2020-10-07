let _ready = null;

export function onload() {
    if (!_ready) {
        _ready = new Promise((reslove, reject) => {
            let _timer;
            let _pollingDocument = function () {
                if (!!document && document.readyState == 'complete') {
                    _timer && clearTimeout(_timer);
                    reslove();
                } else {
                    _timer = setTimeout(_pollingDocument, 1);
                }
            };
            _timer = setTimeout(_pollingDocument, 1);
        });
    }
    return _ready;
}