"use strict";
var Transformations;
(function (Transformations) {
    let transX = -50;
    let posX = -50;
    let transY = 50;
    let posY = 50;
    let skX = 0;
    let skewedX = 0;
    let skY = 0;
    let skewedY = 0;
    let totation = 0;
    let rotated = 0;
    let first = "translate";
    let second = "skew";
    let third = "rotate";
    let img;
    function main() {
        img = document.querySelector("img");
        let inputX = document.getElementById("translateX");
        inputX.addEventListener("input", translateX);
        let inputY = document.getElementById("translateY");
        inputY.addEventListener("input", translateY);
        let skewInpX = document.getElementById("skewX");
        skewInpX.addEventListener("input", skewX);
        let skewInpY = document.getElementById("skewY");
        skewInpY.addEventListener("input", skewY);
        let rotation = document.getElementById("rotate");
        rotation.addEventListener("input", rotate);
    }
    function getTransformation() {
        let result = "";
        switch (first) {
            case "translate":
                result += "translate(" + posX + "%," + posY + "%)";
                break;
            case "skew":
                result += "skew(" + skewedX + "deg," + skewedY + "deg)";
                break;
            case "rotate":
                result += "rotate(" + rotated + "deg)";
                break;
        }
        switch (second) {
            case "translate":
                result += "translate(" + posX + "%," + posY + "%)";
                break;
            case "skew":
                result += "skew(" + skewedX + "deg," + skewedY + "deg)";
                break;
            case "rotate":
                result += "rotate(" + rotated + "deg)";
                break;
        }
        switch (third) {
            case "translate":
                result += "translate(" + posX + "%," + posY + "%)";
                break;
            case "skew":
                result += "skew(" + skewedX + "deg," + skewedY + "deg)";
                break;
            case "rotate":
                result += "rotate(" + rotated + "deg)";
                break;
        }
        return result;
    }
    function translateX(_e) {
        let x = Number(_e.target.value);
        posX = transX + x;
        let transform = getTransformation();
        img.style.transform = transform;
    }
    function translateY(_e) {
        let y = Number(_e.target.value);
        posY = transY - y;
        let transform = getTransformation();
        img.style.transform = transform;
    }
    function skewX(_e) {
        let x = Number(_e.target.value);
        skewedX = skX - x;
        let transform = getTransformation();
        img.style.transform = transform;
    }
    function skewY(_e) {
        let y = Number(_e.target.value);
        skewedY = skY + y;
        let transform = getTransformation();
        img.style.transform = transform;
    }
    function rotate(_e) {
        console.log("test");
        let rot = Number(_e.target.value);
        rotated = totation + rot;
        let transform = getTransformation();
        img.style.transform = transform;
    }
    document.addEventListener("DOMContentLoaded", main);
})(Transformations || (Transformations = {}));
//# sourceMappingURL=main.js.map