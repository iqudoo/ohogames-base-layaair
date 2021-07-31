const path = require('path');
const version = require('./package.json').version;

function formatDate(input, fmt) {
    let date;
    if (input instanceof Date) {
        date = input;
    } else {
        date = new Date(input);
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S+': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
        }
    }
    return fmt;
}

let libVersion = `${version}.${formatDate(new Date(), "MMdd.HHmm")}`

const devOutputPath = path.resolve('./dist-dev');

const config = {
    entry: {
        'index': path.resolve('./src/index.ts'),
    },
    output: {
        path: devOutputPath,
        filename: '[name].js',
        globalObject: 'this',
        libraryTarget: 'umd',
    },
    externals: {
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            loose: true,
                            // debug: true,
                        }],
                    ],
                    plugins: [
                        'transform-class-properties',
                    ],
                },
            },
        }, {
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
            }, {
                loader: 'string-replace-loader',
                options: {
                    search: '\${lib_version}',
                    replace: libVersion,
                }
            }],
        }],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.jsx', '.tsx'],
    },
    devtool: 'source-map',
    mode: 'development',
};

module.exports = config;
