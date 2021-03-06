/** App data and update functions **/
function WiggleApp(){
  // COLORS
  var BOX_LIFE = 10000;
  this.bgColor = 'rgb(33,33,33)';
  this.bgHue;
  this.primaryColor = 'white';
  this.getColor = function(){
    this.bgHue = Math.floor(Math.random() * 100)
    this.bgColor = "hsl(" + this.bgHue + ", 60%, 50%)";
    return this.bgColor;
  }
  this.appElements = [];
  // Directions
  this.info = {
    delta: {
      x: 0,
      y: 0.1,
      xTarget: 0,
      yTarget: 0.5
    },
    speed: {
      max: 1,
      min: 0.25
    },
  }
  // Objects
  // Low Pass filter to record activity
  const LPF_DEPTH = 1.5; // #seconds to average over
  const EASE_FACTOR = 15; // Divisor ease factor
  const MIN_SPEED = 0.75;
  this.lpfData = [];
  // NPS acts as velocity or stepsize
  var nps = 0; // notes per second
  var npsSmoothed = nps; // nps is the target, update to get close
  var distance = 0;
  this.logEvent = function(notePlayed){
    // Log the event's current time (in seconds)
    if(notePlayed){
      this.lpfData.push(Utility.time());
    }
    // Sum up actions in the LPF_DEPTH last seconds
    var count = 0;
    for(var i=0; i<this.lpfData.length; i++){
      if(Utility.time() - this.lpfData[i] < LPF_DEPTH){
        count++;
      }
      else{
        // Remove the one element, and point to next
        this.lpfData.splice(i,1);
        i--;
      }
    }
    nps = count/LPF_DEPTH;
    nps = nps == 0 ? MIN_SPEED : nps;
    npsSmoothed += (nps - npsSmoothed) / EASE_FACTOR;
  }



  this.init = function(){

    const boxStartDim = 100;
    const NUM_BOXES = 0;
    const HUE_SHIFT = 5;
    const HUE_DEPTH = 90;
    for(var i=0; i<NUM_BOXES; i++){
      var box = new Box(
        window.innerWidth/2 + boxStartDim * 2 * i,
        window.innerHeight/2 + boxStartDim * 2 * i,
        boxStartDim, boxStartDim);
        box.phi = 2*Math.PI/NUM_BOXES * i;
        var hue = (this.bgHue + HUE_SHIFT + HUE_DEPTH/NUM_BOXES * i) % 360;
        box.color = "hsl(" + hue + ", 60%, 50%)";
        this.appElements.push(box);
    }
  }
  this.addBox = function(x,hue){
    const boxStartDim = 100;
    var box = new Box(x,0,boxStartDim, boxStartDim);
    box.color = "hsl(" + hue + ", 60%, 50%)";
    box.life = BOX_LIFE;
    this.appElements.push(box);
  }

  // Update
  this.update = function(delta){
    this.logEvent(false);
    distance += npsSmoothed * delta;
    this.info.delta.x += (this.info.delta.xTarget - this.info.delta.x) / EASE_FACTOR;
    this.info.delta.y += (this.info.delta.yTarget - this.info.delta.y) / EASE_FACTOR;
    var app = this;
    this.appElements.forEach(function(el){
      // Decrement life count
      el.life--;
      // Have each box move downward
      el.velocity[0] = npsSmoothed > app.info.speed.max ? app.info.speed.max : npsSmoothed;
      el.velocity[1] = npsSmoothed > app.info.speed.max ? app.info.speed.max : npsSmoothed;
      el.velocity[0] = el.velocity[0] * 500;
      el.velocity[1] = el.velocity[1] * 50;
      el.x = (el.x + app.info.delta.x * el.velocity[0]) % (window.innerWidth + el.baseW * 2);
      el.y = (el.y + app.info.delta.y * el.velocity[1]) % (window.innerHeight + el.baseH * 2);
    });
  }
  // Render
  this.render = function(context){
    this.appElements.forEach(function(el){
      el.draw(context, distance);
    });
  }
}
/** Shapes **/
function Box(x,y,width,height){
  this.x = x; this.y = y;
  this.baseW = width; this.baseH = height;
  this.phi = 0;
  this.velocity = []; // velocity vector
  this.velocity[0] = 100;
  this.velocity[1] = 100;
  this.life;
  this.color = "white";
  this.draw = function(context, distance){
    var w = Math.cos(distance + this.phi) * this.baseW;
    var h = Math.cos(distance + this.phi) * this.baseH;
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 15;
    context.rect(this.x - w/2 - this.baseW/2, this.y - h/2 - this.baseH/2,
      this.baseW + w, this.baseH + h);
    context.stroke();
  }
}
