attractor_system = (sketch, move) => {
    let main_color
    let body_color
    let bg_color = 230
    
    // Particle and Particle System control parameters
    let min_trail_length = 1
    let max_trail_length = 30
    let min_particle_number = 20
    let max_particle_number = 4000

    let ownFrameCount = 0

    let ps
    let webgl_graphics;

    class Particle {
        constructor () {
            this.init_particle();
            this.delta = new p5.Vector()
        }

        init_particle = () => {
            this.x = sketch.random(sketch.lower_bound_x, sketch.upper_bound_x)
            this.y = sketch.random(sketch.lower_bound_y, sketch.upper_bound_y)
            this.z = sketch.random(sketch.lower_bound_z, sketch.upper_bound_z) * (sketch.random() > 0.5 ? 1 : -1)
            this.points = new Array()
        }

        move = (points_length) => {
            let dt = 0.01
            this.delta = sketch.move(this.x, this.y, this.z)
            this.x = this.x + this.delta.x
            this.y = this.y + this.delta.y
            this.z = this.z + this.delta.z
            this.points.push(new p5.Vector(this.x, this.y, this.z))
            for (var i=0; i<2; i++){
                if (this.points.length > points_length){
                    this.points.shift()
                }
            }
            // moving to fast
            if (sketch.abs(this.delta.x) > sketch.speed_limit ||
                sketch.abs(this.delta.y) > sketch.speed_limit ||
                sketch.abs(this.delta.z) > sketch.speed_limit){
                return false
            } else {
                return true
            }
        }

        display = () => {
            var c = webgl_graphics.color((this.delta.x)*100, (this.delta.y)*100, (this.delta.z)*100)
            c.setAlpha(100)
            webgl_graphics.stroke(c)
            webgl_graphics.strokeWeight(0.3)
            webgl_graphics.noFill()
            webgl_graphics.beginShape()
            for (var v of this.points){
                webgl_graphics.vertex(v.x * sketch.attractor_scale,
                                      v.y * sketch.attractor_scale,
                                      v.z * sketch.attractor_scale)
            }
            webgl_graphics.endShape()
            
            webgl_graphics.strokeWeight(2)
            webgl_graphics.stroke(200, 0, 0)
            webgl_graphics.point(this.x * sketch.attractor_scale,
                                 this.y * sketch.attractor_scale,
                                 this.z * sketch.attractor_scale)
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
            for (var i=0; i<10; i++){
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
 

    sketch.setup = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)

        var _width = parseInt(style.width.slice(0, -2))
        const canvas = sketch.createCanvas(_width, _width * 0.5)
        canvas.parent(sketch.parentID)

        const body_elem = document.getElementsByClassName('d-flex')[0]
        const body_style = getComputedStyle(body_elem)
        body_color = body_style.backgroundColor
        
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            main_color = sketch.color(255)
        } else {
            main_color = sketch.color(0)
        }
        document.getElementById('defaultCanvas1').style.border = "1px solid"

        ps = new ParticleSystem(10, 4)
        ps.number_particles = 1000
        webgl_graphics = sketch.createGraphics(sketch.width, sketch.height, sketch.WEBGL)
        webgl_graphics.clear()
        webgl_graphics.camera(0, 0, 85, 0,0,0, 0, 1, 0)

    }
    
    
    sketch.draw = () => {
        if (sketch.mouseY > 0 && sketch.mouseY < sketch.height){
            webgl_graphics.background(bg_color)
            webgl_graphics.push()
            webgl_graphics.rotateY(ownFrameCount/130)
            webgl_graphics.rotateX(ownFrameCount/130)
            webgl_graphics.rotateZ(ownFrameCount/130)
            webgl_graphics.noFill()
            webgl_graphics.strokeWeight(0.1)
            var c = webgl_graphics.color(0, 0, 255)
            c.setAlpha(100)
            webgl_graphics.stroke(c)
            webgl_graphics.box(50)
            webgl_graphics.translate(sketch.translate_attractor);
            ps.step()
            webgl_graphics._renderer._update()
            webgl_graphics.pop()
            sketch.image(webgl_graphics, 0, 20)
            ownFrameCount ++
        }
        // Parameter Controls
        sketch.noStroke();
        // number of particles
        sketch.fill(sketch.map(ps.number_particles, min_particle_number, max_particle_number, 100, 255))
        sketch.rect(0, 0, sketch.width/4, 19)
        sketch.stroke(0, 0, 255)
        var x = sketch.map(ps.number_particles, min_particle_number, max_particle_number, 0, sketch.width/4)
        sketch.line(x, 1, x, 19)
        sketch.fill(0)
        sketch.noStroke()
        sketch.textSize(13)
        sketch.text(`number of particles: ${ps.number_particles}`, 10,14)
        // trail line length
        sketch.fill(sketch.map(ps.points_length, min_trail_length, max_trail_length, 100, 255))
        sketch.rect(sketch.width/4, 0, sketch.width/4, 19)
        sketch.stroke(0, 0, 255)
        var x = sketch.map(ps.points_length, min_trail_length, max_trail_length, sketch.width/4, sketch.width/2)
        sketch.line(x, 1, x, 19)
        sketch.fill(0)
        sketch.noStroke()
        sketch.textSize(13)
        sketch.text(`particle trail-length: ${ps.points_length}`, sketch.width/4 + 10, 14)
        // background color
        sketch.fill(bg_color)
        sketch.rect(sketch.width/2, 0, sketch.width/4, 19)
        sketch.stroke(0, 0, 255)
        var x = sketch.map(bg_color, 0, 255, sketch.width/2, (sketch.width * 3)/4)
        sketch.line(x, 1, x, 19)
        sketch.fill((bg_color > 126) ? 0 : 255)
        sketch.noStroke()
        sketch.textSize(13)
        sketch.text(`background color: ${bg_color}`, sketch.width/2 + 10, 14)
    }


    sketch.mousePressed = () => {
        // Parameter Control
        if (sketch.mouseY <= 20 && sketch.mouseY >= 0) {
            if (sketch.mouseX < sketch.width/4 && sketch.mouseX > 0) {
                ps.number_particles = Math.round(sketch.map(sketch.mouseX,
                                                            0, sketch.width/4,
                                                            min_particle_number, max_particle_number))
            } else if (sketch.mouseX < sketch.width/2 && sketch.mouseX > sketch.width/4) {
                ps.points_length = Math.round(sketch.map(sketch.mouseX,
                                                        sketch.width/4, sketch.width/2,
                                                        min_trail_length, max_trail_length))
            } else if (sketch.mouseX < (sketch.width*3)/4 && sketch.mouseX > sketch.width/2) {
                bg_color = Math.round(sketch.map(sketch.mouseX,
                                                sketch.width/2, (sketch.width*3)/4,
                                                0, 255))
            }
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
        body_color = body_style.backgroundColor
    })
}


