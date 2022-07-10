attractor_system = (sketch) => {
    let main_color
    let bg_color

    let x = 5
    let y = 10
    let z = 10

    let a = 5
    let b = -10
    let c = -0.38

    let points = new Array()

    class Particle {
        constructor (lower_bound_x=4, upper_bound_x=6,
                     lower_bound_y=8, upper_bound_y=12,
                     lower_bound_z=8, upper_bound_z=12,
                     speed_limit=5) {
            this.lower_bound_x = lower_bound_x
            this.upper_bound_x = upper_bound_x
            this.lower_bound_y = lower_bound_y
            this.upper_bound_y = upper_bound_y
            this.lower_bound_z = lower_bound_z
            this.upper_bound_z = upper_bound_z
            this.speed_limit = speed_limit
            this.init_particle();
        }

        init_particle = () => {
            this.x = sketch.random(this.lower_bound_x, this.upper_bound_x)
            this.y = sketch.random(this.lower_bound_y, this.upper_bound_y)
            this.z = sketch.random(this.lower_bound_z, this.upper_bound_z) * (sketch.random() > 0.5 ? 1 : -1)
            this.points = new Array()
        }

        move = (points_length) => {
            let dt = 0.01
            this.dx = (a*this.x - this.y*this.z) * dt
            this.dy = (b*this.y+ this.x*this.z) * dt
            this.dz = (c*this.z + this.x*this.y/3) * dt
            this.x = this.x + this.dx
            this.y = this.y + this.dy
            this.z = this.z + this.dz
            this.points.push(new p5.Vector(this.x, this.y, this.z))
            for (var i=0; i<2; i++){
                if (this.points.length > points_length){
                    this.points.shift()
                }
            }
            // moving to fast
            if (sketch.abs(this.dx) > this.speed_limit ||
                sketch.abs(this.dy) > this.speed_limit ||
                sketch.abs(this.dz) > this.speed_limit){
                return false
            } else {
                return true
            }
        }

        display = () => {
            var c = webgl_graphics.color((this.dx)*100, (this.dy)*100, (this.dz)*100)
            c.setAlpha(sketch.map(this.points.length, 1, 20, 150, 80) + (this.dx + this.dy + this.dz) * 10)
            webgl_graphics.stroke(c)
            webgl_graphics.strokeWeight(0.3)
            webgl_graphics.noFill()
            webgl_graphics.translate(0, 0, -30)
            webgl_graphics.beginShape()
            for (var v of this.points){
                webgl_graphics.vertex(v.x, v.y, v.z)
            }
            webgl_graphics.endShape()
            
            webgl_graphics.strokeWeight(2)
            webgl_graphics.stroke(200, 0, 0)
            webgl_graphics.point(this.x, this.y, this.z)
            webgl_graphics.translate(0, 0, 30)
        }
    }

    class ParticleSystem{
        constructor(number_particles, points_length) {
            this.particles = new Array()
            this.number_particles = number_particles
            this.points_length = points_length
            for (var i=0; i<number_particles; i++){
                this.particles.push(new Particle())
            }
        }

        step = () => {
            for (var i=0; i<40; i++){
                if (this.particles.length > this.number_particles){
                    this.particles.pop()
                } else if (this.particles.length < this.number_particles){
                    this.particles.push(new Particle())
                }
            }
            for (var particle of this.particles) {
                var keep = particle.move(this.points_length)
                if (!keep) {
                    particle.init_particle()
                }
                particle.display()
            }
        }

    }

    let ps = new ParticleSystem(2000, 4)
    let webgl_graphics;

    sketch.setup = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)

        var _width = parseInt(style.width.slice(0, -2))
        const canvas = sketch.createCanvas(_width, _width * 0.5)
        canvas.parent('sketch-attractor-system')

        const body_elem = document.getElementsByClassName('d-flex')[0]
        const body_style = getComputedStyle(body_elem)
        bg_color = body_style.backgroundColor
        
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            main_color = sketch.color(255)
        } else {
            main_color = sketch.color(0)
        }
        document.getElementById('defaultCanvas1').style.border = "1px solid"

        webgl_graphics = sketch.createGraphics(sketch.width, sketch.height, sketch.WEBGL)
        webgl_graphics.clear()
        webgl_graphics.camera(0, 0, 85, 0,0,0, 0, 1, 0)
    }
    
    
    sketch.draw = () => {
        sketch.background(100)
        webgl_graphics.background(230)
        webgl_graphics.push()
        webgl_graphics.rotateY(sketch.frameCount/130)
        webgl_graphics.rotateX(sketch.frameCount/130)
        webgl_graphics.rotateZ(sketch.frameCount/130)
        webgl_graphics.noFill()
        webgl_graphics.strokeWeight(0.1)
        var c = webgl_graphics.color(0, 0, 255)
        c.setAlpha(100)
        webgl_graphics.stroke(c)
        webgl_graphics.box(50)
        webgl_graphics.translate(0, 0, 30);
        ps.step()
        webgl_graphics._renderer._update()
        webgl_graphics.pop()
        sketch.image(webgl_graphics, 0, 20)
        // Parameter Controls
        sketch.noStroke();
        // particle line length
        sketch.fill(255 - ps.points_length*5)
        sketch.rect(0, 0, sketch.width/4, 19)
        sketch.fill(0)
        sketch.textSize(13)
        sketch.text(`Points per Particle: ${ps.points_length}`, 10,14)
        if (sketch.mouseY <= 20 && sketch.mouseX < sketch.width/4 && sketch.mouseX > 0) {
            ps.points_length = Math.round(sketch.map(sketch.mouseX, 0, sketch.width/4, 1, 20))
        }
        // number of particles
        sketch.fill(sketch.map(ps.number_particles, 20, 4000, 100, 255))
        sketch.rect(sketch.width/4, 0, sketch.width/4, 19)
        sketch.fill(0)
        sketch.textSize(13)
        sketch.text(`Number of Particles: ${ps.number_particles}`, sketch.width/4 + 10, 14)
        if (sketch.mouseY <= 20 && sketch.mouseX < sketch.width/2 && sketch.mouseX > sketch.width/4) {
            ps.number_particles = Math.round(sketch.map(sketch.mouseX, sketch.width/4, sketch.width/2, 20, 4000))
        }

    }

    sketch.windowResized = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)
        var _width = parseInt(style.width.slice(0, -2))
        sketch.resizeCanvas(_width - 25, _width * 1/2)
        webgl_graphics = sketch.createGraphics(sketch.width, sketch.height, sketch.WEBGL)
        webgl_graphics.camera(0, 0, 85, 0,0,0, 0, 1, 0)
    }

    // change main color if switch in theme is detected
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        main_color = event.matches ? sketch.color(255) : sketch.color(0)
        const body_elem = document.getElementsByClassName('d-flex')[0]
        const body_style = getComputedStyle(body_elem)
        bg_color = body_style.backgroundColor
    })

    canvas_border = () => {

    }
}

new p5(attractor_system)

