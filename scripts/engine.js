// GAME ENGINE FUNCTION OF GREATNESS
Engine = function()
{
	this.framerate = 40;
	this.performanceTimer = new GameTimer();
	
	this.gameUpdate = null;
	this.drawList = null; // Not real, but for placement. // Temporarily hijacked for testing purposes
	
	this.init = function()
	{
		// START THE ENGINE UP
	}
	
	var truthness = true;
	
	this.run = function()
	{
		// RUN ALL THE THINGS
		this.performanceTimer.start();
		
		// UPDATE
		// Do engine specific stuff
		// Setup for game content
		// Call game content
		// Desetup for game content
		
		this.performanceTimer.end();
		
		// BORING MANAGEMENT STUFF
		window.setTimeout(this.run, this.performanceTimer.getDelayToNextFrame(this.framerate));
	}
	
	// Hazen's placeholder draw function until a better draw routine is created
	this.draw = function(context)
	{
		// DRAW
		// Initialize drawing list
		//foreach(thing in this.drawList) {
			// Draw the thing.
		//}
		// Draw stuff from list
		var width = 800;
		var height = 600;
		
		var squareSize = 250;
		
		context.fillStyle = "#ff2b2b";
		context.fillRect(width/2 - squareSize/2, height/2 - squareSize/2, squareSize, squareSize);
		
		// Proof that draw is called every frame
		context.fillStyle = "#333333";
		context.fillText(this.performanceTimer.firstMillis, width/2, height/2);
	}
}
