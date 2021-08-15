module runtime {

    export let clickSound = null;
    export let clickAnimDuration: number = 100;
    export let clickNormalProps = { scaleX: 1, scaleY: 1 }
    export let clickDownProps = { scaleX: 1.2, scaleY: 1.2 }

    function pivotCenter(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }

    function setViewProps(view, props, duration) {
        pivotCenter(view);
        Laya.Tween.to(view, props, duration);
    }

    function playClickSound(sound) {
        if (sound) {
            sound != 'none' && Laya.SoundManager.playSound(sound, 1);
        } else if (clickSound) {
            clickSound != 'none' && Laya.SoundManager.playSound(clickSound, 1);
        }
    }

    export function bindClick(view, onClick?, onDown?, onUp?, onOut?) {
        pivotCenter(view);
        view.offAll();
        view.on(Laya.Event.CLICK, view, () => {
            onClick && onClick();
            playClickSound(view.clickSound);
        });
        view.on(Laya.Event.MOUSE_DOWN, view, () => {
            setViewProps(view, view.clickDownProps || clickDownProps, view.clickAnimDuration || clickAnimDuration);
            onDown && onDown();
        });
        view.on(Laya.Event.MOUSE_UP, view, () => {
            setViewProps(view, view.clickNormalProps || clickNormalProps, view.clickAnimDuration || clickAnimDuration);
            onUp && onUp();
        });
        view.on(Laya.Event.MOUSE_OUT, view, () => {
            setViewProps(view, view.clickNormalProps || clickNormalProps, view.clickAnimDuration || clickAnimDuration);
            onOut && onOut();
        });
    }

    export class btn extends Laya.Button {

        public clickAnimDuration = null;
        public clickDownProps = null;
        public clickNormalProps = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_img extends Laya.Image {

        public clickAnimDuration = null;
        public clickDownProps = null;
        public clickNormalProps = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_label extends Laya.Label {

        public clickAnimDuration = null;
        public clickDownProps = null;
        public clickNormalProps = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_sprite extends Laya.Sprite {

        public clickAnimDuration = null;
        public clickDownProps = null;
        public clickNormalProps = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_box extends Laya.Box {

        public clickAnimDuration = null;
        public clickDownProps = null;
        public clickNormalProps = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class page_list extends Laya.List {

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

    export class page_view extends Laya.List {

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

}

export default runtime;