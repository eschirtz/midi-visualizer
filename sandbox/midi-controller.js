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
