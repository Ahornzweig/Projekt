/* */
namespace interpolationskurven {
    export let crc2: CanvasRenderingContext2D;
    let handleInUse: Handle;
    let canvas: HTMLCanvasElement
    let touch: boolean = false;

    function main(): void {

        canvas = <HTMLCanvasElement>document.getElementById('curve');
        crc2 = canvas.getContext('2d');

        let box = document.getElementById('box');
        let timeVal: number = 700;


        let supportsBezierRange = (function () {
            let el = document.createElement('div');
            el.style.webkitTransitionTimingFunction = 'cubic-bezier(1,0,0,1.1)';
            return !!el.style.webkitTransitionTimingFunction.length;
        })();

        let handles = [
            new Handle(50, 180),
            new Handle(150, 180)
        ];

        let graph = new Graph();

        function getPos(event: any) {
            let mouseX = event.pageX - getOffSet(event.target).left;
            let mouseY = event.pageY - getOffSet(event.target).top;

            return {
                x: mouseX,
                y: mouseY
            };
        }


        function getOffSet(obj: any): any {
            let curleft = 0;
            let curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                }
                while (obj = obj.offsetParent);

                return {
                    left: curleft,
                    top: curtop
                };
            }
        }

        function onPress(event: Event) {
           

            event.preventDefault();
            event.stopPropagation(); //not sure if this is needed

            let cursorEvent = <MouseEvent>event;
            if(touch){
                cursorEvent = (<TouchEvent>event).touches[0];
            }
            let mouseCoordinates = getPos(cursorEvent),
                x = mouseCoordinates.x,
                y = mouseCoordinates.y;

            //check to see if over any handles
            for (let i = 0; i < handles.length; i++) {
                let current = handles[i],
                    curLeft = current.left,
                    curRight = current.right,
                    curTop = current.top,
                    curBottom = current.bottom;



                if (x >= curLeft &&
                    x <= curRight &&
                    y >= curTop &&
                    y <= curBottom
                ) {
                    handleInUse = current;



                    let selected: HTMLInputElement = <HTMLInputElement>document.querySelector('input[type="radio"]:checked');

                    selected.checked = false;
                    let custom: NodeListOf<HTMLInputElement> = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#options input[type="radio"]');
                    custom[custom.length - 1].checked = true;


                    document.addEventListener('mouseup', onRelease, false);
                    document.addEventListener('touchend', onRelease, false);

                    document.addEventListener('mousemove', onMove, false);
                    document.addEventListener('touchmove', onMove, false);

                }
            }
        }

        function onMove(event: Event) {

            let cursorEvent = <MouseEvent>event;
            if(touch){
                cursorEvent = (<TouchEvent>event).changedTouches[0];
            }
            

            let x = cursorEvent.pageX - getOffSet(canvas).left,
                y = cursorEvent.pageY - getOffSet(canvas).top;

            if (x > graph.width) {
                x = graph.width;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > canvas.height) {
                y = canvas.height;
            }
            if (y < 0) {
                y = 0;
            }

            handleInUse.x = x;
            handleInUse.y = y;

            updateDrawing();
        }



        function onRelease(): void {

            document.removeEventListener('mousemove', onMove, false);
            document.removeEventListener('mouseup', onRelease, false);

            document.removeEventListener('touchend', onRelease, false);
            document.removeEventListener('touchmove', onMove, false);
        }



        canvas.addEventListener('mousedown', function(event:Event){
            touch=false;
            onPress(event);
        } , false);
        canvas.addEventListener('touchstart', function(event:Event){
            touch=true;
            onPress(event)
        }, false);

        function updateDrawing() {

            crc2.clearRect(0, 0, canvas.width, canvas.height);
            // draw graph
            graph.draw();
            // get handles
            let cp1 = handles[0],
                cp2 = handles[1];
            // draw bezier curve
            crc2.save();
            crc2.strokeStyle = '#4C84D3';
            crc2.lineWidth = 3;
            crc2.beginPath();
            crc2.moveTo(graph.x, graph.y + graph.height);
            //start at bottom left, first handle is cp1, second handle is cp2, end is top right
            crc2.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, graph.width, graph.y);
            crc2.stroke();
            crc2.restore();
            // draw anchor point lines
            
            crc2.strokeStyle = '#f00';
            crc2.beginPath();
            crc2.moveTo(graph.x, graph.y + graph.height);
            crc2.lineTo(cp1.x, cp1.y);
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(graph.width, graph.y);
            crc2.lineTo(cp2.x, cp2.y);
            crc2.stroke();
         
            for (let i = 0; i < handles.length; i++) {
                handles[i].draw();
            }

        }

        function setTransitions() {

            let cp1 = handles[0],
                cp2 = handles[1];

            let x1 = (cp1.x / graph.width).toFixed(3),
                y1 = ((graph.height + graph.y - cp1.y) / graph.height).toFixed(3),
                x2 = (cp2.x / canvas.width).toFixed(3),
                y2 = ((graph.height + graph.y - cp2.y) / graph.height).toFixed(3),

                points = '(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ')';


            box.style.webkitTransition =
                box.style.transition =
                'all ' + timeVal + 'ms cubic-bezier' + points;

            if (!supportsBezierRange) {

                let wy1, wy2;

                if (Number(y1) > 1) wy1 = 1;
                if (Number(y1) < 0) wy1 = 0;
                if (Number(y2) > 1) wy2 = 1;
                if (Number(y2) < 0) wy2 = 0;

                box.style.webkitTransition = 'all ' + timeVal + 'ms cubic-bezier' + '(' + x1 + ', ' + wy1 + ', ' + x2 + ', ' + wy2 + ')';
            }
        }

        function presetChange() {
           
            let selected = document.querySelector('input[type="radio"]:checked');

            let coordinates: string[] = (<HTMLInputElement>selected).value.split(','),
                cp1 = handles[0],
                cp2 = handles[1];

            cp1.x = Number(coordinates[0]) * graph.width;
            cp1.y = graph.y + graph.height - (Number(coordinates[1]) * graph.height);
            cp2.x = Number(coordinates[2]) * graph.width;
            cp2.y = graph.y + graph.height - (Number(coordinates[3]) * graph.height);

            updateDrawing();
        }

        let options = document.getElementById("options");
        options.addEventListener("input", presetChange);

        let set = true;

        let startButton: HTMLInputElement = document.querySelector(".testButton");
        
        startButton.addEventListener("mousedown", setTweenClass)

        function setTweenClass(): void {
            setTransitions();
            let box = document.querySelector("#box");

            if (set) {
                box.classList.add("tween");
                set = false;
            } else if (!set) {
                box.classList.remove("tween");
                set = true;
            }
            startMovement();
        }

        function startMovement() {

            document.getElementById("helper").style.display = "block";
            document.getElementById("helper").style.animation = "helper 700ms";
            setTimeout(function () {
                document.getElementById("helper").style.display = "none";
                document.getElementById("helper").style.animation = "";
            }, 700);
        }

        setTransitions();
        presetChange()
    }

    window.addEventListener("load", main);

}