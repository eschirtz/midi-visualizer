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
