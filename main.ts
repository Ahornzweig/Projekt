function init(): void {

    let input: HTMLInputElement = document.querySelector("input");
    console.log(input)
    input.addEventListener("input", update);
}

function update(_event: Event): void {
    let input: HTMLInputElement = document.querySelector("input");

    let imgs: any = document.getElementsByClassName("img-hover-zoom");
    for (let i: number = 0; i < imgs.length; i++) {
        let img: any = imgs[i].children[0];
        img.style.transform = "scale(" + input.value + ")";
        let scale: number = Number(input.value);

        img.style.left = "" + (40*scale) + "px";
        img.style.top = "" + (30*scale) + "px";
    }
}
window.addEventListener("load", init);