let birds = new Array();
let counter = 0;
let deadBirds = new Array();
let ga;
let gameSpeed;
let pipes = new Array();
const xOffSet = 100;
const total = 500;

function setup() {
	createCanvas(1000, 600);
	gameSpeed = createSlider(1, 20, 1);

	ga = new GeneticAlgorithm();
	ga.spawnBirds();
}

function draw() {
	// -------------------LOGIC-------------------

	for (let n = 0; n < gameSpeed.value(); n++) {
		// next generation
		if (birds.length == 0) {
			console.log("new generation");
			ga.nextGeneration();

			// reset
			counter = 0;
			pipes = [];
		}

		// add new pipe every 150 frames
		if (counter % 200 == 0) {
			pipes.push(new Pipe(width));
		}

		// remove offscreen pipes, update pipes
		for (let i = pipes.length - 1; i >= 0; i--) {
			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
			} else {
				pipes[i].move(-2);
			}
		}

		// remove dead birds, update birds
		for (let i = birds.length - 1; i >= 0; i--) {
			if (birds[i].dead) {
				birds[i].fitness = (counter / 300) ** 2;
				ga.totalFitness += (counter / 300) ** 2;
				deadBirds.push(birds.splice(i, 1)[0]);
			} else {
				birds[i].update(pipes);
			}
		}

		counter++;
	}

	// -------------------DRAW-------------------
	background(0);

	for (const pipe of pipes) {
		pipe.draw();
	}

	for (const bird of birds) {
		bird.draw();
	}
}
