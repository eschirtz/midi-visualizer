// Note object
function Note(x, y, color){
  this.x = x;
  this.y = y;
  this.speed = 300;
  this.time = 0;
  this.color = color;
  this.update = function(delta){
    // time since birth of the Note
    this.time = this.time + delta;
    // Accelerate the Note
    this.speed = this.speed + Utility.gravity * this.time;
    // Move Note
    this.y = this.y + this.speed * delta;
  }
  this.render = function(context){
    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + 10, this.y+20);
    context.stroke();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, 100, 100);
  }
}
