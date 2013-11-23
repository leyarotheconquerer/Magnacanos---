// Insert hooking of application into this file, not the game stuff itself...
window.onload = function()
{
    // Declare variables ...
    var running = true;
    
    var canvas;
    var context;
    
    var width = 800;
    var height = 600;
    
    // Initialize canvas and context ...
    canvas = document.getElementById("canvas");
    
    if(canvas != null) {
	if(!(context = canvas.getContext("2d"))) {
	    alert("Could not load canvas context.");
	}
    }	    
    
    // Main loop
    window.setInterval(function() {
	// Clear canvas ...
	context.clearRect(0, 0, 800, 600);
	context.fillStyle = "#ffffff";
	context.fillRect(0, 0, width, height);
	
	// Do code here...
	var squareSize = 250;
	
	context.fillStyle = "#ff2b2b";
	context.fillRect(width/2 - squareSize/2, height/2 - squareSize/2, squareSize, squareSize);
    }, 40);
}
