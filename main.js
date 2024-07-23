
var keyboard = new KeyboardInput()
images = [new Image()]
images[0].src= "textures/player.png"



addObject("player", 200, 200, 90, {"type":"image", "width":120, "height":80, "image":images[0]}, dirOffX=50, dirOffY=0)
addObject("circle", 100, 100, 90, {"type":"circle", "radius":20, "color":"#00FF00"})
addHitbox("playerH", "player", 80, 80)
addHitbox("circleH", "circle", 40, 40)

function DrawAll() {
    loadImage(images[0])
    printObject("player")
    printObject("circle")
}
let currDir = 0;
function draw() {
    DrawAll()
    if (keyboard.KeysPressed["w"]) {
        moveIn("player", 1, objects.player.direction)
    } else {
        console.log(objects.player.direction)
        objects.player.direction = currDir
        if (currDir == 360) {
            currDir = 0
        } else {
            currDir++
        }
    }

}