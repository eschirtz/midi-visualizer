/**
  * The VisData object holds all
  * required data to run a visualization
 **/
 function VisData(name, img){
   // Visualization Name
   this.name = name;
   // Thumbnail Image
   this.image = img || null;
   // Launch the application
   this.run = function(){
     alert("Warning: Function has not been correctly implemented");
   }
   // Root relative path or absolute path to be html file
   this.url = DOCUMENT_ROOT + "visualizations/000000-Template/template.html";
   // Metadata for the visualization (hardware requirments etc)
   this.meta =
   {
     "hardware" : "midi",
     "version"  : "1.0",
     "files"    : [],
     "isActive" : false
   }
   // Escape out of the visualization
   document.addEventListener('keydown', (event) => {
     if(event.keyCode == 27){
       this.meta.isActive = false;
       $("#" + CANVAS_ID).remove();
     }
   });
 }
