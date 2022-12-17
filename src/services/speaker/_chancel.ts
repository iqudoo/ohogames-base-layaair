import peaks from "./_peaks";
import loadres from "./_loadres";

declare var AudioContext,
    webkitAudioContext,
    mozAudioContext,
    msAudioContext: any; // ADDED

const FixAudioContext = AudioContext || webkitAudioContext
    || mozAudioContext || msAudioContext;

const _CHANCELS = [];

export class SpeakerChancel {

    private _audioUrl;
    private _onErrorCallback;
    private _options;

    private audioCtx;
    private sourceNode;
    private analyserNode;
    private windowSize;
    private gaussianFilters;
    private amplitudeThreshold;
    private loadPromise: Promise<any>;
    private stopped = false;

    constructor(url, onError, options = {}) {
        this._audioUrl = url;
        this._onErrorCallback = onError;
        this._options = options;
        this.amplitudeThreshold = 0.02;
        this.audioCtx = new FixAudioContext({
            sampleRate: this._options && this._options.sampleRate || 44100
        });
        this.sourceNode = this.audioCtx.createBufferSource();
        this.analyserNode = this.audioCtx.createAnalyser();
        this.analyserNode.fftSize = this._options && this._options.fftSize || 2048;
        this.windowSize = this.analyserNode.frequencyBinCount;
        this.gaussianFilters = peaks.generateGaussianFilter(7, 5);
        this.sourceNode.disconnect();
        this.sourceNode.connect(this.analyserNode);
        this.play();
    }

    public get url() {
        return this._audioUrl;
    }

    public get position() {
        return this.audioCtx && this.audioCtx.currentTime || 0;
    }

    public get duration() {
        return this.sourceNode
            && this.sourceNode.buffer
            && this.sourceNode.buffer.duration || 0;
    }

    public get formant() {
        let currentAudioData = new Uint8Array(this.windowSize);
        this.analyserNode.getByteFrequencyData(currentAudioData);
        let currentAudioSpectrum = peaks.discreteCosineTransform(currentAudioData);
        let amplitudeSum = 0.0;
        for (var k = 0; k < currentAudioSpectrum.length; k++) {
            amplitudeSum += currentAudioSpectrum[k];
        }
        if (amplitudeSum >= this.amplitudeThreshold) {
            let formantArray = [];
            let smoothedAudioSpectrum = peaks.convoluteDataAndFilter(currentAudioSpectrum, this.gaussianFilters, "Repet");
            let { peakValues, peakPositions } = peaks.findLocalLargestPeaks(smoothedAudioSpectrum, 3);
            let frequencyUnit = this.audioCtx.sampleRate / this.windowSize;
            for (var i = 0; i < peakPositions.length; i++) {
                formantArray[i] = peakPositions[i] * (peakValues[i] / frequencyUnit);
            }
            let formantAverage = 0;
            formantArray.forEach(formantVal => {
                formantAverage += formantVal;
            });
            return formantAverage / formantArray.length;
        }
        return 0;
    }

    private loadAudioRes() {
        if (!this.loadPromise) {
            this.loadPromise = new Promise((resolve, reject) => {
                loadres.loadRes(this._audioUrl, resolve, () => {
                    this.loadPromise = null;
                    reject && reject();
                });
            });
        }
        return this.loadPromise;
    }

    public play() {
        this.loadAudioRes().then((audioData) => {
            this.audioCtx.decodeAudioData(audioData, (buffer) => {
                if (this.stopped) {
                    return;
                }
                this.sourceNode.buffer = buffer;
                this.sourceNode.connect(this.analyserNode);
                this.sourceNode.connect(this.audioCtx.destination);
                this.sourceNode.start();
            }, (e) => {
                let errorMsg = `error decoding audio data: ${this._audioUrl}`
                this._onErrorCallback && this._onErrorCallback(errorMsg, e)
            });
        }).catch(() => {
            let errorMsg = `load audio failure: ${this._audioUrl}`
            this._onErrorCallback && this._onErrorCallback(errorMsg)
        })
    }

    public stop() {
        this.stopped = true;
        this._onErrorCallback = null;
        try {
            let indexOf = _CHANCELS.indexOf(this);
            if (indexOf >= 0) {
                _CHANCELS.splice(indexOf, 1);
            }
            if (this.sourceNode) {
                this.sourceNode.stop();
            }
        } catch (error) {
        }
    }

}

function playSpeak(url, onError, options) {
    let cancel = new SpeakerChancel(url, onError, options);
    _CHANCELS.push(cancel);
    return cancel;
}

export default {
    playSpeak
}