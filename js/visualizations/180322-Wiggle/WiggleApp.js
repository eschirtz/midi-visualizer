/** App data and update functions **/
function WiggleApp(){
  // COLORS
  this.bgColor = 'rgb(33,33,33)';
  this.primaryColor = 'white';
  this.getColor = function(){
    return "hsl(" + Math.floor(Math.random() * 100) + ",60%, 50%)";
  }
  // Objects
  this.boxes = [];
  this.boxes.push(new Box(window.innerWidth/2, window.innerHeight/2,100,200));
  this.boxes.push(new Box(window.innerWidth/2, window.innerHeight/2,150,230));
  this.boxes.push(new Box(window.innerWidth/2, window.innerHeight/2,10,200));
  this.boxes.push(new Box(window.innerWidth/2, window.innerHeight/2,331,330));

  // Update
  this.update = function(delta){
    this.boxes.forEach(function(box){
      box.angularFreq = 1.23;
    });
  }
  // Render
  this.render = function(context){
    this.boxes.forEach(function(box){
      box.draw(context);
    });
  }
}
/** Shapes **/
function Box(x,y,width,height){
  this.x = x; this.y = y;
  this.baseW = width; this.baseH = height;
  this.angularFreq = 0;
  this.color = "white";
  this.draw = function(context){
    var w = Math.cos(Utility.time() * this.angularFreq) * this.baseW;
    var h = Math.sin(Utility.time() * this.angularFreq) * this.baseH;
    context.rect(this.x - w/2 - this.baseW/2, this.y - h/2 - this.baseH/2,
      this.baseW + w, this.baseH + h);
    context.stroke();
  }
}
