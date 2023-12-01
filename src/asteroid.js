const canvas = document.querySelector("#game-canvas");
const c = canvas.getContext("2d");
 class Asteroid {
    constructor(props) {
      const { position, velocity, radius } = props;
      this.position = position;
      this.velocity = velocity;
      this.radius = radius
    }
    draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = "orange";
      c.stroke();
    }
    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  export default Asteroid