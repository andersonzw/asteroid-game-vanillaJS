import Projectile from "./projectiles.js";
import Player from "./player.js";
import Asteroid from "./asteroid.js";
const SPEED = 5;
const ROTATIONAL_SPEED = 6;
const FRICTION = 0.95;
const PROJ_SPEED = 10;
const ASTEROID_SIZE = 50 * Math.random() + 30;

const projectiles = [];
const asteroids = [];

const canvas = document.querySelector("#game-canvas");
const c = canvas.getContext("2d");

// full width/height of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
// window.setInterval(()=>{
//   projectiles.push(
//     new Projectile({
//       position: {
//         x: player.position.x + 30 * Math.cos(player.rotation),
//         y: player.position.y + 30 * Math.sin(player.rotation),
//       },
//       velocity: {
//         x: Math.cos(player.rotation) * PROJ_SPEED,
//         y: Math.sin(player.rotation) * PROJ_SPEED,
//       },
//     })
//   );
// },100)
window.setInterval(() => {
  const index = Math.floor(4 * Math.random()); //Random number 0,1,2,3
  const radius = ASTEROID_SIZE;
  console.log(asteroids);
  let x, y;
  let vx, vy;
  switch (index) {
    case 0: //left of screen
      x = 0 - radius;
      y = Math.random() * canvas.height;
      vx = 1;
      vy = 0;
      break;
    case 1: //bottom of screen
      x = Math.random() * canvas.width;
      y = canvas.height + radius;
      vx = 0;
      vy = -1;
      break;
    case 2: //right of screen
      x = canvas.width + radius;
      y = Math.random() * canvas.height;
      vx = -1;
      vy = 0;
      break;

    case 3: //top of screen
      x = Math.random() * canvas.width;
      y = 0 + radius;
      vx = 0;
      vy = 1;
      break;
  }
  asteroids.push(
    new Asteroid({
      position: {
        x: x,
        y: y,
      },
      velocity: {
        x: vx,
        y: vy,
      },
      radius,
    })
  );
}, 500);

const animate = () => {
  window.requestAnimationFrame(animate); //call this function over and over
  clearCanvas();

  player.update();
  // SPAWN ASTEROIDS
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update();
    if (
      asteroid.position.x + asteroid.radius < 0 ||
      asteroid.position.x - asteroid.radius > canvas.width ||
      asteroid.position.y + asteroid.radius < 0 ||
      asteroid.position.y - asteroid.radius > canvas.height
    ) {
      asteroids.splice(i, 1);
    }
  }

  // SPAWN PROJECTILES
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
