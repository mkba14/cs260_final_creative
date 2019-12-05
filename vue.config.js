
// vue.config.js
module.exports = {
    // options...
    devServer: {
        useLocalIp: false,
        public: 'http://assignments.primbu.com:3005',
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: 'http://assignments.primbu.com:3005',
            },
        },
    }
}