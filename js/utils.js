const random = (min, max) => Math.random() * (max - min) + min;

const aabb = (r1, r2) =>
  r1.x - r1.width / 2 < r2.x - r2.width / 2 + r2.width &&
  r2.x - r2.width / 2 < r1.x - r1.width / 2 + r1.width &&
  r1.y - r1.height / 2 < r2.y - r2.height / 2 + r2.height &&
  r2.y - r2.height / 2 < r1.y - r1.height / 2 + r1.height;