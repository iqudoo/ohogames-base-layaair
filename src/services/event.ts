class Event extends Laya.EventDispatcher {

    private _dic: Laya.Dictionary;

    constructor() {
        super();
        this._dic = new Laya.Dictionary();
    }

    public registeredEvent(type: any, fun: Function, thisRef: any, index: number = 1): void {
        var arr: Array<any> = [];
        if (index == null) index = 1;
        if (this._dic[type]) {
            arr = this._dic[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].fun == fun && arr[i].thisRef == thisRef) {
                    if (index != arr[i].index) {
                        arr[i].index = index;
                        arr.sort(function (a, b) { return b.index - a.index });
                        this._dic[type] = arr;
                    }
                    return
                }
            }
        }
        arr.push({ fun: fun, thisRef: thisRef, index: index });
        arr.sort(function (a, b) { return b.index - a.index });
        this._dic[type] = arr;
    }

    public removeEvent(type: any, fun: Function, thisRef: any): void {
        if (this._dic[type]) {
            var arr = this._dic[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].fun == fun && arr[i].thisRef == thisRef) {
                    arr[i] = null;
                    arr.splice(i, 1);
                    this._dic[type] = arr;
                    return
                }
            }
        }
    }

    public sendEvent(type: any, args: Array<any> = null): void {
        if (this._dic[type]) {
            var arr = this._dic[type];
            for (var i = 0; i < arr.length; i++) {
                arr[i].fun.apply(arr[i].thisRef, args);
            }
        }
    }

}

export default new Event();