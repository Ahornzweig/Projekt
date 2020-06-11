"use strict";
var canvas = document.getElementById("canvas");
let crc2 = canvas.getContext("2d");
let particles = [];
let starX = 10;
let startY = canvas.height / 2;
let prevSpawnTime = new Date().getTime();
let minSpawnTime = 40;
let maxLifeTime = Math.min(5000, (canvas.height / (1.5 * 60) * 1000));
let smokeImage = new Image();
smokeImage.src = "smoke.png";
smokeImage.onload = function () {
    render();
};
function spawn() {
    if (new Date().getTime() > prevSpawnTime + minSpawnTime) {
        prevSpawnTime = new Date().getTime();
        particles.push(new smoke(starX, startY));
    }
}
function render() {
    var len = particles.length;
    crc2.clearRect(0, 0, canvas.width, canvas.height);
    while (len--) {
        if (particles[len].y < 0 || particles[len].lifeTime > maxLifeTime) {
            particles.splice(len, 1);
        }
        else {
            particles[len].update();
            crc2.save();
            var offsetX = -particles[len].size / 2, offsetY = -particles[len].size / 2;
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
function smoke(x, y) {
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
smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.rot += 0.2;
    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
    this.alpha = 1 - (lifePerc * .01);
    this.alpha = Math.max(this.alpha, 0);
    this.x += this.moveX;
    this.y += this.moveY;
};
//# sourceMappingURL=main.js.map