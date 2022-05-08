const renderBg = () => {
	// draw background and mini background
  ctx.fillStyle = bgImg || "black";

  // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.save();

  ctx.translate(window.innerWidth / 2 - player.x, window.innerHeight / 2 - player.y);

  ctx.fillRect(
    player.x - window.innerWidth / 2,
    player.y - window.innerHeight / 2,
    window.innerWidth,
    window.innerHeight
  );

  ctx.restore();

  mini.fillStyle = "black";
  mini.fillRect(0, 0, miniCanvas.width, miniCanvas.height);

  // black around border
  ctx.fillStyle = "black";

  // top
  ctx.fillRect(
    window.innerWidth / 2 - player.x + (-gameWidth / 2 - window.innerWidth / 2),
    window.innerHeight / 2 - player.y + (-gameHeight / 2 - window.innerHeight / 2),
    gameWidth + window.innerWidth,
    window.innerHeight / 2
  );

  // left
  ctx.fillRect(
    window.innerWidth / 2 - player.x + (-gameWidth / 2 - window.innerWidth / 2),
    window.innerHeight / 2 - player.y + (-gameHeight / 2 - window.innerHeight / 2),
    window.innerWidth / 2,
    gameHeight + window.innerHeight
  );

  // bottom
  ctx.fillRect(
    window.innerWidth / 2 - player.x + (-gameWidth / 2 - window.innerWidth / 2),
    window.innerHeight / 2 - player.y + gameHeight / 2,
    gameWidth + window.innerWidth,
    window.innerHeight / 2
  );

  // right
  ctx.fillRect(
    window.innerWidth / 2 - player.x + gameWidth / 2,
    window.innerHeight / 2 - player.y + (-gameHeight / 2 - window.innerHeight / 2),
    window.innerWidth / 2,
    gameWidth + window.innerWidth
  );

  // draw border
  ctx.strokeStyle = "#CCCCCC";

  ctx.lineWidth = 10;

  ctx.beginPath();

  ctx.rect(
    window.innerWidth / 2 - player.x - gameWidth / 2,
    window.innerHeight / 2 - player.y - gameHeight / 2,
    gameWidth,
    gameHeight
  );

  ctx.stroke();
}