// GAME ENGINE FUNCTION OF GREATNESS
Game = function()
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
	// DO GAME STUFF
	
	this.performanceTimer.end();
	
	// BORING MANAGEMENT STUFF
	window.setTimeout(this.run, this.performanceTimer.getDelayToNextFrame(this.framerate));
    }
}
