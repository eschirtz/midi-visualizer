// GLOBAL VARIABLES
var visualizationData = []; // Holds VisData objects to conditionally inflate DOM elements
var midiDeviceFound = false;

$(document).ready(function(){
  /**
    * Check to see if the API loads
    * and print a message if there is a device plugged in
   **/
  WebMidi.enable(function(error){
      if(error){
        console.log("WebMidi could not be enabled.", error);
      } else {
        console.log("WebMidi enabled!");
      }

   /**
     * Set up the document
    **/
    var deviceNames = [];
    var input = WebMidi.input;
    if(input != null){
      midiDeviceFound = true; 
      for(i=0; i<input.length; i++){
        deviceNames.push(input[0].name);
      }
    }

    // Create message
    var deviceListHtml = MIDI_ERROR_MSG;
    if(deviceNames.length > 0){
      deviceListHtml = "<h4>Connected Devices:</h4><ul>";
      deviceNames.forEach(function(name){
        deviceListHtml += "<li>" + name + "</li>";
      });
      deviceListHtml += "</ul>";
    }
    // Print message
    $("#midi-device-label").html(deviceListHtml);
  });
});
