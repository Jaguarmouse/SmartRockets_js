function Obstacle(x, y) {
  this.pos = createVector(x,y);
  this.w = 300;
  this.h = 40;
}

Obstacle.prototype.show = function() {
  fill(0, 0, 255, 100);
  rectMode(CENTER);
  rect(this.pos.x, this.pos.y, this.w, this.h);
}

Obstacle.prototype.hits = function(rocket) {
  return !( 
    this.pos.x - this.w * 0.5 >= rocket.pos.x + rocket.h * 0.5 ||
    this.pos.x + this.w * 0.5 <= rocket.pos.x - rocket.h * 0.5 ||
    this.pos.y - this.h * 0.5 >= rocket.pos.y + rocket.w * 0.5 ||
    this.pos.y + this.h * 0.5 <= rocket.pos.y - rocket.w * 0.5
  );
}