move = (x,y,z) => {
    let a = 5
    let b = -10
    let c = -0.38
    let dt = 0.01

    var dx = (a*x - y*z) * dt
    var dy = (b*y+ x*z) * dt
    var dz = (c*z + x*y/3) * dt
    return new p5.Vector(dx, dy, dz)
}


lorenz_attractor_move = (x, y, z) => {
    let sigma = 10
    let B = 8/3
    let R = 28
    let dt = 0.01

    var dx = sigma * (y - x) * dt
    var dy = (R*x - y - x*z) * dt
    var dz = (-B*z + x*y) * dt
    return new p5.Vector(dx, dy, dz)
}


attractor1 = new p5(attractor_system)
attractor1.move = move
attractor1.lower_bound_x = 4
attractor1.upper_bound_x = 6
attractor1.lower_bound_y = 8
attractor1.upper_bound_y = 12
attractor1.lower_bound_z = 8
attractor1.upper_bound_z = 12,
attractor1.speed_limit = 5
attractor1.attractor_scale = 1
attractor1.translate_attractor = new p5.Vector(0, 0, 0)
attractor1.parentID = "sketch-attractor-system"

attractor2 = new p5(attractor_system)
attractor2.move = lorenz_attractor_move
attractor2.lower_bound_x = 0
attractor2.upper_bound_x = 10
attractor2.lower_bound_y = 0
attractor2.upper_bound_y = 10
attractor2.lower_bound_z = 0
attractor2.upper_bound_z = 10,
attractor2.speed_limit = 10
attractor2.attractor_scale = 0.6
attractor2.translate_attractor = new p5.Vector(0, 0, -15)
attractor2.parentID = "sketch-attractor-system2"