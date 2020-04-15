let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let container: HTMLDivElement;
let target: HTMLDivElement;
let lines: any = [];
let image: ImageData;
let zoom: number = 2;

function main(): void {
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");

    canvas.style.width = "500px";
    canvas.style.height = "400px";
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";

    container = <HTMLDivElement>document.getElementById("container");

    container.addEventListener("mousedown", function (_e: MouseEvent): void {
        if ((<HTMLDivElement>_e.target).getAttribute("class") == "points") {
            target = <HTMLDivElement>_e.target;
            container.addEventListener("mousemove", movePoint);

        }
    });

    document.addEventListener("mouseup", function (): void {
        container.removeEventListener("mousemove", movePoint);
    });


    let pointOne: HTMLDivElement = document.createElement("div");

    pointOne.setAttribute("id", "pointOne");
    pointOne.setAttribute("class", "points");
    container.appendChild(pointOne);
    lines["pointOne"] = [100 / zoom, 100 / zoom];

    let pointTwo: HTMLDivElement = document.createElement("div");

    pointTwo.setAttribute("id", "pointTwo");
    pointTwo.setAttribute("class", "points");
    container.appendChild(pointTwo);
    lines["pointTwo"] = [400 / zoom, 300 / zoom];

    let pointThree: HTMLDivElement = document.createElement("div");

    pointThree.setAttribute("id", "pointThree");
    pointThree.setAttribute("class", "points");
    container.appendChild(pointThree);
    lines["pointThree"] = [100 / zoom, 300 / zoom];
    draw();

    let on: HTMLButtonElement = <HTMLButtonElement>document.getElementById("on");
    let off: HTMLButtonElement = <HTMLButtonElement>document.getElementById("off");

    off.addEventListener("click", function () {
        canvas.style.imageRendering = "pixelated";
        this.className = "active";
        on.className = ""
    });

    on.addEventListener("click", function () {
        canvas.style.imageRendering = "auto";
        this.className = "active";
        off.className = ""
    })
}

function movePoint(_e: MouseEvent): void {
    let x: number = _e.pageX - container.offsetLeft + (container.offsetWidth / 2);
    let y: number = _e.pageY - container.offsetTop;

    if (x > (0 + target.offsetWidth / 2) && x < (container.offsetWidth - target.offsetWidth / 2) && y > (0 + target.offsetHeight / 2) && y < (container.offsetHeight - target.offsetHeight / 2)) {
        console.log("true");
        target.style.cssText = "top:" + y + "px;left:" + x + "px";

        switch (target.id) {
            case "pointOne":
                lines[target.id] = [x / zoom, y / zoom];
                break;
            case "pointTwo":
                lines[target.id] = [x / zoom, y / zoom];
                break;
            case "pointThree":
                lines[target.id] = [x / zoom, y / zoom];
                break;
        }
        draw();
    }
}

function draw(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(lines["pointOne"][0], lines["pointOne"][1]);
    ctx.lineTo(lines["pointTwo"][0], lines["pointTwo"][1]);
    ctx.lineTo(lines["pointThree"][0], lines["pointThree"][1]);
    ctx.lineTo(lines["pointOne"][0], lines["pointOne"][1]);
    ctx.stroke();
    image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(image, 0, 0);
}


window.addEventListener("load", main);