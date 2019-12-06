
// vue.config.js
let domain = 'cs260.mka11en.com' //'assignments.primbu.com'
let server = 'http://'+domain+':3005'
module.exports = {
    // options...
    devServer: {
        useLocalIp: false,
        public: server,
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: server,
            },
        },
    }
}