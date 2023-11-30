const SPEED = 5;
const ROTATIONAL_SPEED = 6;
const FRICTION = 0.95

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
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
};
const animate = () => {
  window.requestAnimationFrame(animate); //call this function over and over

  clearCanvas();

  player.update();

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
  console.log(player.velocity);
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
