import socket from "./socket";

function sketch(p) {
    p.setup = function() {
        p.createCanvas(750, 530);
        p.background('#fff');
        p.createColorPicker();
    }
      
    /* Its happen err */
    p.mouseDragged = function() {
        p.noStroke();
        p.fill(0);
        p.ellipse(p.mouseX, p.mouseY, 15, 15);

        let coordsMouse = {
            x: p.mouseX,
            y: p.mouseY
        }

        socket.emit('mouseMoved', coordsMouse);
    }

    p.updateWithProps = function(newProps){
        if(newProps.coords){
            console.log(newProps)
            p.noStroke();
            p.fill(0);
            p.ellipse(newProps.coords.x, newProps.coords.y, 15, 15);
        }
    }
}


export { sketch };