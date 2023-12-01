const canvas = document.querySelector("#game-canvas");
const c = canvas.getContext("2d");
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

  export default Projectile