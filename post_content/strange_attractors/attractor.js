attractor = (sketch) => {
    let main_color;
    let bg_color;

    let x = 5;
    let y = 10;
    let z = 10;

    let a = 5;
    let b = -10;
    let c = -0.38;

    let points = new Array();

    sketch.setup = () => {
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)

        var _width = parseInt(style.width.slice(0, -2))
        const canvas = sketch.createCanvas(_width, _width * 0.5, sketch.WEBGL);
        canvas.parent('sketch-attractor')

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
        let dt = 0.01;
        let dx = (a*x - y*z) * dt;
        let dy = (b*y+ x*z) * dt;
        let dz = (c*z + x*y/3) * dt;
        x = x + dx;
        y = y + dy;
        z = z + dz;
        points.push(new p5.Vector(x, y, z));
        sketch.stroke(main_color);
        sketch.strokeWeight(0.3);
        sketch.noFill();
        sketch.translate(0, 0, -30);
        sketch.beginShape();
        for (v of points){
            sketch.vertex(v.x, v.y, v.z);
        }
        sketch.endShape();
        
        sketch.strokeWeight(10);
        sketch.stroke(255, 0, 0)
        sketch.point(x, y, z);
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

new p5(attractor)