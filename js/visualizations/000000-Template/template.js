/** FILE-NAME: VISUALISATION NAME HERE
 *  AUTHOR: FIRST LAST
 *
 */
var visName = "Template";
var visualization = new VisData(visName);
visualization.image = new Image();
visualization.image.src = 'images/favicon.png';
var backgroundColor = DEFAULT_BG_COLOR;

/**
 * run(): Called from index.html to begin visualizer
 * Useful Objects:
 * "canvas" - the jQuery canvas object
 * "canvas[0]" - the HTML canvas object
 * "context" - the HTML 2D canvas context
 */
visualization.run = function(){
  // ** SETUP AND INITIALIZATION ** //
  // Remove any other visualizations
  $("#" + CANVAS_ID).remove();
  var canvas = $("<canvas id='" + CANVAS_ID + "'/>");
  var context = canvas[0].getContext('2d');
  canvas[0].width = window.innerWidth;
  canvas[0].height = window.innerHeight;
  canvas.css({
    'background-color' : DEFAULT_BG_COLOR,
    'position' : 'fixed',
    'top' : 0,
    'left' : 0
  });
  $("body").append(canvas);
  visualization.meta.isActive = true;
  // Display usage message
  Utility.makeToast(ESC_MESSAGE);

  // ** ADD YOUR CODE HERE ** //
  // ** MAY ALSO INCLUDE DEPENDENCIES ** //

  // ** ADD VISUALIZER CODE BELOW ** //
  function animationLoop(){
    // Clear screen for re-draw
    context.fillStyle = backgroundColor;
    context.fillRect(0,0,canvas[0].width,canvas[0].height);
    // ** UPDATE AND RENDER ** //

    // prepare for next frame
    if(!visualization.meta.isActive){
      return;
    }
    Utility.setDelta();
    window.requestAnimationFrame(animationLoop);
  }
  // Begin animation loop
  Utility.initDelta();
  animationLoop();

  // ** UTILITY FUNCTIONS ** //
  /**
    * Function to keep canvas full screen
   **/
  window.onresize = function(){
    canvas[0].height = window.innerHeight;
    canvas[0].width = window.innerWidth;
    context.fillStyle = DEFAULT_BG_COLOR;
    context.fillRect(0,0,canvas[0].width,canvas[0].height);
  }
}
// Add to the master array
visualizationData.push(visualization);
