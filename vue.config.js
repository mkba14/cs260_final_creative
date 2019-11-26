// vue.config.js
var myPort = 4200
var nodePort = 3000
var host = "cs260.mka11en.com"
module.exports = {
    // options...
    devServer: {
        useLocalIp: false,
        public: host + ':' + myPort,
        proxy: {
            '^/api': {
                target: 'http://' + host + ':' + nodePort,
            }
        }
        //disableHostCheck: true
    }
}