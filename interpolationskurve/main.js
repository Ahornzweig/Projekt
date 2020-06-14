var canvas = document.getElementById('curve'),
    ctx = canvas.getContext('2d'),
    box = document.getElementById('box'),
    supportsTouch = ('createTouch' in document),
    timeVal = 700;


var supportsBezierRange = (function () {
    var el = document.createElement('div');
    el.style.WebkitTransitionTimingFunction = 'cubic-bezier(1,0,0,1.1)';
    return !!el.style.WebkitTransitionTimingFunction.length;
})();

// bezier contructor
function BezierHandle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 12;
}

BezierHandle.prototype = {

    // get the edges for easy grabby coordinates
    getSides: function () {
        this.left = this.x - (this.width / 2);
        this.right = this.left + this.width;
        this.top = this.y - (this.height / 2);
        this.bottom = this.top + this.height;
    },

    draw: function () {
        // figure out the edges
        this.getSides();
        ctx.fillStyle = "#222";
        ctx.fillRect(this.left, this.top, this.width, this.height);
    }

};

var handles = [
    new BezierHandle(50, 180),
    new BezierHandle(150, 180)
];

function Graph() {
    this.x = 0;
    this.y = 130;
    this.height = 200;
    this.width = 200;
}

Graph.prototype = {

    draw: function () {

        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // the 0.5 offset is to account for stroke width to make lines sharp
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x + 0.5, this.y - 0.5, this.width - 1, this.height);

    }

};

var graph = new Graph();

// get the x and y pos, normalized by getOffset
function getPos(event) {
    var mouseX = event.pageX - getOffSet(event.target).left,
        mouseY = event.pageY - getOffSet(event.target).top;

    return {
        x: mouseX,
        y: mouseY
    };
}

//from quirksmode.org. Modified slightly to return obj
function getOffSet(obj) {
    var curleft = curtop = 0;
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


var drag = false,
    draggingObj,
    oldX,
    oldY;

function onPress(event) {

    // to get rid of text cursor
    event.preventDefault();
    event.stopPropagation(); //not sure if this is needed

    var cursorEvent = supportsTouch ? event.touches[0] : event;

    var mouseCoordinates = getPos(cursorEvent),
        x = mouseCoordinates.x,
        y = mouseCoordinates.y;


    //check to see if over any handles
    for (var i = 0; i < handles.length; i++) {
        var current = handles[i],
            curLeft = current.left,
            curRight = current.right,
            curTop = current.top,
            curBottom = current.bottom;

        //20 px padding for chubby fingers
        if (supportsTouch) {
            curLeft -= 20;
            curRight += 20;
            curTop -= 20;
            curBottom += 20;
        }

        //console.log('current.x:',current.x, 'current.y:',current.y)
        if (x >= curLeft &&
            x <= curRight &&
            y >= curTop &&
            y <= curBottom
        ) {
            //over the current handle
            //console.log('over')
            //drag = true;
            draggingObj = current;
            oldX = event.pageX;
            oldY = event.pageY;

            var currentlySelected = $('#options option:checked');

            currentlySelected.removeAttr('checked')
                .parent().parent().find('input').last().attr('checked', 'checked');


            document.addEventListener('mouseup', onRelease, false);
            document.addEventListener('touchend', touchEnd, false);

            document.addEventListener('mousemove', onMove, false);
            document.addEventListener('touchmove', touchMove, false);

        }
    }

}

function onMove(event) {

    var cursorEvent = supportsTouch ? event.touches[0] : event;

    var x = cursorEvent.pageX - getOffSet(canvas).left,
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

    draggingObj.x = x;
    draggingObj.y = y;

    updateDrawing();

}

function touchMove(event) {
    onMove(event);
    event.preventDefault();
}

function onRelease(event) {
    //console.log('release')
    drag = false;
    // restore pointer cursor
    canvas.style.cursor = 'pointer';
    document.body.style.cursor = 'default';

    document.removeEventListener('mousemove', onMove, false);
    document.removeEventListener('touchmove', touchMove, false);
    document.removeEventListener('mouseup', onRelease, false);
    document.removeEventListener('touchend', touchEnd, false);
}

function touchEnd(event) {
    onRelease(event);
    event.preventDefault();
}


canvas.addEventListener('mousedown', onPress, false);
canvas.addEventListener('touchstart', function touchPress(event) {
    onPress(event);
    event.preventDefault();
}, false);

function updateDrawing() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw graph
    graph.draw();
    // get handles
    var cp1 = handles[0],
        cp2 = handles[1];
    // draw bezier curve
    ctx.save();
    ctx.strokeStyle = '#4C84D3';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(graph.x, graph.y + graph.height);
    //start at bottom left, first handle is cp1, second handle is cp2, end is top right
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, graph.width, graph.y);
    ctx.stroke();
    ctx.restore();
    // draw anchor point lines
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(graph.x, graph.y + graph.height);
    ctx.lineTo(cp1.x, cp1.y);
    ctx.moveTo(graph.width, graph.y);
    ctx.lineTo(cp2.x, cp2.y);
    ctx.stroke();
    // draw handles

    for (var i = 0; i < handles.length; i++) {
        handles[i].draw();
    }
}

function setTransitions() {

    var cp1 = handles[0],
        cp2 = handles[1];

    var x1 = (cp1.x / graph.width).toFixed(3),
        y1 = ((graph.height + graph.y - cp1.y) / graph.height).toFixed(3),
        x2 = (cp2.x / canvas.width).toFixed(3),
        y2 = ((graph.height + graph.y - cp2.y) / graph.height).toFixed(3),

        points = '(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ')';

    // set all transition types. ugly ugly vendor prefixes
    box.style.WebkitTransition =
        box.style.MozTransition =
        box.style.MsTransition =
        box.style.OTransition =
        box.style.transition =
        'all ' + timeVal + 'ms cubic-bezier' + points;

    if (!supportsBezierRange) {

        var wy1, wy2;

        if (y1 > 1) wy1 = 1;
        if (y1 < 0) wy1 = 0;
        if (y2 > 1) wy2 = 1;
        if (y2 < 0) wy2 = 0;

        box.style.WebkitTransition = 'all ' + timeVal + 'ms cubic-bezier' + '(' + x1 + ', ' + wy1 + ', ' + x2 + ', ' + wy2 + ')';
    }
}

function presetChange() {
    
    let selected = document.querySelector('input[type="radio"]:checked')
   
    var coordinates = selected.value.split(','),
        cp1 = handles[0],
        cp2 = handles[1];

    cp1.x = coordinates[0] * graph.width;
    cp1.y = graph.y + graph.height - (coordinates[1] * graph.height);
    cp2.x = coordinates[2] * graph.width;
    cp2.y = graph.y + graph.height - (coordinates[3] * graph.height);

    updateDrawing();
}

var options = document.getElementById("options");

options.addEventListener("input", presetChange);

// get the button value and toggle the class
$('.testButton').click(function () {
    //updateDrawing();
    setTransitions();

    let box = document.querySelector("#box");

    box.className = "" + this.getAttribute("id");
    /*console.log(box.className);
    if (box.className == "") {
    } else {
        box.className = "";
    }*/
    console.log(this.getAttribute("id"));
    //$('#box').toggleClass($(this).val());
});

setTransitions();

presetChange()