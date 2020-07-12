"use strict";
var Partikel;
(function (Partikel) {
    class Particle {
        constructor(x, y, canvas) {
            this.lifeTime = 0;
            this.rot = 0;
            this.moveY = Math.floor(Math.random() * (-6) + 3) / 10;
            this.moveX = 1;
            this.startSize = 20;
            this.dieSize = 30;
            this.x = x;
            this.y = y;
            this.maxLifeTime = 4000;
            this.rot = Math.random() * 360;
            this.startLifeAt = new Date().getTime();
        }
        update() {
            this.lifeTime = new Date().getTime() - this.startLifeAt;
            this.rot += 0.2;
            var lifePerc = ((this.lifeTime / this.maxLifeTime) * 100);
            this.currentSize = this.startSize + ((this.dieSize - this.startSize) * lifePerc * .1);
            this.alpha = 1 - (lifePerc * .01);
            this.alpha = Math.max(this.alpha, 0);
            this.x += this.moveX;
            this.y += this.moveY;
        }
    }
    Partikel.Particle = Particle;
})(Partikel || (Partikel = {}));
//# sourceMappingURL=particle.js.map