class GeneticAlgorithm {
	constructor() {
		this.totalFitness = 0;
	}

	nextGeneration() {
		for (let i = 0; i < total; i++) {
			let index = this.pickOne();
			// console.log(index);
			birds.push(new Bird(xOffSet, height / 2, deadBirds[index].brain));
		}
		deadBirds = [];

		this.totalFitness = 0;
	}

	pickOne() {
		let index = 0;
		let fitnessAim = this.totalFitness * Math.random();
		while (fitnessAim > 0) {
			fitnessAim -= deadBirds[index].fitness;
			index++;
		}
		index--;
		return index;
	}

	spawnBirds() {
		for (let i = 0; i < total; i++) {
			birds.push(new Bird(xOffSet, height / 2));
		}
	}
}
