import hook from '../services/hook';

// loader
if (Laya && Laya.Loader) {
  var Handler = Laya.Handler;
  var Loader: any = Laya.Loader;
  var HttpRequest = Laya.HttpRequest;
  var __proto = Loader.prototype;
  __proto.load = function (url, type, cache, group, ignoreCache) {
    (cache === void 0) && (cache = true);
    (ignoreCache === void 0) && (ignoreCache = false);
    this._url = url;
    if (url.indexOf("data:image") === 0) this._type = type = "image";
    else {
      this._type = type || (type = this.getTypeFromUrl(url));
      url = Laya.URL.formatURL(url);
    }
    this._cache = cache;
    this._data = null;
    if (!ignoreCache && Loader.loadedMap[url]) {
      this._data = Loader.loadedMap[url];
      this.event(/*laya.events.Event.PROGRESS*/"progress", 1);
      this.event(/*laya.events.Event.COMPLETE*/"complete", this._data);
      return;
    }
    if (group) Loader.setGroup(url, group);
    if (Loader.parserMap[type] != null) {
      this._customParse = true;
      if (((Loader.parserMap[type]) instanceof Handler)) Loader.parserMap[type].runWith(this);
      else Loader.parserMap[type].call(null, this);
      return;
    }
    if (type === "image" || type === "htmlimage" || type === "nativeimage") return this._loadImage(url);
    if (type === "sound") return this._loadSound(url);
    if (type === "ttf") return this._loadTTF(url);
    try {
      // 在这里，插入添加适配读取本地资源
      if (typeof loadRuntime !== 'undefined' && !url.startsWith("http")) {
        var that = this;
        setTimeout(function () {
          if (url.startsWith('file://')) {
            url = url.substr('file://'.length);
          }
          var response;
          if (type == 'pkm' || type === "arraybuffer") {
            response = rt.getFileSystemManager().readFileSync(url);
          } else {
            response = rt.getFileSystemManager().readFileSync(url, "utf8");
            if ((type == 'atlas' || type == 'json') && typeof response !== "undefined") {
              response = JSON.parse(response);
            }
          }
          that.onLoaded(response);
        }, 0);
        return;//这里记得 return
      }
    } catch (error) {
    }
    // 添加适配代码结束，下面是原本 laya 代码
    var contentType;
    switch (type) {
      case "atlas":
      case "plf":
        contentType = "json";
        break;
      case "font":
        contentType = "xml";
        break;
      case "pkm":
        contentType = "arraybuffer";
        break
      default:
        contentType = type;
    }
    if (Loader.preLoadedMap[url]) {
      this.onLoaded(Loader.preLoadedMap[url]);
    } else {
      if (!this._http) {
        this._http = new HttpRequest();
        this._http.on(/*laya.events.Event.PROGRESS*/"progress", this, this.onProgress);
        this._http.on(/*laya.events.Event.ERROR*/"error", this, this.onError);
        this._http.on(/*laya.events.Event.COMPLETE*/"complete", this, this.onLoaded);
      }
      this._http.send(url, null, "get", contentType);
    }
  }
}

// ui
hook.onInit((width, height) => {
  if (typeof window !== "undefined" && typeof window['getAdapterInfo'] !== "undefined") {
    var stage = Laya.stage;
    var info = window['getAdapterInfo']({ width, height, scaleMode: Laya.stage.scaleMode });
    stage.width = info.rw;
    stage.height = info.rh;
  }
})
