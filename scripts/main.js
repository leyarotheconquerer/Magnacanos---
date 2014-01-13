// Insert hooking of application into this file, not the game stuff itself...
var engine;

window.onload = function()
{
	// Declare variables ...
	var timer = new GameTimer();
	
	engine = new Engine();
	
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
	
	engine.init(context);
	
        engine.run();
};
