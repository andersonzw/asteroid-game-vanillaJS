const FPS = 30;

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
  }

  draw() {
    // c.arc(this.position.x, this.position.y, 10, 0,Math.PI*2, false )

    // making a triangle
    c.beginPath()
    c.moveTo(this.position.x + 30, this.position.y); //start here
    c.lineTo(this.position.x - 10, this.position.y - 10); //draw a line to here
    c.lineTo(this.position.x - 10, this.position.y + 10);
    c.closePath();

    c.strokeStyle = "white";
    c.stroke();
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
};
const clearCanvas = () => {
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
};
const animate = () => {
  window.requestAnimationFrame(animate); //call this function over and over
  clearCanvas()
  player.update();
  if (keys.w.pressed) player.velocity.x = 1;
};

animate();

// moving the player
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = true;

      break;
    case "KeyD":
      break;
    case "KeyA":
      break;

    default:
      break;
  }
});
