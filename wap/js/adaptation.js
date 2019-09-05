'use strict';
(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        // 获取页面的宽度
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
            return;
        }
        docEl.style.fontSize = clientWidth / 750 * 16 + 'px';
        console.log(docEl.style.fontSize);
    };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
})(document, window);