let particle_color;
let particleSystem;


function setup() {
    const canvas = createCanvas(35, 35);
    canvas.parent("sketch1");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        particle_color = color(255);
    } else {
        particle_color = color(0);
    }
    particleSystem = new ParticleSystem(30);
}
  
function draw() {
    clear();
    particleSystem.step();
}


class Particle {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.s = random(80, 160);
        this.r = random(7, 10);
    }

    move() {
        this.x = width/2 + cos(this.s + frameCount/this.s) * this.r + sin(this.s + frameCount/this.s/2) * this.r/2;
        this.y = height/2 + sin(this.s + frameCount/this.s) * this.r;
    }
}

class ParticleSystem {
    constructor(particle_number) {
        this.particles = Array(particle_number);
        for (var i=0; i<particle_number; i++){
            this.particles[i] = new Particle();
        }
    }

    step() {
        // move all particles
        this.particles.forEach(x => x.move());
        // draw particles
        for (var i=0; i<this.particles.length; i++){
            let particle = this.particles[i];
            stroke(particle_color);
            strokeWeight(2);
            //fill (255, 0, 0);
            //ellipse(particle.x, particle.y, 30, 30);
            point (particle.x, particle.y);
        }
    }
}

// change background color if switch in theme is detected
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    particle_color = event.matches ? color(255) : color(0);
});