/**
 * Created by zhaoya on 2016/4/8.
 */
var mpage0 = {
    id:0,
    name:"mpage0",
    pre:null,
    next:"mpage1",
    iscurrent:"true"
};
var mpage1 = {
    id:1,
    name:"mpage1",
    pre:"mpage0",
    next:"mpage2",
    iscurrent:"false"
};
var mpage2 = {
    id:2,
    name:"mpage2",
    pre:"mpage1",
    next:null,
    iscurrent:"false"
};
var pages = [mpage0,mpage1,mpage2];
$(function(){
    isTouchDevice();
    var currentPage = mpage0;
    //全局变量，触摸开始位置
    var startX = 0, startY = 0;
    //touchstart事件
    function touchSatrtFunc(evt) {
        console.log("start");
        try
        {
            evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startX = x;
            startY = y;
        }
        catch (e) {
            alert('Error0：' + e.message + '刷新一下页面吧');
        }
//            return false;
    }
    //touchmove事件，这个事件无法获取坐标
    function touchMoveFunc(evt) {
        console.log("move");
//            alert("move");
        //如果处于动画状态 退出
        if($(".mpage").is(":animated")){
            console.log("wait! wait!");
            return;
        }
        try
        {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标

            var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
            var toppositon=0;
            //判断滑动方向
//                if (x - startX != 0) {
//                    text += '<br/>左右滑动';
//                }
            //down
            if (y - startY > 0) {
                if(currentPage.pre != null){
                    $("#" + currentPage.name).css({"z-index":"2"});
                    $("#" + currentPage.name).siblings().css({"z-index":0});
                    $("#"+currentPage.pre).show().css({"top":-$(".container").height() + y - startY + "px","z-index":"3"});
                }
            }
            //up
            if (y - startY < 0) {
                if(currentPage.next != null){
                    $("#" + currentPage.name).css({"z-index":"2"});
                    $("#" + currentPage.name).siblings().css({"z-index":0});
                    $("#"+currentPage.next).show().css({"top":$(".container").height() + y - startY + "px","z-index":"3"});
                }
            }
        }
        catch (e) {
            alert('Error1：' + e.message + '刷新一下页面吧');
        }
    }

    //touchend事件
    function touchEndFunc(evt) {
        console.log("end");
        //如果处于动画状态 退出
        if($(".mpage").is(":animated")){
            console.log("wait wait");
            return;
        }
        try {
            var y = evt.changedTouches[0].pageY;
            //down
            if(y - startY >= 0){
                //异常移动
                if(currentPage.pre == null){
                    pageresetpositon(currentPage.name);
                }
                else{
                    if(Math.abs(y - startY) < $(".container").height() / 8){
                        $("#" + currentPage.pre).animate({top:-$(".container").height() + "px"},function(){
                            pageresetpositon(currentPage.name);
                        });
                    }
                    else{
                        $("#" + currentPage.pre).animate({top:"0"},function(){
                            currentPage = pages[currentPage.id - 1];
                            pageresetpositon(currentPage.name);
                        });
                    }
                }
            }
            //up
            if(y - startY <= 0){
                //异常移动
                if(currentPage.next == null){
                    pageresetpositon(currentPage.name);
                }
                else{
                    if(Math.abs(y - startY) < $(".container").height() / 8){
                        $("#" + currentPage.next).animate({top:$(".container").height() + "px"},function(){
                            pageresetpositon(currentPage.name);
                        });
                    }
                    else{
                        $("#" + currentPage.next).animate({top:"0"},function(){
                            currentPage = pages[currentPage.id + 1];
                            pageresetpositon(currentPage.name);
                        });
                    }
                }
            }
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        }

        catch (e) {
            alert('touchEndFunc：' + e.message);
        }
    }
    function pageresetpositon(name){
        $("#"+name).css({"z-index":"2"}).siblings().css({"z-index":"0","top":"0"});
    }

    //绑定事件
    function bindEvent() {

        document.getElementById("container").addEventListener('touchstart', touchSatrtFunc, false);
        document.getElementById("container").addEventListener('touchmove', touchMoveFunc, false);
        document.getElementById("container").addEventListener('touchend', touchEndFunc, false);
        document.getElementById("gogo").addEventListener('touchstart', function(){
            console.log("i am clicked ");
            window.location.href="http://www.baidu.com";
        }, false);

//            document.addEventListener('touchstart', touchSatrtFunc, false);
//            document.addEventListener('touchmove', touchMoveFunc, false);
//            document.addEventListener('touchend', touchEndFunc, false);
    }

    //判断是否支持触摸事件
    function isTouchDevice() {
        //document.getElementById("version").innerHTML = navigator.appVersion;
        try {
            document.createEvent("TouchEvent");
            bindEvent(); //绑定事件
        }
        catch (e) {
//                alert("不支持TouchEvent事件！" + e.message);
        }
    }

});

//  window.onload = isTouchDevice;