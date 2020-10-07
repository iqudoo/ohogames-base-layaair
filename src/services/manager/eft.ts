let _dic: Laya.Dictionary = new Laya.Dictionary();
let _mcpool: Laya.Dictionary = new Laya.Dictionary();
let _inst = {};

function onLoadComplet(path, mc, play, loop, loadComplet, thisRef) {
    var arr = _dic[path].arr;
    for (var i = 0; i < arr.length; i++) {
        arr[i][0]["_url"] = path;
        arr[i][0]["_atlasPath"] = path.split(".swf")[0] + ".json";
        arr[i][0]["_onLoaded"]();
        if (arr[i][1])
            arr[i][0].play(0, arr[i][2]);
        else
            arr[i][0].stop();
        if (arr[i][3]) {
            arr[i][3].apply(arr[i][4], [arr[i][0]]);
        }
    }
    if (play) {
        mc.play(0, loop);
    } else {
        mc.stop();
    }
    if (loadComplet) {
        loadComplet.apply(thisRef, [mc]);
    }
    _dic[path].arr = [];
    mc.off(Laya.Event.LOADED, _inst, onLoadComplet);
    _dic[path].load = true;
}

function remove(mc: Laya.MovieClip) {
    if (!mc) {
        return;
    }
    mc.scaleX = mc.scaleY = 1;
    mc.pivotX = mc.pivotY = 0;
    mc["anchorX"] = mc["anchorY"] = 0;
    mc.alpha = 1;
    Laya.Tween.clearAll(mc);
    mc.stop();
    if (mc.parent)
        mc.parent.removeChild(mc);
    _mcpool[mc["path"]].push(mc);
}

function create(path: string, play: boolean = true, loop: boolean = true, loadComplet: Function = null, thisRef = null): Laya.MovieClip {
    var mc: Laya.MovieClip;
    if (!_mcpool[path])
        _mcpool[path] = [];
    if (_mcpool[path].length > 0) {
        mc = _mcpool[path].shift();
    } else {
        mc = new Laya.MovieClip();
    }
    mc["path"] = path;
    if (_dic[path]) {
        if (_dic[path].load) {
            mc["_url"] = path;
            mc["_atlasPath"] = path.split(".swf")[0] + ".json";
            mc["_onLoaded"]();
            if (play)
                mc.play(0, loop);
            else
                mc.stop();
            if (loadComplet)
                loadComplet.apply(thisRef, [mc]);
        } else {
            _dic[path].arr.push([mc, play, loop, loadComplet, thisRef]);
        }
    } else {
        _dic[path] = { load: false, arr: [] };
        mc.on(Laya.Event.LOADED, _inst, onLoadComplet, [path, mc, play, loop, loadComplet, thisRef]);
        mc.load(path, true);
    }
    return mc;
}

export default {
    create,
    remove
}