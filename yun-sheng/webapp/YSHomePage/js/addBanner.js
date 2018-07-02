//��ͼ�ֲ�
window.onload = function () {
    $(window).resize(function () {
//		debugger;
        if($(window).width()<940){
			
            $('#con').css({'width':250,'height':910});
            $('.indexprev').css({'transform':'rotate(90deg)','top':-50,'left':100});
            $('.pic1').css({'top':80, 'left':0});
            $('.pic2').css({'top':330, 'left':0});
            $('.pic3').css({'top':580, 'left':0});
            $('.pic4').css({'top':630, 'left':0});
            $('.pic5').css({'top':0, 'left':0});
            $('.pic6').css({'top':0, 'left':0});
            $('.pic7').css({'top':0, 'left':0});
            $('.pic8').css({'top':0, 'left':0});
            $('.pic9').css({'top':-170, 'left':0});
            $('.indexnext').css({'transform':'rotate(90deg)','top':800,'left':100});
        }else{
            $('#con').css({'width':1100,'height':320});
            $('.indexprev').css({'transform':'rotate(0deg)','top':50,'left':-80});
            $('.pic1').css({'top':0, 'left':0});
            $('.pic2').css({'top':0, 'left':1100});
            $('.pic3').css({'top':0, 'left':660});			          
            $('.indexnext').css({'transform':'rotate(0deg)','top':50,'right':-80});
        }
    });
    
    var con = document.getElementById('con');
    var oPrev = getByClass(con, 'indexprev')[0];
    var oNext = getByClass(con, 'indexnext')[0];
    var aLi = con.getElementsByTagName('li');
    var arr = [];
    for (var i = 0; i < aLi.length; i++) {
        var oImg = aLi[i].getElementsByTagName('img')[0];
        arr.push([parseInt(getStyle(aLi[i], 'left')), parseInt(getStyle(aLi[i], 'top')),getStyle(aLi[i], 'zIndex'), oImg.width, parseFloat(getStyle(aLi[i], 'opacity') * 100)]);
    }
    oPrev.onclick = function () {
        arr.push(arr[0]);
        arr.shift();
        for (var i = 0; i < aLi.length; i++) {
            var oImg = aLi[i].getElementsByTagName('img')[0];
            aLi[i].style.zIndex = arr[i][2];
            startMove(aLi[i], {left: arr[i][0], top: arr[i][1], opacity: arr[i][4]});
            startMove(oImg, {width: arr[i][3]});
        }
    };
    oNext.onclick = function () {
        autoMove();
    };
    var t=setInterval(function(){
//            autoMove();
    },4000);
    con.onmouseover=function(){
        clearInterval(t);
        this.onmouseout=function(){
            t=setInterval(function(){
//                    autoMove();
            },4000)
        }
    };
    function autoMove(){
        arr.unshift(arr[arr.length - 1]);
        arr.pop();
        for (var i = 0; i < aLi.length; i++) {
            var oImg = aLi[i].getElementsByTagName('img')[0];
            aLi[i].style.zIndex = arr[i][2];
            startMove(aLi[i], {left: arr[i][0], top: arr[i][1], opacity: arr[i][4]});
            startMove(oImg, {width: arr[i][3]});
        }
    }
    function getByClass(oParent, sClass) {
        var aResult = [];
        var aEle = oParent.getElementsByTagName('*');
        for (var i = 0; i < aEle.length; i++) {
            if (aEle[i].className == sClass) {
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    }
    function getStyle(obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        }
        else {
            return getComputedStyle(obj, false)[name];
        }
    }
    function startMove(obj, _json, fnEnd) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var bStop = true;
            for (var attr in _json) {
                var cur = 0;
                if (attr == 'opacity') {
                    cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                }
                else {
                    cur = parseInt(getStyle(obj, attr));
                }
                var speed = (_json[attr] - cur) / 6;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur != _json[attr]) bStop = false;
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                    obj.style.opacity = (cur + speed) / 100;
                }
                else {
                    obj.style[attr] = cur + speed + 'px';
                }
            }
            if (bStop) {
                clearInterval(obj.timer);
                if (fnEnd) fnEnd();
            }
        }, 30)
    }
};