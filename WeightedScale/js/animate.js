var minY = 0;
var maxY = 350;
var xL = 20;
var yL = 0;
var xR = 330;
var yR = 350;

function setWeights() {
    var wL = document.getElementById("leftWeight");
    var wR = document.getElementById("rightWeight");
    wL.style.left = xL + "px";
    wL.style.top = yL + "px";
    wR.style.left = xR + "px";
    wR.style.top = yR + "px";
}

function addWeight(w) {
    var wL = document.getElementById("leftWeight");
    var wR = document.getElementById("rightWeight");
    var idL = setInterval(lowerLeftWeight, 1);
    var idR = setInterval(raiseRightWeight, 1);
    
    var startL = wL.offsetTop;
    var startR = wR.offsetTop;
    var endL = wL.offsetTop + w;
    var endR = wR.offsetTop - w;
    console.log("w");
    console.log(w);
    
    console.log("yL");
    console.log(yL);
    console.log("startL");
    console.log(startL);
    console.log("endL,");
    console.log(endL);
    
    console.log("yR");
    console.log(yR);
    console.log("startR");
    console.log(startR);
    console.log("endR,");
    console.log(endR);
  
    function lowerLeftWeight() {
        if (yL == endL || yL == maxY) {
            clearInterval(idL);
        } else {
            yL++;
            wL.style.top = yL + 'px';
        }
    }
  
    function raiseRightWeight() {
        if (yR == endR || yR == minY) {
            clearInterval(idR);
        } else {
            yR--;
            wR.style.top = yR + 'px'; 
        }
    }
}

function subtractWeight(w) {
    var wL = document.getElementById("leftWeight");
    var wR = document.getElementById("rightWeight");
    var idL = setInterval(raiseLeftWeight, 1);
    var idR = setInterval(lowerRightWeight, 1);
    
    var startL = wL.offsetTop;
    var startR = wR.offsetTop;
    var endL = wL.offsetTop - w;
    var endR = wR.offsetTop + w;
  
    function raiseLeftWeight(w) {
        if (yL == endL ||yL == minY) {
            clearInterval(idL);
        } else {
            yL--;
            wL.style.top = yL + 'px';
        }
    }

    function lowerRightWeight(w) {
        if (yR == endR || yR == maxY) {
            clearInterval(idR);
        } else {
            yR++;
            wR.style.top = yR + 'px';
        }
    }
}