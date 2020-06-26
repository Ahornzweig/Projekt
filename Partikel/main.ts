namespace Partikel {

    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");

    let particles: any = [];
    let starX: number = 10;
    let startY: number = canvas.height / 2;

    let prevSpawnTime: number = new Date().getTime();
    let minSpawnTime: number = 40;
    let lifeTime: number = 1000;

    let smokeImage: HTMLImageElement = new Image();
    smokeImage.src = "smoke.png";

    smokeImage.onload = function () {
        render();
    }

    function spawn(): void {
        if (new Date().getTime() > prevSpawnTime + minSpawnTime) {
            prevSpawnTime = new Date().getTime();
            let particle: Particle = new Particle(starX, startY, canvas)
            particles.push(particle);
        }
    }

    function render(): void {
        var len = particles.length;
        crc2.clearRect(0, 0, canvas.width, canvas.height);

        while (len--) {
            if (particles[len].y < 0 || particles[len].lifeTime > lifeTime) {
                particles.splice(len, 1);
            } else {
                particles[len].update();

                crc2.save();
                var offsetX = -particles[len].currentSize / 2,
                    offsetY = -particles[len].currentSize / 2;

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
}
