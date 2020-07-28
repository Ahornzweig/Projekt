"use strict";
var aufbauVektoren;
(function (aufbauVektoren) {
    let canvas;
    let ctx;
    let lineWidth = 5;
    let r = 0;
    let g = 0;
    let b = 0;
    function main() {
        canvas = document.getElementsByTagName("canvas")[0];
        ctx = canvas.getContext("2d");
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.beginPath();
        ctx.moveTo(200, 100);
        ctx.lineTo(250, 175);
        ctx.lineTo(150, 175);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(100, 150);
        ctx.lineTo(200, 150);
        ctx.lineTo(200, 250);
        ctx.lineTo(100, 250);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        document.getElementById("controls").addEventListener("input", update);
    }
    function update(_e) {
        let target = _e.target.getAttribute("id");
        let value = Number(_e.target.value);
        console.log(target);
        switch (target) {
            case "red":
                r = value;
                break;
            case "green":
                g = value;
                break;
            case "blue":
                b = value;
                break;
            case "line":
                lineWidth = value;
                break;
        }
        draw();
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.beginPath();
        ctx.moveTo(200, 100);
        ctx.lineTo(250, 175);
        ctx.lineTo(150, 175);
        ctx.closePath();
        if (lineWidth != 0) {
            ctx.stroke();
        }
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(100, 150);
        ctx.lineTo(200, 150);
        ctx.lineTo(200, 250);
        ctx.lineTo(100, 250);
        ctx.closePath();
        if (lineWidth != 0) {
            ctx.stroke();
        }
        ctx.fill();
    }
    window.addEventListener("load", main);
})(aufbauVektoren || (aufbauVektoren = {}));
//# sourceMappingURL=main.js.map