/**
 * Created by zhaoya on 2016/4/5.
 */
$(function(){

});



/* Define the number of leaves to be used in the animation */
const NUMBER_OF_LEAVES = 10;
const LEAVES_SPEED = 200;

/*
 Called when the "Falling Leaves" page is completely loaded.
 */
function init()
{
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('mpage0');
    /* Fill the empty container with new leaves */
    for (var i = 0; i < NUMBER_OF_LEAVES; i++)
    {
        container.appendChild(createALeaf(i));
    }
}

function createALeaf(id)
{
    /* Start by creating a wrapper div, and an empty img element */

    var image = document.createElement('img');
    image.src = 'img/realLeaf' + randomInteger(1, 1) + '.png';
    var leafDiv = document.createElement('div');
    leafDiv.setAttribute("class","leafdemobox");
    leafDiv.appendChild(image);
    var n = 0;
    var nleft = [],ntop=[], nroute=[];
    var deltx = 100;
    var delty = 200;
    for (;;n++){
        if(0==n){
            nleft[0] = randomInteger(-100, 200);
            ntop[0] = randomInteger(-300, -100);
            continue;
        }
        else{
            nleft[n] = nleft[n-1] + Math.floor(Math.random() * Math.random()>0.2?(deltx + deltx*Math.random() ):(deltx + deltx*Math.random() )/3) * (Math.random()>0.1?1:-1);
            ntop[n]  = ntop[n-1]  + Math.floor(Math.random() * (delty + delty*Math.random() ) );
        }

        if(ntop[n]>document.body.clientHeight){
            break;
        }
    }
    leafDiv.style.left = pixelValue(nleft[0]);
    leafDiv.style.top = pixelValue(ntop[0]);
    //console.log(n,nleft,ntop);
    var deltypersent = Math.floor(100/n);
    var deltypersentsum = 0;
    var keyframe='';
    keyframe += '        @keyframes myfirst'+id+'{';
    keyframe += '0%   {left:' + nleft[0] + 'px; top:' + ntop[0] + ';transform: rotate(10deg);}';
    var N = n;
    while(--n){
        deltypersentsum += deltypersent;
        keyframe += deltypersentsum +'%   {left:' + nleft[N-n] + 'px; top:' + ntop[N-n] + ';transform: rotate(10deg);}'
    }
    keyframe += '100% {left:' + nleft[N] + 'px; top:' + ntop[N] + 'px;transform: rotate(50deg);}';
    keyframe += '}';

    $("#laterstyle").append(keyframe);
    var falltime = 15 + 5 * Math.random();
    $(leafDiv).css({animation: "myfirst"+id+" "+falltime+"s linear 0s infinite normal"});



    return leafDiv;
}

function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}

function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}

function pixelValue(value)
{
    return value + 'px';
}

function durationValue(value)
{
    return value + 's';
}


$(function () { init();})