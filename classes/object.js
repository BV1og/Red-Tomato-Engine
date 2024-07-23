var canvas = null;
var ctx = null;
var hitboxes = {}
var objects = {}

window.addEventListener("DOMContentLoaded", () => {
    var running = true
    canvas = document.querySelector("#display");
    ctx = canvas.getContext("2d");
    render()
    window.requestAnimationFrame(render);
});

function printObject(name) {
    let obj = objects[name]
    let h1, h2, h3, h4, h5
    let dirOffX = obj["rotationOffestX"] //надо доработать или убрать
    let dirOffY = obj["rotationOffestY"]
    switch (obj["shape"]["type"]) {
        case "rect" :
            h1 = obj["x"]
            h2 = obj["y"]
            h3 = obj["shape"]["height"]
            h4 = obj["shape"]["width"]
            h5 = obj["direction"]

            ctx.beginPath();
            ctx.save()
            ctx.translate((h1+h4/2), (h2+h3/2)) 
            ctx.rotate(h5*Math.PI/180)
            ctx.rect((0-h2/2)+dirOffX, (0-h3/2)+dirOffY, h3, h4);
            ctx.fillStyle = obj["shape"]["color"];
            ctx.fill();
            ctx.restore()
            ctx.closePath();
            break
        case "circle" :
            h1 = obj["x"]
            h2 = obj["y"]
            h3 = obj["shape"]["radius"]
            h5 = obj["direction"]
            ctx.beginPath();
            ctx.arc(h1, h2, h3, 0, 2*Math.PI, false);
            ctx.fillStyle = obj["shape"]["color"];
            ctx.fill();
            ctx.closePath()
            
            break
        case "image":
            h1 = obj["x"]
            h2 = obj["y"]
            h3 = obj["shape"]["height"]
            h4 = obj["shape"]["width"]
            h5 = obj["direction"]
            h6 = obj["shape"]["image"]
            ctx.save()
            ctx.translate((h1+h4/2), (h2+h3/2)) 
            ctx.rotate(h5*Math.PI/180)
            ctx.drawImage(h6, (0-h2/2)+dirOffX, (0-h3/2)+dirOffY, h4, h3);
            ctx.restore()
            break
    }
}

function teleport(name, x, y) {
    let obj = objects[name]
    obj["x"] = x
    obj["y"] = y
}

function moveIn(name, s, dir) {
    dir = dir * (Math.PI / 180)
    x = objects[name]["x"] + (Math.sin(dir) * s)
    y = objects[name]["y"] + (Math.cos(dir) * s)
    teleport(name, x, y)
 }

function addObject(name, x, y, dir, shape, dirOffX=0, dirOffY=0) {
    objects[name] = {"x":x, "y":y, "direction":dir, "shape":shape, "rotationOffestX":dirOffX, "rotationOffestY":dirOffY}
}
function addHitbox(name, bind, xs, ys) {
    hitboxes[name] = {"width":xs, "height":ys, "bind":bind}
}

function colliide(name, otherName) {
    hitbox1 = hitboxes[name]
    hitbox2 = hitboxes[otherName]
    obj1 = objects[hitbox1["bind"]]
    obj2 = objects[hitbox2["bind"]]
    thisObject = {"x":obj1["x"], "y":obj1["y"], "width":hitbox1["width"], "height":hitbox1["height"]}
    otherObject = {"x":obj2["x"], "y":obj2["y"], "width":hitbox2["width"], "height":hitbox2["height"]}
    return (thisObject.x + thisObject.width) >= otherObject.x && 
    thisObject.x <= (otherObject.x + otherObject.width) &&
    (thisObject.y + thisObject.height) >= otherObject.y &&
    thisObject.y <= (otherObject.y + otherObject.height);
}
imagesLoaded = []
function loadImage(img) {
    if (!imagesLoaded.includes(img)) {
        img.onload = () => {
            imagesLoaded.push(img)
        };
    }
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw()
    window.requestAnimationFrame(render);
}
