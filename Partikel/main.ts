var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

let particles: any = [];
let starX: number = 10;
let startY: number = canvas.height/2;


let prevSpawnTime: number = new Date().getTime();
let minSpawnTime: number = 40;
let maxLifeTime: number = Math.min(5000, (canvas.height / (1.5 * 60) * 1000));

let smokeImage: HTMLImageElement = new Image();
smokeImage.src = "smoke.png";

smokeImage.onload = function () {
    render();
}

function spawn():void {
    if (new Date().getTime() > prevSpawnTime + minSpawnTime) {
        prevSpawnTime = new Date().getTime();
        particles.push(new smoke(starX, startY));
    }
}

function render():void {
    var len = particles.length;
    crc2.clearRect(0, 0, canvas.width, canvas.height);

    while (len--) {
        if (particles[len].y < 0 || particles[len].lifeTime > maxLifeTime) {
            particles.splice(len, 1);
        } else {
            particles[len].update();

            crc2.save();
            var offsetX = -particles[len].size / 2,
                offsetY = -particles[len].size / 2;

            crc2.translate(particles[len].x - offsetX, particles[len].y - offsetY);
            crc2.rotate(particles[len].rot / 180 * Math.PI);
            crc2.globalAlpha = particles[len].alpha;
            crc2.drawImage(smokeImage, offsetX, offsetY, particles[len].size, particles[len].size);
            crc2.restore();
        }
    }
    spawn();
    requestAnimationFrame(render);
}

function smoke(x:number, y:number):void {
    this.x = x;
    this.y = y;

    this.size = 1;
    this.startSize = 20;
    this.endSize = 30;

    this.rot = Math.random() * 360;

    this.startLife = new Date().getTime();
    this.lifeTime = 0;

    this.moveY = Math.floor(Math.random() * (-6) + 3) / 10;
    this.moveX = 1 - (Math.random() * 0.5);
}

smoke.prototype.update = function ():void {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.rot += 0.2;

    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

    this.alpha = 1 - (lifePerc * .01);
    this.alpha = Math.max(this.alpha, 0);

    this.x += this.moveX;
    this.y += this.moveY;
}


