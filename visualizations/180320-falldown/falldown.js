// Globals
var colors = [];
const COLOR_SIZE = 30;
var spinner = 0;
var time = 0;
var gravity = 9.8;
var backgroundColor = "lightblue";
// DOM
var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');
// Setup
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.fillStyle = backgroundColor;
ctx.fillRect(0,0,canvas.width,canvas.height);

function animation(){
  // ctx.fillStyle = backgroundColor;
  // ctx.fillRect(0,0,canvas.width,canvas.height);
  colors.forEach(function(color){
    console.log(color.birthTime);
    ctx.fillStyle = color.color;
    ctx.fillRect(time%canvas.width,time - color.birthTime,40,40);
  });
  time++;
  window.requestAnimationFrame(animation);
}
document.onload = animation();


function drawFader(value){
  var hue = 360 * (value/128);
  backgroundColor = "hsl(" + hue + ", 100%, 50%)";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}


function drawNote(note, octave, intensity){
  var note = note.charAt(0);
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
  var visualNote = new Object();
  visualNote.color = bgColor;
  visualNote.birthTime = time;
  colors[spinner] = visualNote;
  spinner = (spinner + 1) % COLOR_SIZE;
  console.log(colors);
}
/**
  * Copy this script and paste it at the bottom of your
  * visualizer script
**/
WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
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
