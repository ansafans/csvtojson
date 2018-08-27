$(document).ready(function() {
    $("#uploadForm").on("submit",function(e){
        e.preventDefault();
        file=document.getElementById('file').files[0];
        readFile(file);
    })
});

function readFile(file){
    if (file) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
        alert( "File loaded successfully!\n" 
              +"name: " + file.name + "\n"
              +"type: " + file.type + "\n"
              +"size: " + file.size + " bytes\n"
        );  
        // console.log(contents);
        processData(contents);
      }

      r.readAsText(file);

    } else { 
      alert("Failed to load file");
    }
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = {};
            for (var j=0; j<headers.length; j++) {
                // tarr.push(headers[j]+":"+data[j]);
                tarr[headers[j]]=data[j];
            }
            lines.push(tarr);
        }
    }
    
    $('#json-container').jsonViewer(lines);
    console.log(JSON.stringify(lines));
}