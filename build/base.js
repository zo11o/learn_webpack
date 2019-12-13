// 公共配置
const { findSync } = require("../lib");
const Config = require("webpack-chain");
const config = new Config();
const files = findSync("config");
const path = require("path");

const resolve = p => {
    return path.join(process.cwd(), p);
};

module.exports = () => {
    const map = new Map();
    files.map(o => {
        const name = o
            .split("/")
            .pop()
            .replace(".js", "");
        return map.set(name, require(o)(config, resolve));
    });
    console.log(map);
    map.forEach((v, key) => {
        // css 配置
        if (key === "css") {
            v("css", /\.css$/);
        } else {
            v();
        }
    });
    return config;
};
