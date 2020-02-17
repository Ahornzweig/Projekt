console.log(this.square);
this.stop;

let square = this.square;


let body = document.querySelector('body');
let wrapper = document.createElement("div");
wrapper.className = "controls-wrapper";
wrapper.style.cssText = "display: flex; justify-content: space-evenly; max-Width: 500px; margin:auto";
//wrapper.innerText="test";
body.appendChild(wrapper);

let input1 = div = document.createElement("input");
input1.className = "red";
input1.value = 0;
input1.min = 0;
input1.max = 252;
input1.step = 1;

let input2 = div = document.createElement("input");
input2.className = "green";
input2.value = 0;
input2.min = 0;
input2.max = 252;
input2.step = 1;

let input3 = div = document.createElement("input");
input3.className = "blue";
input3.value = 0;
input3.min = 0;
input3.max = 252;
input3.step = 1;

input1.type = "range";
input2.type = "range";
input3.type = "range";

let colorContainer = document.createElement("div");
let text = document.createElement("p");
text.innerText = "Farbauswahl";
colorContainer.appendChild(text);
wrapper.appendChild(colorContainer);

colorContainer.appendChild(input1);
colorContainer.appendChild(input2);
colorContainer.appendChild(input3);
colorContainer.style.cssText = "display: flex; flex-direction: column; max-Width: 200px";

let lineContainer = document.createElement("div");
wrapper.appendChild(lineContainer);
let text2 = document.createElement("p");
text2.innerText = "Linienstärke";

let inputLine = div = document.createElement("input");
inputLine.className = "line";
inputLine.value = 1;
inputLine.min = 1;
inputLine.max = 10;
inputLine.step = 0.5;

inputLine.type = "range";
lineContainer.appendChild(text2);
lineContainer.appendChild(inputLine);
lineContainer.style.cssText = "display: flex; flex-direction: column; max-Width: 200px";

input1.addEventListener("input", changeColor);
input2.addEventListener("input", changeColor);
input3.addEventListener("input", changeColor);
inputLine.addEventListener("input", changeLine);

function changeColor() {
    console.log(input1.value, "red");
    console.log(input2.value, "green");
    console.log(input3.value, "blue");
}

function changeLine() {
    console.log(inputLine.value, "line");

}

//////////////////

this.stop;


let square = this.square;


let body = document.querySelector('body');
let wrapper = document.createElement("div");
wrapper.className = "controls-wrapper";
wrapper.style.cssText = "display: flex; justify-content: space-evenly; max-Width: 550px; margin:auto";
//wrapper.innerText="test";
body.appendChild(wrapper);

let shapeContainer = document.createElement("div");
wrapper.appendChild(shapeContainer);
let text3 = document.createElement("p");
text3.innerText = "Form";

let inputScale = div = document.createElement("input");
inputScale.className = "selectTrans";
inputScale.type = "checkbox";
inputScale.name = "scale";
inputScale.id = "checkScale";

let labelScale = div = document.createElement("label");

let inputRot = div = document.createElement("input");
inputRot.className = "selectTrans";
inputRot.type = "checkbox";
inputRot.name = "rot";
inputRot.id = "checkRot";

let labelRot = div = document.createElement("label");

shapeContainer.appendChild(text3);
shapeContainer.appendChild(labelScale);
labelScale.appendChild(inputScale);
var myvariable = document.createTextNode('Viereck');
labelScale.appendChild(myvariable);

shapeContainer.appendChild(labelRot);
labelRot.appendChild(inputRot);
var myvariable = document.createTextNode('Dreieck');
labelRot.appendChild(myvariable);
shapeContainer.style.cssText = "display: flex; flex-direction: column; width: 100px";


let exContainer = document.createElement("div");
wrapper.appendChild(exContainer);
let text2 = document.createElement("p");
text2.innerText = "Durchführung";

let inputEx = div = document.createElement("input");
inputEx.className = "execution";
inputEx.value = 1;
inputEx.min = 1;
inputEx.max = 10;
inputEx.step = 0.5;

inputEx.type = "range";
exContainer.appendChild(text2);
exContainer.appendChild(inputEx);
exContainer.style.cssText = "display: flex; flex-direction: column; width: 200px";


inputEx.addEventListener("input", changeEx);

let newGreen;
let newRed;
let newBlue;

function changeEx() {
    console.log("ex");

}


function test(e) {

    let type = e.path[0].getAttribute("name");

    switch (type) {

        case "scale":
            if (!inputScale.checked) {
                if (orderScher > orderScale) {
                    orderScher++;
                }
                if (orderRot > orderScale) {
                    orderRot++;
                }
                orderScale = 0;
            } else {
                for (let i = 1; i < 4; i++) {
                    if (orderRot != i && orderScher != i) {
                        orderScale = i;
                    }
                }
            }
            break;

        case "scherung":
            if (!inputScher.checked) {
                if (orderScale > orderScher) {
                    orderScale++;
                }
                if (orderRot > orderScher) {
                    orderRot++;
                }
                orderScher = 0;
            } else {
                for (let i = 1; i < 4; i++) {
                    if (orderRot != i && inputScale != i) {
                        orderScher = i;
                    }
                }
            }
            break;

        case "rot":
            if (!inputRot.checked) {
                if (orderScale > orderRot) {
                    orderScale++;
                }
                if (orderScher > orderRot) {
                    orderScher++;
                }
                orderRot = 0;
            } else {
                for (let i = 1; i < 4; i++) {
                    if (orderScher != i && inputScale != i) {
                        orderRot = i;
                    }
                }
            }
            break;
    }
    console.log(orderScale, orderScher, orderRot);
}


