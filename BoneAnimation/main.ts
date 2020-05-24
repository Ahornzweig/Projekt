namespace BoneAnimation {
    let show: HTMLImageElement;
    let input: HTMLInputElement;
    function init(): void {
        show = <HTMLImageElement>document.getElementById("1");
        show.style.cssText = "display:block;"
        input = <HTMLInputElement>document.querySelector("input");

        input.addEventListener("input", update);
    }

    function update(_event: Event): void {
        
        let id: string = "" + (input.value);
     
        let showNew: HTMLImageElement = <HTMLImageElement>document.getElementById(id);
        showNew.style.cssText = "display:block;"
        show.style.cssText = "display:hide;"
        show = showNew;
    }

    window.addEventListener("load", init);
}