function sketch(p) {
    p.setup = function() {
        p.createCanvas(350, 350);
        p.background('#1b1b1b');
    }
      
    p.mouseDragged = function() {
        p.noStroke();
        p.fill(255);
        p.ellipse(p.mouseX, p.mouseY, 15, 15);
    }
}

export default sketch;