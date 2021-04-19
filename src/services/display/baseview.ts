export default class BaseView extends Laya.Component {

    public set ui(view: Laya.Sprite) {
        this.removeChildByName('_contentView');
        view.name = '_contentView';
        view.mouseThrough = true;
        this.addChild(view);
    }

    public get ui(): Laya.Sprite {
        return this.getChildByName('_contentView') as Laya.Sprite;
    }

}