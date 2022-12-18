export class PageView extends Laya.List {

    private _isDown: boolean = false;
    private _currentPage: number = 0;
    private _onPageChange: (pageId: number) => void = null;

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

    public get pageId() {
        return this._currentPage;
    }

    public set pageId(n: number) {
        this._currentPage = n;
        if (this._currentPage < 0) {
            this._currentPage = 0;
        }
        this.tweenTo(n);
    }

    public set onPageChangeHandler(handler: (pageId: number) => void) {
        this._onPageChange = handler;
    }

    public get onPageChangeHandler() {
        return this._onPageChange;
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

    private _updatePage() {
        if (!this._isDown) {
            return;
        }
        this.scrollBar.stopScroll();
        let total = this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage;
        if (total > 1) {
            let changeSize = this._cellSize / 6;
            let sss = this._currentPage * this._cellSize;
            if (Math.abs(this.scrollBar.value - sss) > changeSize) {
                if (this.scrollBar.value > sss) {
                    this._currentPage++;
                } else {
                    this._currentPage--;
                }
            }
            if (this._currentPage > total) {
                this._currentPage = total + 1;
            }
            if (this._currentPage < 0) {
                this._currentPage = 0;
            }
        }
        this.tweenTo(this._currentPage);
        if (this._onPageChange) {
            this._onPageChange(this._currentPage);
        }
    }
}
