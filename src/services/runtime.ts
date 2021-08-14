module runtime {

    export let clickSound = null;
    export let scaleTime: number = 100;
    export let scaleDownValue: number = 1.2;
    export let scaleNormalValue: number = 1;

    function pivotCenter(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }

    function viewScale(view, scale, time) {
        pivotCenter(view);
        Laya.Tween.to(view, { scaleX: scale, scaleY: scale }, time);
    }

    function playClickSound(sound) {
        if (sound) {
            sound != 'none' && Laya.SoundManager.playSound(sound, 1);
        } else if (clickSound) {
            clickSound != 'none' && Laya.SoundManager.playSound(clickSound, 1);
        }
    }

    export function bindClick(view, onClick?, onDown?, onUp?, onOut?) {
        view.offAll();
        view.on(Laya.Event.CLICK, view, () => {
            onClick && onClick();
            playClickSound(view.clickSound);
        });
        view.on(Laya.Event.MOUSE_DOWN, view, () => {
            viewScale(view, view.scaleDownValue || scaleDownValue, view.scaleTime || scaleTime);
            onDown && onDown();
        });
        view.on(Laya.Event.MOUSE_UP, view, () => {
            viewScale(view, view.scaleNormalValue || scaleNormalValue, view.scaleTime || scaleTime);
            onUp && onUp();
        });
        view.on(Laya.Event.MOUSE_OUT, view, () => {
            viewScale(view, view.scaleNormalValue || scaleNormalValue, view.scaleTime || scaleTime);
            onOut && onOut();
        });
    }

    export class btn extends Laya.Button {

        public scaleTime = null;
        public scaleDownValue = null;
        public scaleNormalValue = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_img extends Laya.Image {

        public scaleTime = null;
        public scaleDownValue = null;
        public scaleNormalValue = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_label extends Laya.Label {

        public scaleTime = null;
        public scaleDownValue = null;
        public scaleNormalValue = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_sprite extends Laya.Sprite {

        public scaleTime = null;
        public scaleDownValue = null;
        public scaleNormalValue = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_box extends Laya.Box {

        public scaleTime = null;
        public scaleDownValue = null;
        public scaleNormalValue = null;
        public clickSound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

}

export default runtime;