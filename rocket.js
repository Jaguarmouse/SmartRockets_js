function Rocket(x, y) {
  this.w = 30;
  this.h = 10;
  this.pos = createVector(x,y);
  this.vel = createVector(0, -1);
  this.acc = createVector();
  this.closest = Number.MAX_VALUE;
}

Rocket.prototype.show = function() {
  fill(255);
  push();
  translate(this.pos.x, this.pos.y - this.w*0.5);
  rotate(this.vel.heading());
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
}

Rocket.prototype.update = function() {
  if (!this.hit()) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.walls();

    const d = dist(this.pos.x, this.pos.y, goal.x, goal.y);
    if (this.closest > d) {
      this.closest = d;
    }

    this.acc.mult(0);
  }
}

Rocket.prototype.applyForce = function(force) {
  this.acc.add(force);
}

Rocket.prototype.hit = function() {
  return this.pos.y > height || obstacle.hits(this);
}

Rocket.prototype.walls = function() {
  if (this.pos.x < 0 || this.pos.x > width) {
    this.vel.x *= -1;
  }
  if (this.pos.y < 0) {
    this.vel.y *= -1;
  }
}
