import socket from "./socket";

function sketch(p) {
    let boardToDrawWidth = 530;

    if(window.innerWidth > 1280) {
        boardToDrawWidth = 750;
    }

    p.setup = function() {
        p.createCanvas(boardToDrawWidth, 530);
        p.background('#fff');
    }
      

    const drawClickSize = 10;

    /* Its happen err */
    p.mouseDragged = function() {
        p.noStroke();
        p.fill(0);
        p.ellipse(p.mouseX, p.mouseY, drawClickSize, drawClickSize);

        let coordsMouse = {
            x: p.mouseX,
            y: p.mouseY
        }

        socket.emit('mouseMoved', coordsMouse);
    }

    p.updateWithProps = function(newProps){
        if(newProps.coords){
            p.noStroke();
            p.fill(0);
            p.ellipse(newProps.coords.x, newProps.coords.y, drawClickSize, drawClickSize);
        }

        if(newProps.isBreakTime) {
            p.background('#fff');
        }
    }
}


export { sketch };