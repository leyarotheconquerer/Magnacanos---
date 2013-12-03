// GAME ENGINE FUNCTION OF GREATNESS
Engine = function()
{
    var framerate = 40;
    var performanceTimer = new GameTimer();
    
    this.init = function()
    {
	// START THE ENGINE UP
    }
    
    this.run = function()
    {
	// RUN ALL THE THINGS
	this.performanceTimer.start();
	
	// UPDATE
	// Do engine specific stuff
	// Setup for game content
	// Call game content
	// Desetup for game content
	
	// DRAW
	// Initialize drawing list
	// Draw stuff from list
	
	this.performanceTimer.end();
	
	// BORING MANAGEMENT STUFF
	window.setTimeout(this.run, this.performanceTimer.getDelayToNextFrame(this.framerate));
    }
}
