"use strict";
var Partikel;
(function (Partikel) {
    var canvas = document.getElementById("canvas");
    let crc2 = canvas.getContext("2d");
    let particles = [];
    let starX = 10;
    let startY = canvas.height / 2;
    let prevSpawnTime = new Date().getTime();
    let minSpawnTime = 40;
    let lifeTime = 4000;
    let smokeImage = new Image();
    smokeImage.src = "smoke.png";
    let changeLife = document.getElementById("life");
    let changeMove = document.getElementById("move");
    smokeImage.onload = function () {
        render();
    };
    function spawn() {
        if (new Date().getTime() > prevSpawnTime + minSpawnTime) {
            prevSpawnTime = new Date().getTime();
            let particle = new Partikel.Particle(starX, startY, canvas);
            particles.push(particle);
        }
    }
    function render() {
        lifeTime = Number(changeLife.value);
        var len = particles.length;
        while (len--) {
            particles[len].maxLifeTime = Number(changeLife.value);
        }
        len = particles.length;
        while (len--) {
            particles[len].moveX = Number(changeMove.value);
        }
        var len = particles.length;
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        while (len--) {
            if (particles[len].y < 0 || particles[len].lifeTime > lifeTime) {
                particles.splice(len, 1);
            }
            else {
                particles[len].update();
                crc2.save();
                var offsetX = -particles[len].currentSize / 2, offsetY = -particles[len].currentSize / 2;
                crc2.translate(particles[len].x - offsetX, particles[len].y - offsetY);
                crc2.rotate(particles[len].rot / 180 * Math.PI);
                crc2.globalAlpha = particles[len].alpha;
                crc2.drawImage(smokeImage, offsetX, offsetY, particles[len].currentSize, particles[len].currentSize);
                crc2.restore();
            }
        }
        spawn();
        requestAnimationFrame(render);
    }
})(Partikel || (Partikel = {}));
//# sourceMappingURL=main.js.map