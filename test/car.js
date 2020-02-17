(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"car_atlas_", frames: [[0,0,602,300],[604,0,140,140]]}
];


// symbols:



(lib.CachedTexturedBitmap_1 = function() {
	this.initialize(ss["car_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_2 = function() {
	this.initialize(ss["car_atlas_"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.tire = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_2();
	this.instance.parent = this;
	this.instance.setTransform(-35,-35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35,-35,70,70);


(lib.carbase = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_1();
	this.instance.parent = this;
	this.instance.setTransform(-150.5,-149.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.carbase, new cjs.Rectangle(-150.5,-149.5,301,150), null);


(lib.movingtire = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// tire
	this.instance = new lib.tire();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:6.4286},0).wait(1).to({rotation:12.8571},0).wait(1).to({rotation:19.2857},0).wait(1).to({rotation:25.7143},0).wait(1).to({rotation:32.1429},0).wait(1).to({rotation:38.5714},0).wait(1).to({rotation:45},0).wait(1).to({rotation:51.4286},0).wait(1).to({rotation:57.8571},0).wait(1).to({rotation:64.2857},0).wait(1).to({rotation:70.7143},0).wait(1).to({rotation:77.1429},0).wait(1).to({rotation:83.5714},0).wait(1).to({rotation:90},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.5,-49.4,99,99);


(lib.done = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// tire
	this.wheel = new lib.movingtire();
	this.wheel.name = "wheel";
	this.wheel.parent = this;
	this.wheel.setTransform(138,9);

	this.wheel2 = new lib.movingtire();
	this.wheel2.name = "wheel2";
	this.wheel2.parent = this;
	this.wheel2.setTransform(-46,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.wheel2},{t:this.wheel}]}).wait(15));

	// car
	this.instance = new lib.carbase();
	this.instance.parent = this;
	this.instance.setTransform(54,-62.95,1,1,0,0,0,0,-74.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-67.95},7).to({y:-70.95},7).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.5,-145.9,301,189.9);


// stage content:
(lib.car = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		console.log("test test");
		//console.log(this);
		//console.log(this.carDone);
		console.log(this);
		this.stop();
		
		
		
		let frontWheel=this.carDone.wheel;
		let backWheel=this.carDone.wheel2;
		
		
		backWheel.scaleY=2;
		backWheel.y -= 30;
		
		let yFront=frontWheel.y;
		let yBack=backWheel.y;
		
		
		let update = () => {
		
			console.log("update");
			//requestAnimationFrame(update);
			let numb=Math.random()*2-1;
			frontWheel.y = yFront += numb;
			backWheel.y = yBack += numb;
		}
		
		let mouveCar= (_event) => {
			console.log("move",_event);
			this.carDone.x= _event.clientX;
			this.carDone.y= _event.clientY;
		}
		
		this.addEventListener("tick",update);	
		//requestAnimationFrame(update);
		//stage.enableMouseOver(10);
		window.addEventListener("mousemove",mouveCar);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(15));

	// car
	this.carDone = new lib.done();
	this.carDone.name = "carDone";
	this.carDone.parent = this;
	this.carDone.setTransform(514,556.95,1,1,0,0,0,0,-25);

	this.timeline.addTween(cjs.Tween.get(this.carDone).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(897.5,804,-179,-178);
// library properties:
lib.properties = {
	id: '41783E197E84DB4A98CCC251ED9616AC',
	width: 960,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/car_atlas_.png?1573928670721", id:"car_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['41783E197E84DB4A98CCC251ED9616AC'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;