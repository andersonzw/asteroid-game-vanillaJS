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
      // this.position.x += Math.floor(this.velocity.x/this.radius*10);
      // this.position.y += Math.floor(this.velocity.y/this.radius*10);
      this.position.x += Math.floor(this.velocity.x/this.radius*10) + 1;
      this.position.y += Math.floor(this.velocity.y/this.radius*10) +1;
    }
  }

  export default Asteroid