
//////////////////////////
/////  Env
//////////////////////////

const isLayaApp = () => {
    if (typeof window !== "undefined") {
        return window.hasOwnProperty("Laya");
    }
    return false;
}

const isConchApp = () => {
    if (typeof window !== "undefined") {
        return window.hasOwnProperty("conch");
    }
    return false;
}

//////////////////////////
/////  Version
//////////////////////////

let _lib_version = "${lib_version}";

function getVersion(): string {
    if (_lib_version.indexOf('${') === 0) {
        return '1.0.0';
    }
    return _lib_version;
}

//////////////////////////
/////  Debug
//////////////////////////

let _debugOn = '${debug}';

function isDebug() {
    if (_debugOn.indexOf('${') === 0) {
        return false;
    }
    if (_debugOn == "false" || _debugOn == "0") {
        return false;
    }
    return !!_debugOn;
}

function setDebug(debug) {
    _debugOn = debug;
}

function printDebug(message: any, ...options) {
    if (isDebug()) {
        console.log("[OHOGame] ", message, ...options);
    }
}

function printError(message: any, ...options) {
    if (isDebug()) {
        console.error("[OHOGame] ", message, ...options);
    }
}

//////////////////////////
/////  Env
//////////////////////////

let _env = '${env}';

function setEnv(env) {
    _env = env;
}

function getEnv() {
    if (_env.indexOf('${') === 0) {
        return "dev";
    }
    return _env;
}

//////////////////////////
/////  getClassName
//////////////////////////

let classNameMap = {};

export function getClassName(obj) {
    try {
        if (obj) {
            if (obj.name) {
                return obj.name;
            }
            if (classNameMap[obj]) {
                return classNameMap[obj];
            }
            let str = obj.toString();
            let arr;
            if (str.charAt(0) == '[') {
                arr = str.match(/\w+\s∗(\w+)\w+\s∗(\w+)/);
            } else {
                arr = str.match(/function\s*(\w+)/);
            }
            let name = "";
            if (arr && arr.length == 2) {
                name = arr[1];
            }
            classNameMap[obj] = name;
            return name;
        }
    } catch (e) {
    }
    return undefined;
}

export default {
    isLayaApp,
    isConchApp,
    getVersion,
    isDebug,
    setDebug,
    printError,
    printDebug,
    getEnv,
    setEnv
}