class Monster {
  constructor(width = 50 + score * 2, height = 50 + score * 2, health = 5 + score) {
    this.x = random(-gameWidth / 2, gameWidth / 2);
    this.y = random(-gameHeight / 2, gameHeight / 2);

    this.angle = 0;

    this.maxHealth = health;
    this.health = this.maxHealth;

    // width and height of triangle drawn.
    this.width = width;

    this.height = height;

    this.color = "yellow";

    this.speed = 8;
  }

  takeDamage(amount) {
    this.health -= amount;
  }

  update(multiplier = 1) {
    if (this.health <= 0) {
      return true;
    }

    this.angle = Math.atan2(this.y - player.y, this.x - player.x);

    const dx = -Math.cos(this.angle) * this.speed * multiplier;
    const dy = -Math.sin(this.angle) * this.speed * multiplier;

    this.x += dx;
    this.y += dy;

    if (aabb({ x: player.x, y: player.y, width: player.radius * 2, height: player.radius * 2 }, this)) {
      player.takeDamage(1);
    }
  }

  draw() {
    // draw player on the mini canvas
    const miniX = ((this.x + gameWidth / 2) / gameWidth) * miniCanvas.width;
    const miniY = ((this.y + gameHeight / 2) / gameHeight) * miniCanvas.height;

    mini.fillStyle = this.color;

    mini.beginPath();

    mini.arc(miniX, miniY, 10, 0, Math.PI * 2);

    mini.fill();

    // if not viewable then don't render rest of monster
    if (Math.abs(this.x - player.x) > window.innerWidth + Math.max(this.width, this.height) + 50) return;
    if (Math.abs(this.y - player.y) > window.innerHeight + Math.max(this.width, this.height) + 50) return;

    ctx.fillStyle = this.color;
    ctx.save();

    ctx.translate(window.innerWidth / 2 - player.x + this.x, window.innerHeight / 2 - player.y + this.y);

    ctx.rotate(this.angle - Math.PI / 2);

    ctx.beginPath();

    // bottom left corner
    ctx.moveTo(-this.width / 2, this.height / 2);

    ctx.lineTo(this.width / 2, this.height / 2);

    ctx.lineTo(0, -this.height / 2);

    ctx.closePath();

    ctx.fill();

    ctx.restore();

    // draw health bar

    ctx.save();

    ctx.translate(window.innerWidth / 2 - player.x + this.x, window.innerHeight / 2 - player.y + this.y);

    // grey border
    ctx.fillStyle = "#888888";

    // health bar information
    const hb = {
      width: 100,
      height: 25,
      ySpace: 10,
      margin: {
        x: 6,
        y: 6,
      },
    };

    ctx.fillRect(-hb.width / 2, -this.height / 2 - hb.ySpace - hb.height, hb.width, hb.height);

    const health = this.health / this.maxHealth;

    // ctx.fillStyle = health < .2 ? 'red' : health < .5 ? 'yellow' : 'green';

    ctx.fillStyle = "red";

    ctx.fillRect(
      -hb.width / 2 + hb.margin.x,
      -this.height / 2 - hb.ySpace - hb.height + hb.margin.y,
      health * (hb.width - hb.margin.x * 2),
      hb.height - hb.margin.y * 2
    );

    ctx.restore();
  }
}
