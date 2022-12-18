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

}

export default runtime;