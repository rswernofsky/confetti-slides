class Circle {
    constructor(x, y, radius, color, yspeed, xspeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.yspeed = yspeed;
        this.xspeed = xspeed;
    }

    fall() {
        // a*t + vi = vf
        this.yspeed += 0.02;
        this.y += this.yspeed;
        this.x += this.xspeed;
    }
}