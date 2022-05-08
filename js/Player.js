class Player {
  constructor() {
    this.id = 0;

    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    this.radius = 25;

    this.angle = 0;

    this.keys = {
      left: false,
      up: false,
      right: false,
      down: false,
    };

    this.speed = 10;

    this.mouse = {
      x: 0,
      y: 0,
    };

    this.maxHealth = 1000;
    this.health = this.maxHealth;

    this.targetRadius = 10;

    this.createEventListeners();

    this.color = "blue";
  }

  createEventListeners() {
    document.addEventListener("keydown", this.keyHandler.bind(this));
    document.addEventListener("keyup", this.keyHandler.bind(this));

    document.addEventListener("mousemove", this.mouseHandler.bind(this));
    canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));

    cover.addEventListener("click", () => canvas.requestPointerLock());
  }

  /**
   * @param {KeyboardEvent} e;
   */
  keyHandler(e) {
    if (e.type === "keydown") {
      if (["ArrowRight", "Right", "d"].includes(e.key)) {
        this.keys.right = true;
      } else if (["ArrowLeft", "Left", "a"].includes(e.key)) {
        this.keys.left = true;
      } else if (["ArrowUp", "Up", "w"].includes(e.key)) {
        this.keys.up = true;
      } else if (["ArrowDown", "Down", "s"].includes(e.key)) {
        this.keys.down = true;
      }
    } else if (e.type === "keyup") {
      if (["ArrowRight", "Right", "d"].includes(e.key)) {
        this.keys.right = false;
      } else if (["ArrowLeft", "Left", "a"].includes(e.key)) {
        this.keys.left = false;
      } else if (["ArrowUp", "Up", "w"].includes(e.key)) {
        this.keys.up = false;
      } else if (["ArrowDown", "Down", "s"].includes(e.key)) {
        this.keys.down = false;
      }
    }
  }

  /**
   * @param {MouseEvent} e
   */
  mouseHandler({ clientX, clientY, movementX, movementY }) {
    if (pointerLocked) {
      this.mouse.x += movementX;
      this.mouse.y += movementY;
    } else {
      this.mouse.x = clientX;
      this.mouse.y = clientY;
    }
  }

  /**
   * @param {MouseEvent} e
   */
  mouseDownHandler({ clientX, clientY }) {
    if (pointerLocked) {
      this.shoot();
    } else {
      canvas.requestPointerLock();
      this.mouse.x = clientX;
      this.mouse.y = clientY;
    }
  }

  shoot() {
    bullets.push(new Bullet(this.x, this.y, this.angle, this.id));
  }
  takeDamage(amount) {
    this.health -= amount;
  }

  update(multiplier = 1) {
    this.mouse.x = Math.max(Math.min(this.mouse.x, window.innerWidth), 0);
    this.mouse.y = Math.max(Math.min(this.mouse.y, window.innerHeight), 0);

    const { left, right, up, down } = this.keys;

    let dx = 0;
    let dy = 0;

    if (left) {
      dx -= this.speed;
    }

    if (right) {
      dx += this.speed;
    }

    if (up) {
      dy -= this.speed;
    }

    if (down) {
      dy += this.speed;
    }

    if (dy !== 0 && dx !== 0) {
      dx /= root2;
      dy /= root2;
    }

    this.x += dx * multiplier;
    this.y += dy * multiplier;

    this.x = Math.max(Math.min(gameWidth / 2, this.x), -gameWidth / 2);
    this.y = Math.max(Math.min(gameHeight / 2, this.y), -gameHeight / 2);

    this.angle = Math.atan2(this.mouse.y - window.innerHeight / 2, this.mouse.x - window.innerWidth / 2);
  }

  draw() {
    // draw player
    ctx.fillStyle = "#BBBBBB";

    ctx.save();

    ctx.translate(window.innerWidth / 2 - this.x + this.x, window.innerHeight / 2 - this.y + this.y);

    ctx.rotate(this.angle + Math.PI / 2);

    ctx.beginPath();

    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);

    ctx.fill();

    ctx.fillStyle = this.color;

    ctx.fillRect(-10, -this.radius - 10, 20, 20);

    ctx.restore();

    // draw target thingy
    ctx.fillStyle = "red";

    ctx.save();

    ctx.translate(this.mouse.x, this.mouse.y);

    ctx.beginPath();

    ctx.arc(0, 0, this.targetRadius, 0, Math.PI * 2);

    ctx.fill();

    const lineWidth = 7;
    const lineHeight = 15;
    const lineSpace = 40;

    ctx.rotate(Math.PI / 4);

    for (let i = 0; i < 4; i++) {
      ctx.rotate((Math.PI / 2) * i);

      // rect
      ctx.fillRect(-lineWidth / 2, -lineHeight / 2 - lineSpace, lineWidth, lineHeight);

      // bottom circle
      ctx.beginPath();

      ctx.arc(0, -lineSpace + lineHeight / 2, lineWidth / 2, 0, Math.PI * 2);

      ctx.fill();

      // top circle

      ctx.beginPath();

      ctx.arc(0, -lineSpace - lineHeight / 2, lineWidth / 2, 0, Math.PI * 2);

      ctx.fill();
    }

    ctx.restore();

    // health bar information

    ctx.save();

    ctx.translate(window.innerWidth / 2 - this.x + this.x, window.innerHeight / 2 - this.y + this.y);

    const hb = {
      width: 100,
      height: 25,
      ySpace: 10,
      margin: {
        x: 6,
        y: 6,
      },
    };

    ctx.fillStyle = "#888888";

    ctx.fillRect(-hb.width / 2, -this.radius - hb.ySpace - hb.height, hb.width, hb.height);

    const health = this.health / this.maxHealth;

    ctx.fillStyle = health < 0.2 ? "red" : health < 0.5 ? "yellow" : "#00FF00";

    // ctx.fillStyle = "red";

    ctx.fillRect(
      -hb.width / 2 + hb.margin.x,
      -this.radius - hb.ySpace - hb.height + hb.margin.y,
      health * (hb.width - hb.margin.x * 2),
      hb.height - hb.margin.y * 2
    );

    ctx.restore();

    // draw player on the mini canvas
    const miniX = ((this.x + gameWidth / 2) / gameWidth) * miniCanvas.width;
    const miniY = ((this.y + gameHeight / 2) / gameHeight) * miniCanvas.height;

    mini.fillStyle = this.color;

    mini.beginPath();

    mini.arc(miniX, miniY, 10, 0, Math.PI * 2);

    mini.fill();
  }
}
