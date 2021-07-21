class Pipe {
	constructor(x) {
		// class attributes
		this.gapSize = 175;
		this.width = 80;
		this.edgeGap = 30;

		// object attributes
		this.x = x;
		this.topY =
			Math.random() * (height - 2 * this.edgeGap - this.gapSize) + this.edgeGap;
		this.bottomY = this.topY + this.gapSize;
	}

	draw() {
		rect(this.x, 0, this.width, this.topY);
		rect(this.x, this.bottomY, this.width, height - this.bottomY);
	}

	move(x) {
		this.x += x;
	}

	offscreen() {
		return this.x + this.width < 0;
	}
}
