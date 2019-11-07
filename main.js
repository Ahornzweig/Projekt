"use strict";
function init() {
    let input = document.querySelector("input");
    console.log(input);
    input.addEventListener("input", update);
}
function update(_event) {
    let input = document.querySelector("input");
    let imgs = document.getElementsByClassName("img-hover-zoom");
    for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i].children[0];
        img.style.transform = "scale(" + input.value + ")";
        let scale = Number(input.value);
        img.style.left = "" + (40 * scale) + "px";
        img.style.top = "" + (30 * scale) + "px";
    }
}
window.addEventListener("load", init);
//# sourceMappingURL=main.js.map