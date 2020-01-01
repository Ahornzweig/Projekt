<<<<<<< HEAD
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

        img.style.left = "" + (scale) + "%";
        img.style.top = "" + (scale *20) + "%";
    }
}
=======
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

        img.style.left = "" + (scale) + "%";
        img.style.top = "" + (scale *20) + "%";
    }
}
>>>>>>> cf97ce6ef08b51f24832e6457d34801797e663bf
window.addEventListener("load", init);