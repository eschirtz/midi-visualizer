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
    this.scale = 15;
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
      context.fillStyle = this.color;
      console.log("x: " + this.x + " y: " + this.y + " speed: " + this.speed);
      context.fillRect(this.x,this.y,this.scale,this.scale);
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

  // ** MIDI HANDLERS ** //
  WebMidi.enable(function (err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }
    // Log inputs
    console.log(WebMidi.inputs);

    // Globals
    var input = WebMidi.inputs[0];

    /**
      * Event Handlers
     **/
    input.addListener('noteon', "all",function (e) {
        drawNote(e.note.name, e.note.octave, e.note.velocity);
    });
    input.addListener('controlchange', "all", function(e){
      drawFader(e.value);
    });
  });
  function drawNote(note, octave, intensity, context){
  var note = note.charAt(0);
  var deltaX = canvas.width / 7;
  var x;
  var context = context | ctx;
  var bgColor = "black";
  switch (note) {
    case 'A':
      bgColor = "red";
      x = 0;
      break;
    case 'B':
      bgColor = "orange";
      x = deltaX;
      break;
    case 'C':
      bgColor = "yellow";
      x = deltaX * 2;
      break;
    case 'D':
      bgColor = "green";
      x = deltaX * 3;
      break;
    case 'E':
      bgColor = "blue";
      x = deltaX * 4;
      break;
    case 'F':
      bgColor = "indigo";
      x = deltaX * 5;
      break;
    case 'G':
      bgColor = "violet";
      x = deltaX * 6; 
      break;
    default:
      // none
  }
  notes.push(new Note(x, y, bgColor));
}
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
