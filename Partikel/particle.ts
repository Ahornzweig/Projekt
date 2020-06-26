namespace Partikel {

    export class Particle {

        public lifeTime: number = 0;

        public x: number;
        public y: number;
        public alpha: number;
        public currentSize: number;
        public rot: number = 0;
        
        private startSize: number = 20;
        private dieSize: number = 30;
        private startLifeAt: number;
        private moveY: number = Math.floor(Math.random() * (-6) + 3) / 10;
        private moveX: number = 1 - (Math.random() * 0.5);
        private maxLifeTime: number;

        constructor(x: number, y: number, canvas: HTMLCanvasElement) {
            
            this.x = x;
            this.y = y;
            this.maxLifeTime = Math.min(5000, (canvas.height / (1.5 * 60) * 1000));
            this.rot = Math.random() * 360;
            this.startLifeAt = new Date().getTime();
        }

        public update() {
            
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
}