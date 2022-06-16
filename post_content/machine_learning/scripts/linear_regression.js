linear_regression = (sketch) => {
    // #------ don't change from here
    let main_color;  // used as main stroke color
    let bg_color;  // this is the backgroundcolor, fitting the dark/light mode
    // don't change until here ------#
    let slider_amount;  // amount of random data-points
    let slider_distance;

    let slider_m1;
    let slider_n1;


    sketch.setup = () => {
        // #------ don't change from here (except parent name:)
        const container_element = document.getElementsByClassName('container')[0]
        const style = getComputedStyle(container_element)

        var _width = parseInt(style.width.slice(0, -2))
        const canvas = sketch.createCanvas(_width, _width * 0.5);  // add sketch.WEBGL if 3D is required
        //canvas.parent('linear_regression_sketch')  // change this to the correct div-id

        const body_elem = document.getElementsByClassName('d-flex')[0]
        const body_style = getComputedStyle(body_elem)

        bg_color = body_style.backgroundColor;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            main_color = sketch.color(255);
        } else {
            main_color = sketch.color(0);
        }
        document.getElementById('defaultCanvas1').style.border = "1px solid";
        // don't change until here ------#
        slider_amount = sketch.createSlider(20, 100, 60, 1);
        slider_amount.position(20, 0);
        slider_amount.style('height', '80px');
        slider_distance = sketch.createSlider(20, 100, 20, 1);
        slider_distance.position(180, 0);
        slider_distance.style('height', '80px');

        slider_m1 = sketch.createSlider(-5, 5, 1, 0.1);
        slider_n1 = sketch.createSlider(-200, 200, 0, 2);
        slider_m1.position(20, 30);
        slider_m1.style('height', '80px');
        slider_n1.position(180, 30);
        slider_n1.style('height', '80px');
    }

    
    sketch.draw = () => {
         // #------ don't change from here
        sketch.background(100)
        // don't change until here ------#
        let val_amount = slider_amount.value();
        let val_distance = slider_distance.value();

        let val_m1 = slider_m1.value();
        let val_n1 = slider_n1.value();
        // create random numbers
        let x = random_numbers(val_m1, val_n1, val_distance, val_amount);
        x.forEach((i) => {
            sketch.ellipse(i.x + sketch.width/2, i.y + sketch.height/2, 20, 20);
        })
        //sketch.noLoop();
    }


    random_numbers = (m, n, d, amount) => {
        m *= -1
        console.log(n)
        // fix random numbers
        sketch.randomSeed(99);
        let x = new Array(amount);
        for (var i=0; i<amount; i++){
            var x_line = sketch.random(-sketch.width/2, sketch.width/2);  // position on line
            var y_line = m * x_line + n;

            var distance = sketch.random(-d, d);  // distance from line
            x[i] = new p5.Vector(x_line, y_line);
        }
        return x;
    }

    // #------ don't change from here
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
    // don't change until here ------#
}

new p5(linear_regression, "linear_regression_sketch")
