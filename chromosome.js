function Chromosome() {
  this.scl = 0.3;
  this.genes = [];
  for (let i = 0; i < lifespan; i++) {
    this.genes[i] = createVector(random(-this.scl, this.scl), random(-this.scl, this.scl));
  }
}

Chromosome.prototype.mutate = function() {
  if (random(1) < 0.01) {
    const i = round(random(lifespan));
    this.genes[i] = createVector(random(this.scl), random(this.scl));
  }
}

Chromosome.prototype.crossover = function(newGenes) {
  for (let i = 0; i < newGenes.length; i++) {
    if (newGenes[i]) {
      this.genes[i] = newGenes[i];
    }
 }
}
