function sketch(p) {
    p.setup = function() {
        p.createCanvas(750, 530);
        p.background('#fff');
    }
      
    /* Its happen err
    p.mouseDragged = function() {
        p.noStroke();
        p.fill(0);
        p.ellipse(p.mouseX, p.mouseY, 15, 15);
    }*/
}

export default sketch;