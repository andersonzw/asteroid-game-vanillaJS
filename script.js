const SPEED = 5;
const ROTATIONAL_SPEED = 6;
const FRICTION = 0.95;
const PROJ_SPEED = 10;

const projectiles = [];

const canvas = document.querySelector("#game-canvas");
const c = canvas.getContext("2d");
// full width/height of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create background (x,y, w,h )
c.fillRect(0, 0, canvas.width, canvas.height);
c.fillStyle = "black";

// creating the player shape
class Player {
  constructor(props) {
    const { position, velocity } = props;
    this.position = position; // {x,y}
    this.velocity = velocity;
    this.rotation = 0;
  }

  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation); // rotate the whole object
    c.translate(-this.position.x, -this.position.y);
    // making a triangle
    c.beginPath();
    c.moveTo(this.position.x + 30, this.position.y); //start here
    c.lineTo(this.position.x - 10, this.position.y - 10); //draw a line to here
    c.lineTo(this.position.x - 10, this.position.y + 10);
    c.closePath();

    c.strokeStyle = "white";
    c.stroke();
    c.restore();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class Projectile {
  constructor(props) {
    const { position, velocity } = props;
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "orange";
    c.fill();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
const clearCanvas = () => {
  c.fillStyle = "black";

  c.fillRect(0, 0, canvas.width, canvas.height);
};
const animate = () => {
  window.requestAnimationFrame(animate); //call this function over and over
  console.log(projectiles);
  clearCanvas();

  player.update();
  // select each projectile and render it
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    // remove bullet if off screen
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > canvas.width ||
      projectile.position.y + projectile.radius < 0 ||
      projectile.position.y - projectile.radius > canvas.height
    ) {
      projectiles.splice(i, 1);
    }
  }

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
  } else {
    // decelerate player velocity when key lifted
    player.velocity.x *= FRICTION;
    player.velocity.y *= FRICTION;
  }

  if (keys.d.pressed) player.rotation += 0.01 * ROTATIONAL_SPEED;
  else if (keys.a.pressed) player.rotation -= 0.01 * ROTATIONAL_SPEED;
};

animate();

// moving the player when button pressed
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = true;
      break;
    case "KeyD":
      keys.d.pressed = true;
      break;
    case "KeyA":
      keys.a.pressed = true;
      break;
    case "Space":
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + 30 * Math.cos(player.rotation),
            y: player.position.y + 30 * Math.sin(player.rotation),
          },
          velocity: {
            x: Math.cos(player.rotation) * PROJ_SPEED,
            y: Math.sin(player.rotation) * PROJ_SPEED,
          },
        })
      );
      break;
    default:
      break;
  }
});
// releasing the key
window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    default:
      break;
  }
});
