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
    particleSystem = new ParticleSystem(200);
}
  
function draw() {
    clear();
    particleSystem.step((mouseX - windowWidth/2)/(windowWidth/2),
                        (mouseY - windowHeight/2)/(windowHeight/2));
}


class Particle {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.s = random(80, 160);
        this.r = random(11, 12);
        this.b = random(0, 2) - 1;
    }

    move(factorX, factorY) {
        this.x = width/2 + (cos(factorY/3 + frameCount/150) * this.r + sin(this.s + frameCount / 150) * this.r/2) * this.b
        this.y = height/2 + sin(this.s + factorX/3 + frameCount/150) * this.r;
    }
}

class ParticleSystem {
    constructor(particle_number) {
        this.particles = Array(particle_number);
        for (var i=0; i<particle_number; i++){
            this.particles[i] = new Particle();
        }
    }

    step(factorX, factorY) {
        // move all particles
        this.particles.forEach(x => x.move(factorX, factorY));
        // draw particles
        for (var i=0; i<this.particles.length; i++){
            let particle = this.particles[i];
            stroke(particle_color);
            strokeWeight(1.5);
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