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
        slider_amount = sketch.createSlider(20, 2000, 400, 1);
        slider_amount.position(20, 0);
        slider_amount.style('height', '80px');
        slider_distance = sketch.createSlider(0, sketch.height, sketch.height/2, 1);
        slider_distance.position(180, 0);
        slider_distance.style('height', '80px');

        slider_m1 = sketch.createSlider(-10, 10, 1, 0.1);
        slider_m1.position(20, 50);
        slider_m1.style('height', '80px');
        slider_n1 = sketch.createSlider(-sketch.height/2 - 100, sketch.height/2 + 100, 0, 1);
        slider_n1.position(180, 50);
        slider_n1.style('height', '80px');
    }

    
    sketch.draw = () => {
         // #------ don't change from here
        sketch.background(bg_color)
        // don't change until here ------#
        // axis lines
        axis(sketch.height/2, sketch.width/2, 10);
        // sliders
        let val_amount = slider_amount.value();
        let val_distance = slider_distance.value();

        let val_m1 = slider_m1.value();
        let val_n1 = slider_n1.value();
        // create random numbers
        let xy = random_numbers(val_m1, val_n1, val_distance, val_amount);
        sketch.fill(main_color)
        xy.forEach((point) => {
            sketch.ellipse(point.x + sketch.width/2, point.y + sketch.height/2, 5, 5);
        })
        //sketch.noLoop();
        // regresion line
        regression_linear(xy);
    }


    random_numbers = (m, n, d, amount) => {
        m *= -1
        // fix random numbers
        sketch.randomSeed(99);
        let offset_vector = new p5.Vector(1, 1/((m!=0)?-m:0.1));
        //let offset_vector = new p5.Vector(1,1/-m);
        offset_vector.x = offset_vector.x / offset_vector.mag()
        offset_vector.y = offset_vector.y / offset_vector.mag()
        console.log();
        let random_vectors = new Array(amount);
        for (var i=0; i<amount; i++){
            // position on line
            var x_line = sketch.random(-sketch.width/2, sketch.width/2);
            var y_line = (m * sketch.height/sketch.width) * x_line + n;

            var distance = sketch.random(-d, d);  // distance from line
            random_vectors[i] = new p5.Vector(x_line + offset_vector.x * distance,
                                              y_line + offset_vector.y * distance);
        }
        return random_vectors;
    }


    axis = (offset_x, offset_y, tick_dist) => {
        sketch.stroke(main_color);
        // x-axis
        sketch.line(0, offset_x, sketch.width, offset_x);
        var tick_pos = tick_dist;
        while (tick_pos < sketch.width) {
            sketch.line(tick_pos, offset_x - 5, tick_pos, offset_x + 5);
            tick_pos += tick_dist;
        }
        // y-axis
        sketch.line(offset_y, 0, offset_y, sketch.height);
        tick_pos = tick_dist;
        while (tick_pos < sketch.height) {
            sketch.line(offset_y - 5, tick_pos, offset_y + 5, tick_pos);
            tick_pos += tick_dist;
        }
    }


    regression_linear = (points) => {
        let X = new Array(points.length);
        let Y = new Array(points.length);
        var mean_x = 0;
        var mean_y = 0;
        for (var i=0; i<points.length; i++) {
            mean_x += points[i].x;
            mean_y += points[i].y;
            X[i] = points[i].x;
            Y[i] = points[i].y;
        }
        mean_x /= points.length;
        mean_y /= points.length;
        var y_s = covariance(X, Y, mean_x, mean_y) / covariance(X, X, mean_x, mean_x);
        var x_s = covariance(X, Y, mean_x, mean_y) / covariance(Y, Y, mean_y, mean_y);

        var y_0 = mean_y - y_s * mean_x;
        var x_0 = mean_x - x_s * mean_y;
        sketch.stroke(255, 0, 0);
        sketch.line(y_s * -sketch.height/2 + y_0, 0, y_s * sketch.height/2 + y_0, sketch.height);
        sketch.line(0, x_s * -sketch.width/2 + x_0, sketch.width, x_s * sketch.width/2 + x_0);
    }


    covariance = (X, Y, meanX, meanY) => {
        var cov = 0.0;
        for (var i=0; i<X.length; i++){
            console.log((X[i] - meanX) * (Y[i] - meanY));
            cov += (X[i] - meanX) * (Y[i] - meanY);
        }
        return cov / (X.length - 1)
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
