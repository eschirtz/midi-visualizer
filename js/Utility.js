/**
 * Utility is a tool that can be used
 * by visualizers to abstract common
 * useful features required for creating visualizations
 */
function Utility(){
  // ** TIMING & ANIMATION ** //
  this.now = 0;
  this.then = 0;
  this.delta = 0;
  this.gravity = 2;
  this.setDelta = function(){
    this.now = Date.now();
    // Seconds since last frame
    this.delta = (this.now - this.then) / 1000;
    // Prevent against start up errors
    if(this.delta > TIMING_FILTER){
      this.delta = 0;
    }
    this.then = this.now;
  }
}
var Utility = new Utility();
// Shake out the edge cases
var counter = 0;
function shakeOff(){
  Utility.setDelta();
  if(counter < 10){
    window.requestAnimationFrame(shakeOff);
  }
  counter++;
  console.log(Utility.delta);
}
shakeOff();
