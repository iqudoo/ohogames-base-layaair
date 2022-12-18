export class PageList extends Laya.List {

    private _isDown: boolean = false;
    private _onLoadMoreHandler = null;
    private _loading: boolean = false;
    private _preCount: number = 5;

    constructor() {
        super();
        this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.renderHandler = Laya.Handler.create(this, this.renderItem);
    }

    destroy() {
        this.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
    }

    refresh() {
        super.refresh();
        this._updatePage();
    }

    private onMouseDown() {
        this._isDown = true;
    }

    private onMouseUp(event) {
        this._updatePage();
        this._isDown = false;
    }

    private onMouseOut(event) {
        this._updatePage();
        this._isDown = false;
    }

    public set preCount(count: number) {
        this._preCount = count;
    }

    public get preCount() {
        return this._preCount;
    }

    public set loading(loading: boolean) {
        this._loading = loading;
    }

    public get loading() {
        return this._loading;
    }

    public set onLoadMoreHandler(handler: (lastCount: number) => void) {
        this._onLoadMoreHandler = handler;
    }

    public get onLoadMoreHandler() {
        return this._onLoadMoreHandler;
    }

    private _updatePage() {
        if (!this._isDown) {
            return;
        }
        let length: number = this._array.length;
        let maxHeight = length * this._cellSize;
        let currentPos = this._cellOffset + this.scrollBar.value + this.height;
        let lastCount = Math.floor((maxHeight - currentPos) / this._cellSize);
        if (lastCount < 0) {
            lastCount = 0;
        }
        if (!this._loading && this.preCount >= lastCount) {
            this._onLoadMoreHandler && this._onLoadMoreHandler(lastCount);
        }
    }

}