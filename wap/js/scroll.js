function mScroll(init) {
    if (!init.el) {
        return;
    }

    var inner = init.el.children[0];
    var scrollBar = document.createElement('div');
    css(inner, 'translateZ', 0.01);
    var startPoint = 0;
    var startEl = 0;
    var lastY = 0;
    var lastDis = 0;
    var lastTime = 0;
    var lastTimeDis = 0;
    var maxTranslate = init.el.clientHeight - inner.offsetHeight;
    if (!init.offBar) {
        var scale = init.el.clientHeight / inner.offsetHeight;
        inner.style.minHeight = '100%';
        scrollBar.style.cssText = `
        width:6px;
        background:rgba(0,0,0,.5);
        position:absolute;
        right:0;
        top:0;
        border-radius:3px;
        opacity:0;
        transition:.3s opacity;
    `;
        init.el.appendChild(scrollBar);
    }
    inner.addEventListener('touchstart', function (e) {
        maxTranslate = init.el.clientHeight - inner.offsetHeight;
        if (!init.scrollBar) {
            if (maxTranslate >= 0) {
                scrollBar.style.display = 'none';
            } else {
                scrollBar.style.display = 'block';
            }
            scale = init.el.clientHeight / inner.offsetHeight;
            scrollBar.style.height = init.el.clientHeight * scale + 'px';
            scrollBar.style.opacity = 1;
        }
        clearInterval(this.timer);
        startPoint = e.changedTouches[0].pageY;
        startEl = css(this, 'translateY');
        lastY = startEl;
        lastDis = 0;
        lastTime = new Date().getTime();
    });

    inner.addEventListener('touchmove', function (e) {
        var nowTime = new Date().getTime();
        var nowPoint = e.changedTouches[0].pageY;
        var dis = nowPoint - startPoint;
        var translateY = startEl + dis;
        css(this, 'translateY', translateY);
        (!init.scrollBar) && css(scrollBar, 'translateY', -translateY * scale);
        lastDis = translateY - lastY;
        lastY = translateY;
        lastTimeDis = nowTime - lastTime;
        lastTime = nowTime;
    });

    inner.addEventListener('touchend', function (e) {
        var type = 'easeOut';
        var speed = Math.round(lastDis / lastTimeDis * 10);
        speed = lastTimeDis <= 0 ? 0 : speed;
        var target = Math.round(speed * 20 + css(this, 'translateY'));
        // console.log(target);
        if (target > 0) {
            target = 0;
            type = 'backOut';
        } else if (target < maxTranslate) {
            target = maxTranslate;
        }
        MTween({
            el: this,
            target: {
                translateY: target
            },
            time: Math.round(Math.abs(target - css(this, 'translateY'))) * 1.8,
            type: type,
            callBack: function () {
                (!init.scrollBar) && (scrollBar.style.opacity = 0);
            },
            callIn: function () {
                if (!init.scrollBar) {
                    var translateY = css(inner, 'translateY');
                    css(scrollBar, 'translateY', -translateY * scale);
                }
            }
        });
    });
}