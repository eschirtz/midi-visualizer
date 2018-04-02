// GLOBAL VARIABLES
var WebMidi = WebMidi || null;
var visualizationData = []; // Holds VisData objects to conditionally inflate DOM elements
var midiDeviceFound = false;
var inputs;
var midiInput;
$(document).ready(function(){
  /**
    * Check to see if the API loads
    * and print a message if there is a device plugged in
   **/
  if(WebMidi){
    WebMidi.enable(function(error){
        if(error){
          console.log("WebMidi could not be enabled.", error);
        } else {
          console.log("WebMidi enabled!");
          inputs = WebMidi.inputs;
        }
    });
  }
  else{
    console.log("WebMidi is not accessible");
    inputs = null;
  }

   /** Set up the document **/
   // Input devices
    var deviceNames = [];
    if(inputs != null){
      midiDeviceFound = true;
      midiInput = inputs[INPUT_NUMBER];
      for(i=0; i<input.length; i++){
        deviceNames.push(input[0].name);
      }
    }
    // Create message
    var deviceListHtml = MIDI_ERROR_MSG;
    if(deviceNames.length > 0){
      deviceListHtml = "<h5>Connected Devices:</h5><ul>";
      deviceNames.forEach(function(name){
        deviceListHtml += "<li>" + name + "</li>";
      });
      deviceListHtml += "</ul>";
    }
    // Print message
    $("#midi-device-label").html(deviceListHtml);
    // Visualization Menu
    visualizationData.forEach(function(vis){
      // Create the button element
      var button = $('<button/>',
        {
          class: "button-primary",
          type: "button",
          text: vis.name,
          click: vis.run,
        });
      var container = $('<div/>');
      container.addClass('menu-item');
      container.css("background-image", "url(" + vis.imageURL + ")");
      container.append(button);
      // Add the button to the menu
      $("#vis-menu").append(container);
    });

});
