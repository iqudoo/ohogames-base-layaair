import looper from '../../utils/looper';
import chancel, { SpeakerChancel } from './_chancel';

const vowelsByFormantJP = ["i", "u", "e", "o", "a"];
const vowelFormantFloorJP = [0, 500, 600, 900, 1200];

const vowelsByFormantCN = ["i", "v", "u", "e", "o", "a"];
const vowelFormantFloorCN = [0, 200, 500, 600, 900, 1200];

function getVowelByFormant(formantValue, language) {
    let result = "-";
    let currentVowels = vowelsByFormantCN;
    let currentVowelFormantCeilValues = vowelFormantFloorCN;
    if (language == 'jp' || language == 'japanese') {
        currentVowels = vowelsByFormantJP;
        currentVowelFormantCeilValues = vowelFormantFloorJP;
    }
    for (var m = 0; m < currentVowelFormantCeilValues.length; m++) {
        if (formantValue > currentVowelFormantCeilValues[m]) {
            result = currentVowels[m];
        }
    }
    return result;
}

function fixWechatAudioPlay(callback) {
    if (window && window['WeixinJSBridge']) {
        try {
            window['WeixinJSBridge'].invoke("getNetworkType", {}, () => {
                callback && callback();
            });
        } catch (e) {
            callback && callback();
        }
    } else {
        callback && callback();
    }
}

class SpeakerController {

    _onPlay = null;
    _onStop = null;
    _onError = null;
    _onProgress = null;
    _onComplete = null;
    _options = null;
    _playTime = 0;
    _auidoUrl = null;
    _position = -1;
    _duration = -1;
    _formant = null;
    _speaking = false;
    _language = "chinese";
    _chancel: SpeakerChancel = null;

    constructor(options) {
        this._options = options;
    }

    _update() {
        if (this._chancel) {
            this._formant = this._chancel.formant;
            this._position = this._chancel.position;
            this._duration = this._chancel.duration;
            if (!this._speaking && this._position > 0) {
                this._speaking = true;
                this._onPlay && this._onPlay();
            }
            if (this._speaking && this._duration > 0) {
                if (this._position > this._duration) {
                    this._onComplete && this._onComplete();
                    this.stop();
                } else {
                    this._onProgress && this._onProgress({
                        position: this._position,
                        duration: this._duration,
                    });
                }
            } else if (Date.now() - this._playTime > 2000) {
                this._onError && this._onError();
                this.stop();
            }
        }
    }

    public get url() {
        return this._auidoUrl;
    }

    public get position() {
        return this._position;
    }

    public get duration() {
        return this._duration;
    }

    public onPlay(callback) {
        this._onPlay = callback;
    }

    public onStop(callback) {
        this._onStop = callback;
    }

    public onProgress(callback) {
        this._onProgress = callback;
    }

    public onComplete(callback) {
        this._onComplete = callback;
    }

    public onError(callback) {
        this._onError = callback;
    }

    public getFormant() {
        if (!this.isSpeaking()) {
            return 0;
        }
        return this._formant;
    }

    public getVowel() {
        return getVowelByFormant(this.getFormant(), this._language);
    }

    public isSpeaking() {
        return this._speaking;
    }

    public speak(url, language = 'chinese') {
        this._auidoUrl = url;
        this._language = language;
        fixWechatAudioPlay(() => {
            if (this._auidoUrl) {
                this.stop();
                this._playTime = Date.now();
                this._chancel = chancel.playSpeak(this._auidoUrl, this._onError, this._options);
                looper.loop(this, this._update);
            }
        });
    }

    public stop() {
        if (!this._chancel) {
            return;
        }
        this._onStop && this._onStop();
        this._chancel.stop();
        this._chancel = null;
        this._speaking = false;
        looper.clear(this, this._update);
    }

}

function create(options) {
    return new SpeakerController(options);
}

export default {
    create
}