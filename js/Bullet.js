class Bullet {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} angle
	 */
	constructor(x, y, angle, id) {
		this.id = 0;

		this.x = x;
		this.y = y;
		this.angle = angle;

		this.width = 15;
		this.height = 20;

		this.shooterId = id;

		this.speed = 20;

		// only calculate the movement once
		this.updateMovement = {
			x: Math.cos(this.angle) * this.speed,
			y: Math.sin(this.angle) * this.speed,
		};
	}

	update(multiplier = 1) {
		this.x += this.updateMovement.x * multiplier;
		this.y += this.updateMovement.y * multiplier;

		if (
			this.x < -gameWidth / 2 ||
			this.y < -gameHeight / 2 ||
			this.x > gameWidth / 2 ||
			this.y > gameHeight / 2
		) {
			return true;
		}

		for (const monster of monsters) {
			if (monster.health > 0 && aabb(monster, this)) {
				monster.takeDamage(1);
				return true;
			}
		}
	}

	draw() {
		if (Math.abs(this.x - player.x) > window.innerWidth + Math.max(this.width, this.height) + 50) return;
		if (Math.abs(this.y - player.y) > window.innerHeight + Math.max(this.width, this.height) + 50) return;

		// draw bullet
		ctx.fillStyle = "#888888";

		ctx.save();

		ctx.translate(
			window.innerWidth / 2 - player.x + this.x,
			window.innerHeight / 2 - player.y + this.y
		);

		ctx.rotate(this.angle - Math.PI / 2);

		ctx.beginPath();

		ctx.arc(0, this.height / 2, this.width / 2, 0, Math.PI * 2);

		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

		ctx.fill();

		ctx.restore();
	}
}