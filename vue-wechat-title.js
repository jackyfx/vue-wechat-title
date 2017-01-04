(function () {
    function install (Vue) {
        var setWechatTitle = function (title) {
            if (title === undefined) {
                return
            }
            document.title = title
            var mobile = navigator.userAgent.toLowerCase()
            if (/iphone|ipad|ipod/.test(mobile)) {
                var iframe = document.createElement('iframe')
                iframe.style.display = 'none'
                // 替换成站标favicon路径或者任意存在的较小的图片即可
                iframe.setAttribute('src', '/favicon.ico')
                var iframeCallback = function () {
                    setTimeout(function () {
                        iframe.removeEventListener('load', iframeCallback)
                        document.body.removeChild(iframe)
                    }, 0)
                }
                iframe.addEventListener('load', iframeCallback)
                document.body.appendChild(iframe)
            }
        }
        Vue.directive('wechat-title', {
            bind: function (title) {
                setWechatTitle(title)
            },
            update: function (newTitle) {
                setWechatTitle(newTitle)
            }
        })
    }

    if (typeof exports === 'object') {
        module.exports = install
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return install
        })
    } else if (window.Vue) {
        Vue.use(install)
    }
})()