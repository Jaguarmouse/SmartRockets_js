const rockets = [];
let current = [];
let next = [];

let goal;
let obsta

let gravity;

const population = 100;
const lifespan = 300;
let time = 0;

function setup() {
  createCanvas(600,600);
  
  goal = createVector(width/2, 40);
  obstacle = new Obstacle(width/2, height/2);

  gravity = createVector(0, 0.02);

  for (let i = 0; i < population; i++) {
    rockets[i] = new Rocket(width/2, height);
    current[i] = new Chromosome();
  }
}

function draw() {
  background(0);

  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 40, 40);
  
  obstacle.show();

  for (let i = 0; i < population; i++) {
    rockets[i].applyForce(gravity);
    if (time < lifespan) {
      rockets[i].applyForce(current[i].genes[time]);
    } else if (time == lifespan) {
      console.log("Life ended!");
    }
    rockets[i].update();
    rockets[i].show();
  }
  time++;
  if (rockets.reduce((p,c) => p && c.hit(), true)) {
    step();
  }
}

function step() {
  console.log("All dead!");
  const evals = rockets
    .map(r => 10000/r.closest)
//  console.log(evals);
  
  const selected = select(current, evals);
  const crossed = crossover(selected);
  for (let i = 0; i < population; i++) {
    rockets[i] = new Rocket(width/2, height);
    crossed[i].mutate();
  }

  current = crossed;

  time = 0;
}

function select(dna, evals) {
  const selected  = [];
  const roulette = evals.reduce((p,c) => p + c, 0);
  while (selected.length < dna.length) {
    const p = random(roulette);
    let sum = 0;
    for (let i = 0; i < dna.length; i++) {
      sum += evals[i];
      if (sum > p) {
        selected.push(dna[i]);
        break;
      }
    }
  }
  return selected;
}

function crossover(dna) {
  for (let i = 0; i < dna.length; i+=2) { 
    if (0.9 < random()) {
      continue;
    }

    const p1 = round(random(lifespan));
    const p2 = p1 + round(random(lifespan-p1));
    
    const child1 = [];
    const child2 = [];
    for (let j = 0; j < lifespan; j++) {
      if (p1 <= j && j <= p2) {
        child1[j] = dna[i+1].genes[j];
        child2[j] = dna[i].genes[j];
      } else {
        child1[j] = null;
        child2[j] = null;
      }
    }

    dna[i].crossover(child1);
    dna[i+1].crossover(child2);
  }

  return dna;
}








