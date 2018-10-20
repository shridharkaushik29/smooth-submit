const path = require("path");

module.exports = (env = {}) => {
    return {
        mode: env.mode,
        output: {
            path: path.resolve(__dirname, "./"),
            filename: env.mode === "development" ? "smooth-submit.js" : "smooth-submit.min.js"
        },
        externals: {
            jquery: "jQuery"
        }
    }
}