/** FILE-NAME: DEMO
 *  AUTHOR: Eric Schirtzinger
 */
var visName = "Demo"
var visualization = new VisData(visName);
visualization.image = new Image();
visualization.image.src = 'images/favicon.png';

/**
 * run(): Called from index.html to begin visualizer
 * Useful Objects:
 * "canvas" - the jQuery canvas object
 * "canvas[0]" - the HTML canvas object
 * "context" - the HTML 2D canvas context
 */
visualization.run = function(){
  // ** SETUP AND INITIALIZATION ** //
  /**
   * Set up for the canvas and globals
   */
  $("#" + CANVAS_ID).remove();
  var canvas = $("<canvas id='" + CANVAS_ID + "'/>");
  var context = canvas[0].getContext('2d');
  canvas.width(window.innerWidth);
  canvas.height(window.innerHeight);
  canvas.css({
    'background-color' : DEFAULT_BG_COLOR,
    'position' : 'fixed',
    'top' : 0,
    'left' : 0
  });
  $("body").append(canvas);
  visualization.meta.isActive = true;

  // ** ADD VISUALIZER CODE BELOW ** //
  // Note object
  function Note(x, y, color){
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.time = 0;
    this.scale = 0.1;
    this.color = color;
    this.update = function(delta){
      this.scale += this.speed * delta / 10;
      // time since birth of the Note
      this.time = this.time + delta;
      // Accelerate the Note
      this.speed = this.speed + Utility.gravity * this.time;
      // Move Note
      this.y = this.y + this.speed * delta;
    }
    this.render = function(context){
      context.fillStyle = this.color;
      console.log("x: " + this.x + " y: " + this.y + " speed: " + this.speed);
      context.fillRect(this.x,this.y,this.scale*10,this.scale*10);
    }
  }
  var notes = [];
  notes.push(new Note(canvas[0].width/2, 0, 'purple'));

  // ** ANIMATION LOOP ** //
  function animationLoop(){
    // Clear Screen
    context.fillStyle = DEFAULT_BG_COLOR;
    context.fillRect(0,0,canvas[0].width,canvas[0].height);
    // Update
    notes.forEach(function(note){
      note.update(Utility.delta);
      note.render(context);
    });

    // ** PREPARE FOR NEXT FRAME ** //
    if(!visualization.meta.isActive){
      return;
    }
    Utility.setDelta();
    window.requestAnimationFrame(animationLoop);
  }
  // Begin animation loop
  animationLoop();

  // ** UTILITY FUNCTIONS ** //
  /**
    * Function to keep canvas full screen
   **/
  window.onresize = function(){
    canvas.height(window.innerHeight);
    canvas.width(window.innerWidth);
    context.fillStyle = DEFAULT_BG_COLOR;
    context.fillRect(0,0,canvas[0].width,canvas[0].height);
  }
}
// Add to the master array
visualizationData.push(visualization);
