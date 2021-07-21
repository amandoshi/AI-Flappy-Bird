class Bird {
	constructor(x, y, brain) {
		// class attributes
		this.gravity = 0.5;
		this.lift = -10;
		this.maxSpeed = 12;
		this.size = 32;

		// object attributes
		this.x = x;
		this.y = y;
		this.v = 0;
		this.fitness = 0;
		this.dead = false;

		if (brain) {
			this.brain = brain.copy();
			this.brain.mutate();
		} else {
			this.brain = new NeuralNetwork(5, 5, 1);
		}
	}

	checkCollision(pipes) {
		// kill bird if pipe collision
		for (const pipe of pipes) {
			if (
				this.x >= pipe.x &&
				this.x <= pipe.x + pipe.width &&
				(this.y > pipe.bottomY || this.y < pipe.topY)
			) {
				this.dead = true;
			}
		}

		// kill bird if ceiling/floor collision
		if (this.y > height) {
			this.y = height;
			this.v = 0;
			this.dead = true;
		} else if (this.y < 0) {
			this.y = 0;
			this.v = 0;
			this.dead = true;
		}
	}

	draw() {
		push();
		fill(255, 100);
		ellipse(this.x, this.y, this.size);
		pop();
	}

	jump() {
		this.v = this.lift;
	}

	think(pipes) {
		let inputs = [
			this.y / height,
			(pipes[0].x - this.x) / width,
			pipes[0].topY / height,
			pipes[0].bottomY / height,
			this.v / this.maxSpeed,
		];

		let output = this.brain.predict(inputs)[0];
		if (output > 0.5) {
			this.jump();
		}
	}

	update(pipes) {
		this.think(pipes);
		this.updatePosition();
		this.checkCollision(pipes);
	}

	updatePosition() {
		this.v += this.gravity;

		if (this.v > this.maxSpeed) {
			this.v = this.maxSpeed;
		}

		this.y += this.v;
	}
}
