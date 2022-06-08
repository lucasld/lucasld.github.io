var logo = (sketch) => {
    let particle_color;
    let particleSystem;


    sketch.setup = () => {
        const canvas = sketch.createCanvas(35, 35);
        canvas.parent("sketch1");

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            particle_color = sketch.color(255);
        } else {
            particle_color = sketch.color(0);
        }
        particleSystem = new ParticleSystem(200);
    }
    
    sketch.draw = () => {
        sketch.clear();
        particleSystem.step((sketch.mouseX - sketch.windowWidth/2)/(sketch.windowWidth/2),
                            (sketch.mouseY - sketch.windowHeight/2)/(sketch.windowHeight/2));
    }


    class Particle {
        constructor() {
            this.x = sketch.width/2;
            this.y = sketch.height/2;
            this.s = sketch.random(80, 160);
            this.r = sketch.random(11, 12);
            this.b = sketch.random(0, 2) - 1;
        }

        move(factorX, factorY) {
            this.x = sketch.width/2 + (sketch.cos(factorY/3 + sketch.frameCount/150) * this.r + sketch.sin(this.s + sketch.frameCount / 150) * this.r/2) * this.b
            this.y = sketch.height/2 + sketch.sin(this.s + factorX/3 + sketch.frameCount/150) * this.r;
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
                sketch.stroke(particle_color);
                sketch.strokeWeight(1.5);
                sketch.point(particle.x, particle.y);
            }
        }
    }

    // change background color if switch in theme is detected
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        particle_color = event.matches ? sketch.color(255) : sketch.color(0);
    });
}
/*'var logo = (sketch) => {
    sketch.setup = () => {
        const canvas = sketch.createCanvas(35, 35)
        canvas.parent('sketch1')

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            main_color = sketch.color(255);
        } else {
            main_color = sketch.color(0);
        }

    }
    
    
    sketch.draw = () => {
        sketch.clear()
        sketch.fill(main_color)
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 100, 100)
    }

    sketch.windowResized = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)
        var _width = parseInt(style.width.slice(0, -2))
        resizeCanvas(_width - 25, _width * 1/2)
    }

    // change main color if switch in theme is detected
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        main_color = event.matches ? sketch.color(255) : sketch.color(0);
    });
}
*/
new p5(logo)