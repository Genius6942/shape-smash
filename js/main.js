const canvas = document.createElement("canvas");
canvas.classList.add("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const miniCanvas = document.createElement("canvas");
miniCanvas.width = 150;
miniCanvas.height = 150;
document.body.appendChild(miniCanvas);
miniCanvas.classList.add("mini");
const mini = miniCanvas.getContext("2d");

mini.fillStyle = "black";
mini.fillRect(0, 0, miniCanvas.width, miniCanvas.height);

const cover = document.querySelector(".cover");

let score = 0;
const scoreEl = document.querySelector(".money .number");

let kills = 0;

const bgImgUrl =
  "data:image/png;base64,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Nj/5yU8a+4HZ23///ePnVm1KZsT90GUOPwZj5ZVXHj311FMx16vMyy+/rO2DSkrrd99998XPrsqUzCjZEf8G6CqHH4Nx5JFHxkyvNto+qCuz9SvZEfdDVzn8GIRVVlklte0r/86x+DcA47P00kuP7r333vj5VZmSHSVD4t8AXeTwYxCOOuqomOXV5swzz2zsB8Zvv/32i59ftSkZEvdDFzn86L3yUn/66adjjlcZbR/kKa3fPffcEz/DKlMyROtHHzj86L3vfe97McOrzY9//OPGfqCez3/+8/EzrDYlS+J+6BqHH7327ne/e/TMM8/E/K4yCxYs0PZBstL63X333fFzrDIlS0qmxL8BusThR68dffTRMburzemnn97YD9S37777xs+x2pRMifuhSxx+9Naqq646mjdvXsztKrNgwYI3mof4NwD1LbXUUqO77rorfpZVpmRKyZb4N0BXOPzorWOOOSZmdrU59dRTG/uBPPvss0/8LKtNyZa4H7rC4UcvZbZ98+fP1/bBhJXW784774yfZ5XR+tFlDj96ac6cOTGrq82PfvSjxn4g39577x0/z2pTMibuhy5w+NE75SX+7LPPxpyuMto+aI/S+v35z3+On2mVKRmj9aOLHH70zrHHHhszutqcfPLJjf3A5Hzuc5+Ln2m1KVkT90PbOfzoldVWW03bBwOW3fqVzIl/A7SZw49eOf7442M2V5sf/OAHjf3A5O21117xc602JXPifmgzhx+9sfrqq2v7gDdavzvuuCN+tlWmZE7Jnvg3QFs5/OiNE044IWZytTnppJMa+4H2yGz9SvbE/dBWDj96oby4n3vuuZjHVeall17S9kHLldbvT3/6U/x8q0zJHq0fXeHwoxdOPPHEmMXVxuseumHPPfeMn2+1KRkU90MbOfzovDXWWGP0/PPPxxyuMi+++GJjP9Bef/jDH+JnXGVKBpUsivuhbRx+dF755+2y5rjjjmvsB9prjz32iJ9xtfHP/tIFDj86bc011xy98MILMX+rjLYPuun3v/99/JyrTMmikklxP7SJw49OK//ljKzx3+aEbtp9993j51xt/Nd8aDuHH52l7QOm6vbbb4+fdZXR+tF2Dj8664c//GHM3Grz/e9/v7Ef6I7ddtstftbVpmRT3A9t4fCjk9Zaa603WriMKS/4uB/onttuuy1+3lWmZFPJqLgf2sDhRyedcsopMWurzVFHHdXYD3TPrrvuGj/valMyKu6HNnD40TmZbV/5d3PF/UB33XrrrfEzrzJaP9rK4UfnnHrqqTFjq82RRx7Z2A901y677BI/82pTsiruh0lz+NEpa6+99hv/rdyM0fZBP91yyy3xc68yJatKZsX9MEkOPzrltNNOi9labb773e829gPdl9n6lcyK+2GSHH50xjrrrJPW9j333HON/UB/3HzzzfGzrzIls0p2xf0wKQ4/OuP000+PmVptDj/88MZ+oD923nnn+NlXm5JdcT9MisOPTlh33XVH8+fPj3laZbR9MAw33XRT/PyrTMmukmFxP0yCw49OyGz7vv3tbzf2A/2z0047xc+/2mj9aAuHH6233nrrpbV9zz77bGM/0F+/+93vYgxUmZJhJcvifsjm8KP1zjjjjJih1eaQQw5p7Af665Of/GSMgWpTsizuh2wOP1qtvJAXLFgQ87PKzJs3r7Ef6L+5c+fGOKgyC/6TZVo/Js3hR6udeeaZMTurzcEHH9zYD/TfjjvuGOOg2pRMi/shk8OP1lp//fW1fUCKG2+8McZClVnwn0wr2Rb3QxaHH6111llnxcysNt/61rca+4Hh+MQnPhFjodqUbIv7IYvDj1YqL+KXX3455mWVeeaZZxr7geG54YYbYjxUmZJtWj8mxeFHK5199tkxK6vNgQce2NgPDM8OO+wQ46HalIyL+yGDw4/W2WCDDdLavqeffrqxHxiu66+/PsZElSkZV7Iu7ofaHH60zjnnnBMzstp84xvfaOwHhmv77bePMVFtStbF/VCbw49W2XDDDUevvPJKzMcqo+0D3sl1110X46LKlKwrmRf3Q00OP1rl3HPPjdlYbb7+9a839gN8/OMfj3FRbUrmxf1Qk8OP1thoo43S2r6nnnqqsR/gTddee22MjSpTMq9kX9wPtTj8aI3zzjsvZmK1+drXvtbYD/Cm7bbbLsZGtSnZF/dDLQ4/WuG9732vtg9olWuuuSbGR5Up2VcyMO6HGhx+tML5558fs7DafPWrX23sB4g+9rGPxfioNiUD436oweHHxGW2fU8++WRjP8DCXH311TFGqozWjywOPybuggsuiBlYbb785S839gMszLbbbjv697//HaOkypQsjPth3Bx+TNTGG2+c1vY98cQTjf0Ai3PVVVfFOKkyJQtLJsb9ME4OPybqwgsvjNlXbQ444IDGfoDF+chHPpLW+pVMjPthnBx+TMwmm2wyevXVV2PuVZnHH3+8sR9gqn7961/HWKkyJRNLNsb9MC4OPybmoosuiplXbb74xS829gNM1TbbbJPW+pVsjPthXBx+TMSmm26a1vY99thjjf0A03XllVfGeKkyJRtLRsb9MA4OPybi4osvjllXbfbbb7/GfoDp2nrrrdNav5KRcT+Mg8OPdOUl+9prr8WcqzLaPmCcrrjiihgzVaZkpNaPGhx+pLvkkktixlWbL3zhC439ADO11VZbpbV+JSvjfpgthx+pNttss7S279FHH23sB5ityy+/PMZNlSlZWTIz7ofZcPiR6tJLL43ZVm323Xffxn6A2dpyyy3TWr+SmXE/zIbDjzTvf//709q+Rx55pLEfYFx+9atfxdipMiUzS3bG/TBTDj/S/OxnP4uZVm322Wefxn6Acdliiy1Gr7/+eoyeKlOyM+6HmXL4keIDH/hAWkg+/PDDjf0A4/bLX/4yxk+VKdlZMjTuh5lw+JHi5z//ecyyarP33ns39gOM24c//OG0B23J0LgfZsLhR3Wbb755Wjg+9NBDjf0AtVx22WUxhqpMydCSpXE/TJfDj+p+8YtfxAyrNp/97Gcb+wFq+eAHP5j2sC1ZGvfDdDn8qCozFP/1r3819gPUlvW4LVlaMjXuh+lw+FFV1v8MUmbPPfds7AeoLfMfZymZGvfDdDj8qCbzH3z+5z//2dgPkCXr/wNbydSSrXE/TJXDj2qy/lUHZT7zmc809gNkyfxXVpVsjfthqhx+VJH5LzfV9gFtkPUvqS/ZWjI27oepcPhRRdZ/zqjM7rvv3tgPkC3zP0tZMjbuh6lw+DF2mf8B8wcffLCxH2BSLr300hhTVaZkbMnauB8Wx+HH2F1++eUxo6rNpz/96cZ+gEnZbLPN0lq/krVxPyyOw4+x2mqrrdLavn/84x+N/QCTdskll8S4qjIla0vmxv2wKA4/xuqKK66I2VRtdtlll8Z+gEnbdNNN01q/krlxPyyKw4+x2XrrrdPavr///e+N/QBtcfHFF8fYqjIlc0v2xv2wMA4/xubKK6+MmVRttH1Am5XW79VXX43RVWVK9sb9sDAOP8Zim222SWv7/va3vzX2A7TNRRddFOOrypTsLRkc98M7cfgxFr/+9a9jFlWbnXfeubEfoG022WSTtNavZHDcD+/E4cesfeQjH0lr+x544IHGfoC2uvDCC2OMVZmSwSWL436IHH7M2lVXXRUzqNp86lOfauwHaKuNN9549Morr8QoqzIli+N+iBx+zMq2226b1vbdf//9jf0AbXfBBRfEOKsyJYtLJsf98FYOP2bl6quvjtlTbT7xiU809gO03Xvf+9601q9kctwPb+XwY8Y+9rGPxcypNn/9618b+wG64vzzz4+xVm1KNsf98CaHHzN2zTXXxLypNto+oMsyW7+SzXE/vMnhx4xst912MWuqzX333dfYD9A15513Xoy3alMyOu6HwuHHjFx77bUxZ6rN9ttv39gP0DUbbbRRWutXMjruh8Lhx7R9/OMfjxlTbe69997GfoCuOvfcc2PMVZuS1XE/OPyYtuuuuy7mS7XxP1cAfbLhhhumtX4lq+N+cPgxLeV/ds2ae+65p7EfoOvOOeecGHfVxj8qQ+TwY1quv/76mCvV5qMf/WhjP0DXbbDBBqOXX345Rl6VKZkd9zNsDj+mbIcddoiZUm3uvvvuxn6Avjj77LNj7FWbkt1xP8Pl8GPKbrjhhpgn1cZ/dgjos/XXXz+t9SvZHfczXA4/pqT8C5Sz5i9/+UtjP0DfnHXWWTH+qo1/CT5vcvgxJTfeeGPMkWqj7QOGoLR+CxYsiBFYZUqGx/0Mk8OPxdpxxx1jhlSbO++8s7EfoK/OPPPMGIPVpmR53M/wOPxYrLlz58b8qDbbbLNNYz9AX6233npprV/J8rif4XH4sUif/OQnY3ZUG20fMERnnHFGjMNqUzI97mdYHH4s0u9+97uYG9Vm6623buwH6LvS+s2fPz9GYpUpmR73MywOPxZqp512iplRbe64447GfoChOP3002MsVpuS7XE/w+HwY6FuuummmBfVZsstt2zsBxiKddddN631K9ke9zMcDj/e0c477xyzotpo+wByW7+S8XE/w+Dw4x3dfPPNMSeqzRZbbNHYDzA066yzzuill16KEVllSsbH/QyDw4+GXXbZJWZEtfnjH//Y2A8wVKeddlqMyWpTsj7up/8cfjTccsstMR+qzYc+9KHGfoChWnvttdNav5L1cT/95/DjbTLbvj/84Q+N/QBDd+qpp8a4rDZav+Fx+PE2t956a8yFarP55ps39gMM3VprrTV68cUXY2RWmZL5cT/95vDjf3bdddeYCdXm9ttvb+wH4P+ccsopMTarTcn+uJ/+cvjxP7fddlvMg2qj7QNYuMzWr2R/3E9/Ofx4w2677RazoNoIGYDF++EPfxjjs9qU34C4n35y+PGG8j+9Zsy///3v0WabbdbYD8DbrbnmmqMXXnghxmiV8Y/fDIfDj9Huu+8eM6DaaPsApu7kk0+OMVptym9B3E//OPwY/f73v4/ff5XR9gFMT2brV34L4n76x+E3cHvssUf89quNf20AwPSddNJJMU6rTflNiPvpF4ffwJV/iXLGlLZvk002aewHYNHWWGON0fPPPx9jtcr4F+v3n8NvwPbcc8/4zVcb/2kggJk78cQTY6xWm/LbEPfTHw6/gVpqqaVGf/rTn+L3XmVK2/e+972v8TcAMDWrr7766LnnnovxWmXKb0P5jYh/A/3g8BuovfbaK37r1ebmm29u7Adgek444YQYr9Wm/EbE/fSDw2+AykvujjvuiN95ldH2AYxHaf2effbZGLNVpvxGaP36yeE3QJlt30033dTYD8DMHH/88TFmq43Wr58cfgNTXnB//vOf4/ddZUrb9573vKfxNwAwM6uttlpa61d+K7R+/ePwG5jPfe5z8duuNr/97W8b+wGYnWOPPTbGbbUpvxlxP93m8BuQ7LZvo402avwNAMzOqquuqvVjxhx+A7L33nvHb7razJ07t7EfgPGYM2dOjN1qU3474n66y+E3EOXFduedd8bvucqUtm/DDTds/A0AjEdp/ebNmxfjt8qU3w6tX384/AZin332id9ytbnxxhsb+wEYr2OOOSbGb7UpvyFxP93k8BuA8lK766674ndcZbR9ADkyW7/yG6L16weH3wDsu+++8RuuNjfccENjPwB1HH300TGGq035LYn76R6HX88tvfTSo7vvvjt+v1WmtH3rr79+428AoI53v/vdo2eeeSbGcZUpvyXlNyX+DXSLw6/nPv/5z8dvt9pcf/31jf0A1PW9730vxnG1Kb8pcT/d4vDrsfIyu+eee+J3W2VK27fuuus2/gYA6lpllVVGTz/9dIzlKlN+U7R+3ebw67H99tsvfrPV5tprr23sByDHUUcdFWO52pTflrif7nD49VR5kd17773xe60y2j6AySqt31NPPRXjucqU3xatX3c5/Hpq//33j99qtbnmmmsa+wHIdeSRR8Z4rjblNybupxscfj20zDLLjO677774nVaZ0vatvfbajb8BgFwrr7xyWutXfmPKb038G2g/h18PZbZ9V199dWM/AJNxxBFHxJiuNlq/bnL49Ux5gd1///3x+6wyr7/++mittdZq/A0ATMZKK600evLJJ2NcV5nyW6P16x6HX8986Utfit9mtbnqqqsa+wGYrMMPPzzGdbUpvzlxP+3m8OsRbR8ApfV74oknYmxXGa1f9zj8euSAAw6I32S1+c1vftPYD0A7fOc734mxXW3Kb0/cT3s5/Hpi2WWXHT3wwAPxe6wype1bc801G38DAO2w4oorjh5//PEY31Wm/PaU36D4N9BODr+e+MpXvhK/xWpz5ZVXNvYD0C6HHXZYjO9qU36D4n7aaYk5c+aM6L4HH3wwfodVRtsH0A2l9XvsscdijFeZ8hsUf5dopyXi/+UZs6i54oorGuECQDsdeuihMcbNwMfhZ6Y8pe1bffXVG8ECQDutsMIKo0cffTTGuRnwOPzMlOfyyy9vhAoA7XbIIYfEODcDHoefmdJo+wC6qbR+jzzySIx1M9Bx+Jkpza9+9atGmADQDQcffHCMdTPQcfiZxU5p+1ZdddVGkADQDcsvv7zWz7wxDj+z2LnssssaIQJAtxx00EEx3s0A5/8BlBqsF14eTOcAAAAASUVORK5CYII=";
let bgImg;

(() => {
  const img = new Image();

  img.addEventListener("load", () => {
    bgImg = ctx.createPattern(img, "repeat");
  });

  img.addEventListener("error", console.log);

  img.src = bgImgUrl;
})();

let pointerLocked = false;
document.addEventListener("pointerlockchange", () => {
  if (document.pointerLockElement === canvas) {
    pointerLocked = true;
  } else {
    pointerLocked = false;
  }

  if (pointerLocked) {
    cover.style.display = "none";
  } else {
    cover.style.display = "flex";
  }
});

const gameWidth = 12000;
const gameHeight = 12000;

const root2 = Math.sqrt(2);

const player = new Player();

/**
 * @type {Bullet[]}
 */
const bullets = [];

/**
 * @type {Monster[]}
 */
const monsters = [];

/**
 * @type {Explosion}
 */
const explosions = [];

Array(4)
  .fill()
  .forEach(() => monsters.push(new Monster(50, 50, 5)));
monsters.push(new Monster(1200, 1200, 500));

const fps = 30;

const msPerFrame = 1000 / fps;

let lastUpdate = performance.now();

const render = time => {
  const timeDelta = time - lastUpdate;

  const multiplier = timeDelta / msPerFrame;

  lastUpdate = time;

  if (!pointerLocked) {
    return requestAnimationFrame(render);
  }

  renderBg();

  // render monsters
  Array(5 - monsters.length)
    .fill()
    .forEach(() => monsters.push(new Monster(50 + kills * 2, 50 + kills * 2, 5 + kills)));

  const explosionsToRemove = [];
  explosions.forEach((explosion, idx) => {
    if (explosion.update(multiplier)) {
      // explosion done
      explosionsToRemove.push(idx);
    }
    explosion.draw();
  });

  [...explosionsToRemove].reverse().forEach(idx => explosions.splice(idx, 1));

  const monstersToRemove = [];
  monsters.forEach((monster, idx) => {
    if (monster.update(multiplier)) {
      // monster dead
      monstersToRemove.push(idx);

      explosions.push(
        new Explosion(monster.x, monster.y, Math.sqrt(monster.width * monster.height), {
          min: 3,
          max: Math.sqrt(monster.width * monster.height) / 10,
        })
      );

      score += monster.maxHealth;
      kills++;
      scoreEl.innerHTML = score;
    }
    monster.draw();
  });

  [...monstersToRemove].reverse().forEach(idx => monsters.splice(idx, 1));

  // render bullets
  const bulletsToRemove = [];
  bullets.forEach((bullet, idx) => {
    if (bullet.update(multiplier)) {
      // bullet out of bounds
      bulletsToRemove.push(idx);
    }
    bullet.draw();
  });

  [...bulletsToRemove].reverse().forEach(idx => bullets.splice(idx, 1));

  player.update(multiplier);
  player.draw();

  if (player.health <= 0) {
    document.exitPointerLock();

    let highScore = localStorage.getItem("tanks.high");

    if (!highScore) {
      highScore = 0;
    } else {
      highScore = parseInt(highScore);
    }

    highScore = Math.max(score, highScore);

    document.querySelector(".dead").style.display = "flex";
    document.querySelector(".dead .score-final").innerHTML = score;
    document.querySelector(".dead .score-high").innerHTML = highScore;

    localStorage.setItem("tanks.high", highScore.toString());
  } else {
    requestAnimationFrame(render);
  }
};

setInterval(() => (pointerLocked ? player.shoot() : null), msPerFrame);

requestAnimationFrame(render);

window.addEventListener("contextmenu", e => e.preventDefault());
