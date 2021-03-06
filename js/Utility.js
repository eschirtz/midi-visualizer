/**
 * Utility is a tool that can be used
 * by visualizers to abstract common
 * useful features required for creating visualizations
 */
function Utility(){
  // ** TIMING & ANIMATION ** //
  this.time = function(){
    return Date.now() / 1000; // Return current time in seconds
  }
  this.now = 0;
  this.then = 0;
  this.delta = 0;
  this.gravity = 20;
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
  this.initDelta = function(){
    this.now = Date.now();
    this.then = Date.now();
  }
  // ** UI ELEMENTS ** //
  this.makeToast = function(text, timeup){
    var toast = $("<div class='toast'/>");
    var timeup = timeup | TOAST_UP_TIME;
    toast.html("<p>" + text + "</p>");
    $("body").append(toast);

    // Wait to fade in
    setTimeout(function(){
      toast.addClass("active");
    }, TOAST_FADE_WAIT);
    // Wait to fade out
    setTimeout(function(){
      toast.removeClass("active");
    }, timeup);
    // Wait to kill element
    setTimeout(function(){
      toast.remove();
    }, timeup + TOAST_FADE_TIME);
  }
}
// Create the global Utility object
var Utility = new Utility();
