
var canvas = null;
var ctx = null;
var objects = {
    "player":{"x":200, "y":200, "shape":{"type":"rect", "width":40, "height":40, "color":"#FF0000"}}
}
window.addEventListener("DOMContentLoaded", () => {
    var running = true
    canvas = document.querySelector("#display");
    ctx = canvas.getContext("2d");
    render()
    window.requestAnimationFrame(render);
});

function printObject(name) {
    let obj = objects[name]
    let h1, h2, h3, h4
    if (obj["shape"]["type"] == "rect") {
        h1 = obj["x"]
        h2 = obj["y"]
        h3 = obj["shape"]["height"]
        h4 = obj["shape"]["height"]

        ctx.beginPath();
        ctx.rect(h1, h2, h3, h4);
        ctx.fillStyle = obj["shape"]["color"];
        ctx.fill();
        ctx.closePath();
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw()
    window.requestAnimationFrame(render);
}


var keyboard = new KeyboardInput();
function draw() {
    printObject("player")
    if (keyboard.KeysPressed["s"]) {
        objects["player"]["y"] += 1
    }
    if (keyboard.KeysPressed["w"]) {
        objects["player"]["y"] -= 1
    }
    if (keyboard.KeysPressed["d"]) {
        objects["player"]["x"] += 1
    }
    if (keyboard.KeysPressed["a"]) {
        objects["player"]["x"] -= 1
    }
    //console.log(keyboard.KeysPressed["w"])
}

