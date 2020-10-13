import { onload } from "./onload";

export function loadJs(js, options = {}) {
    return onload().then(() => {
        return new Promise((resolve, reject) => {
            if (typeof document !== "undefined") {
                let script = document.createElement("script");
                Object.keys(options).forEach(key => {
                    script.setAttribute(key, options[key])
                });
                script.type = "text/javascript";
                script.src = js;
                script.onload = function () {
                    resolve(this);
                };
                document.body.appendChild(script);
            } else {
                reject();
            }
        })
    })
}