/**
  *
  *
  *
  *
  *
 **/
 function VisData(name, img){
   // Visualization Name
   this.name = name;
   // Thumbnail Image
   this.image = img || null;
   // Root relative path or absolute path to be html file
   this.url = DOCUMENT_ROOT + "visualizations/000000-Template/template.html";
   // Metadata for the visualization (hardware requirments etc)
   this.meta =
   {
     "hardware" : "midi",
     "version"  : "1.0",
     "files"    : ['template.js','template.html']
   }
 }
