// Globals
var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');
var spinner = 0;
// Setup
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.fillStyle = "lightblue";
ctx.fillRect(0,0,canvas.width,canvas.height);

function drawNote(note, octave, intensity, context){
  var note = note.charAt(0);
  var context = context | ctx;
  var bgColor = "black";
  switch (note) {
    case 'A':
      bgColor = "red";
      break;
    case 'B':
      bgColor = "orange";
      break;
    case 'C':
      bgColor = "yellow";
      break;
    case 'D':
      bgColor = "green";
      break;
    case 'E':
      bgColor = "blue";
      break;
    case 'F':
      bgColor = "indigo";
      break;
    case 'G':
      bgColor = "violet";
      break;
    default:
      // none
  }
  ctx.fillStyle = bgColor;
  ctx.fillRect(spinner,0,5,canvas.height);
  spinner = (spinner + 5)%canvas.width;
  console.log(note);
}

function drawFader(value){
  var hue = 360 * (value/128);
  var color = "hsl(" + hue + ", 100%, 50%)";
  console.log(color);
  ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

/**
  * Check if script is loaded
**/
WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
  // Log inputs
  console.log(WebMidi.inputs);

  if(WebMidi.inputs[INPUT_NUMBER] != null){
    var input = WebMidi.inputs[INPUT_NUMBER];

    /**
      * Event Handlers
     **/
    input.addListener('noteon', "all",function (e) {
        drawNote(e.note.name, e.note.octave, e.note.velocity);
    });
    input.addListener('controlchange', "all", function(e){
      drawFader(e.value);
    });
  }
});
// Update canvas size
window.onresize = function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}
