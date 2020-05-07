namespace Transformations {
    let transX: number = -50;
    let posX: number = -50;

    let transY: number = 50;
    let posY: number = 50;

    let skX: number = 0;
    let skewedX: number = 0;

    let skY: number = 0;
    let skewedY: number = 0;

    let totation: number = 0;
    let rotated: number = 0;

    let first: string = "translate";
    let second: string = "skew";
    let third: string = "rotate";

    let img: HTMLImageElement;

    function main(): void {

        img = document.querySelector("img");

        let inputX: HTMLInputElement = <HTMLInputElement>document.getElementById("translateX");
        inputX.addEventListener("input", translateX);

        let inputY: HTMLInputElement = <HTMLInputElement>document.getElementById("translateY");
        inputY.addEventListener("input", translateY);

        let skewInpX: HTMLInputElement = <HTMLInputElement>document.getElementById("skewX");
        skewInpX.addEventListener("input", skewX);

        let skewInpY: HTMLInputElement = <HTMLInputElement>document.getElementById("skewY");
        skewInpY.addEventListener("input", skewY);

        let rotation: HTMLInputElement = <HTMLInputElement>document.getElementById("rotate");
        rotation.addEventListener("input", rotate);


    }
    function getTransformation(): string {

        let result: string = "";

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

    function translateX(_e: Event): void {

        let x: number = Number((_e.target as HTMLInputElement).value);
        posX = transX + x;
        let transform: string = getTransformation();
        img.style.transform = transform;
    }

    function translateY(_e: Event): void {

        let y: number = Number((_e.target as HTMLInputElement).value);
        posY = transY - y;
        let transform: string = getTransformation();
        img.style.transform = transform;
    }

    function skewX(_e: Event): void {

        let x: number = Number((_e.target as HTMLInputElement).value);
        skewedX = skX - x;
        let transform: string = getTransformation();
        img.style.transform = transform;
    }

    function skewY(_e: Event): void {

        let y: number = Number((_e.target as HTMLInputElement).value);
        skewedY = skY + y;
        let transform: string = getTransformation();
        img.style.transform = transform;
    }


    function rotate(_e: Event): void {
        console.log("test");
        let rot: number = Number((_e.target as HTMLInputElement).value);
        rotated = totation + rot;
        let transform: string = getTransformation();
        img.style.transform = transform;
    }

    document.addEventListener("DOMContentLoaded", main);

}