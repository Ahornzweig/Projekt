"use strict";
var BoneAnimation;
(function (BoneAnimation) {
    let show;
    let input;
    function init() {
        show = document.getElementById("1");
        show.style.cssText = "display:block;";
        input = document.querySelector("input");
        input.addEventListener("input", update);
    }
    function update(_event) {
        let id = "" + (input.value);
        let showNew = document.getElementById(id);
        showNew.style.cssText = "display:block;";
        show.style.cssText = "display:hide;";
        show = showNew;
    }
    window.addEventListener("load", init);
})(BoneAnimation || (BoneAnimation = {}));
//# sourceMappingURL=main.js.map