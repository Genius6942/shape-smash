class Particle {
  constructor(pos, color, size, velocity, angle, shrinkSpeed = 0.1) {
    this.color = color;

    this.x = pos.x;
    this.y = pos.y;

    this.velocity = {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity,
    };

    this.size = size;

    this.shrinkSpeed = shrinkSpeed;
  }

  update(multiplier = 1) {
    this.x += this.velocity.x * multiplier;
    this.y += this.velocity.y * multiplier;
    this.size -= this.shrinkSpeed * multiplier;

    if (this.size <= 0) {
      return true;
    }

    return false;
  }

  draw() {
    try {
      // if (Math.abs(this.x - player.x) > window.innerWidth + Math.max(this.radius * 2, this.radius * 2) + 50)
      //   return;
      // if (Math.abs(this.y - player.y) > window.innerHeight + Math.max(this.radius * 2, this.radius * 2) + 50)
      //   return;

      ctx.save();

      ctx.translate(window.innerWidth / 2 - player.x + this.x, window.innerHeight / 2 - player.y + this.y);

      ctx.fillStyle = this.color;

      ctx.beginPath();

      ctx.arc(0, 0, this.size, 0, Math.PI * 2);

      ctx.fill();

      ctx.restore();
    } catch (e) {
      console.error(e);
    }
  }
}

class Explosion {
  constructor(
    x,
    y,
    numParticles = Explosion.Consants.particlesPerExplosion,
    velocity = { min: Explosion.Consants.particlesMinSpeed, max: Explosion.Consants.particlesMaxSpeed }
  ) {
    const c = Explosion.Consants;

    this.particles = Array(numParticles)
      .fill()
      .map(
        () =>
          new Particle(
            { x, y },
            "yellow",
            random(c.particlesMinSize, c.particlesMaxSize),
            random(velocity.min, velocity.max),
            random(0, Math.PI * 2),
            0.1
          )
      );
  }

  update(multiplier = 1) {
    const particlesToRemove = [];
    this.particles.forEach((particle, idx) => {
      if (particle.update(multiplier)) {
        particlesToRemove.push(idx);
      }
    });

    [...particlesToRemove].reverse().forEach(idx => this.particles.splice(idx, 1));

    return this.particles.length <= 0;
  }

  draw() {
    this.particles.forEach(particle => particle.draw());
  }

  static Consants = {
    particlesPerExplosion: 30,
    particlesMinSpeed: 3,
    particlesMaxSpeed: 6,
    particlesMinSize: 1,
    particlesMaxSize: 3,
  };
}
