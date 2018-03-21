/** FILE-NAME: DEMO
 *  AUTHOR: Eric Schirtzinger
 */
var visName = "Demo"
var visualization = new VisData(visName);
visualization.meta.files = "Note.js";
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
  /**
   * Set up for the canvas and globals
   */
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

  Utility.makeToast(ESC_MESSAGE);
  visualization.meta.isActive = true;

  // ** ADD VISUALIZER CODE BELOW ** //
  var notes = [];

  // ** ANIMATION LOOP ** //
  function animationLoop(){
    // Clear Screen
    context.fillStyle = backgroundColor;
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
  Utility.initDelta();
  animationLoop();


  // ** MIDI HANDLERS ** //
  if(midiInput){
    midiInput.addListener('noteon', "all",function (e) {
        drawNote(e.note.name, e.note.octave, e.note.velocity);
    });
    midiInput.addListener('controlchange', "all", function(e){
      drawFader(e.value);
    });
  }

  function drawNote(note, octave, intensity, context){
  var note = note.charAt(0);
  var deltaX = canvas[0].width / 7;
  var x;
  var y = -15;
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
  var note = new Note(x, y, bgColor);
  console.log(note);
  notes.push(note);
}
function drawFader(value){
  var hue = 360 * (value/128);
  var color = "hsl(" + hue + ", 100%, 50%)";
  backgroundColor = color;
}
  // ** UTILITY FUNCTIONS ** //
  /**
    * Function to keep canvas full screen
   **/
  window.onresize = function(){
    canvas[0].height = window.innerHeight;
    canvas[0].width = window.innerWidth;
    context.fillStyle = backgroundColor;
    context.fillRect(0,0,canvas[0].width,canvas[0].height);
  }
}
// Add to the master array
visualizationData.push(visualization);
