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
    const MIDI_ERROR_MSG = "<h4>No MIDI device detected</h4>" +
                           "<p>First try refreshing your window a couple times, if that " +
                           "doesn't work, next try quitting your browser, ensuring your MIDI device" +
                           "is plugged in, and relaunching your browser.</p>";

    WebMidi.inputs.forEach(function(input){
      deviceNames.push(input.name);
    });
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
