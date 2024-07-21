
class KeyboardInput {
    constructor () {
        this.KeysPressed = {}
        window.addEventListener("keydown", e => {
            if (e.code.startsWith("Key") && "QWERTYUIOPASDFGHJKLZXCVBNM".includes(e.code.slice(3))) {
              this.KeysPressed[e.code.slice(3).toLowerCase()] = true;
            }
          });
          
          window.addEventListener("keyup", e => {
            if (e.code.startsWith("Key") && "QWERTYUIOPASDFGHJKLZXCVBNM".includes(e.code.slice(3))) {
              this.KeysPressed[e.code.slice(3).toLowerCase()] = false;
            }
          });
    }
}
