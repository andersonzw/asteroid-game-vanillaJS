const canvas = document.querySelector("#game-canvas");
const c = canvas.getContext("2d");

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

  export default Player