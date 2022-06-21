attractor_system = (sketch) => {
    let main_color;
    let bg_color;

    let x = 5;
    let y = 10;
    let z = 10;

    let a = 5;
    let b = -10;
    let c = -0.38;

    let points = new Array();

    class Particle {
        constructor (lower_bound_x=3, upper_bound_x=7, lower_bound_y=8, upper_bound_y=12, lower_bound_z=8, upper_bound_z=12) {
            this.x = sketch.random(lower_bound_x, upper_bound_x);
            this.y = sketch.random(lower_bound_y, upper_bound_y);
            this.z = sketch.random(lower_bound_z, upper_bound_z);
            this.points = new Array();
        }

        move = () => {
            let dt = 0.01;
            let dx = (a*this.x - this.y*this.z) * dt;
            let dy = (b*this.y+ this.x*this.z) * dt;
            let dz = (c*this.z + this.x*this.y/3) * dt;
            this.x = this.x + dx;
            this.y = this.y + dy;
            this.z = this.z + dz;
            this.points.push(new p5.Vector(this.x, this.y, this.z));
        }

        display = () => {
            sketch.stroke(0, 80);
            sketch.strokeWeight(0.3);
            sketch.noFill();
            sketch.translate(0, 0, -30);
            sketch.beginShape();
            for (v of this.points){
                sketch.vertex(v.x, v.y, v.z);
            }
            sketch.endShape();
            
            sketch.strokeWeight(5);
            sketch.stroke(255, 0, 0)
            sketch.point(this.x, this.y, this.z);
            sketch.translate(0, 0, 30);
        }
    }

    class ParticleSystem{
        constructor(number_particles) {
            this.particles = new Array();
            for (var i=0; i<number_particles; i++){
                this.particles.push(new Particle());
            }
        }

        step = () => {
            for (var particle of this.particles) {
                particle.move();
                particle.display();
            }
        }

    }

    let ps = new ParticleSystem(100);

    sketch.setup = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)

        var _width = parseInt(style.width.slice(0, -2))
        const canvas = sketch.createCanvas(_width, _width * 0.5, sketch.WEBGL);
        canvas.parent('sketch-attractor-system')

        const body_elem = document.getElementsByClassName('d-flex')[0]
        const body_style = getComputedStyle(body_elem)
        bg_color = body_style.backgroundColor;
        
        sketch.camera(0, 0, 40, 0,0,0, 0, 1, 0)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            main_color = sketch.color(255);
        } else {
            main_color = sketch.color(0);
        }
        document.getElementById('defaultCanvas1').style.border = "1px solid";
    }
    
    
    sketch.draw = () => {
        sketch.background(bg_color)
        sketch.orbitControl(5, 5, 0.001);
        ps.step();
    }

    sketch.windowResized = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)
        var _width = parseInt(style.width.slice(0, -2))
        sketch.resizeCanvas(_width - 25, _width * 1/2)
    }

    // change main color if switch in theme is detected
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        main_color = event.matches ? sketch.color(255) : sketch.color(0);
        const body_elem = document.getElementsByClassName('d-flex')[0]
        const body_style = getComputedStyle(body_elem)
        bg_color = body_style.backgroundColor;
    });

    canvas_border = () => {

    }
}

new p5(attractor_system)

