// Insert hooking of application into this file, not the game stuff itself...
window.onload = function()
{
	// Declare variables ...
	var timer = new GameTimer();
	
	var engine = new Engine();
	
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
	
	engine.init();
	
	// Main loop
	window.setInterval(function() {
		timer.start();
		
		// Run all game simulation code...
		engine.run();
		
		// Clear canvas ...
		context.clearRect(0, 0, 800, 600);
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, width, height);
		
		// Run all game drawing code...
		engine.draw(context);
		
		timer.end();
		//console.log(timer.getDelayToNextFrame(20));
    }, 40);
}
