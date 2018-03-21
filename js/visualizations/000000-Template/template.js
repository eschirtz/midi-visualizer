/** FILE-NAME: VISUALISATION NAME HERE
 *  AUTHOR: FIRST LAST
 *
 *  Add your code starting at line 37!
 */
var visName = "Template";
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

  // ** ADD YOUR CODE HERE! ** //

  // ** ADD VISUALIZER CODE BELOW ** //
  function animationLoop(){

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
