// Timer class for proper milliseconds timing.
GameTimer = function()
{
    this.firstMillis = 0;
    this.averageDuration = 0;
    this.duration = 0
    
    // Resets and starts the timer.
    this.start = function() {
	var date = new Date();
	
	this.firstMillis = date.getTime();
	this.duration = 0;
    }
    
    // Ends the timer, setting the duration and averaging it with the last durations.
    this.end = function() {
	var date = new Date();
	
	currentMillis = date.getTime();
	this.duration = this.firstMillis - currentMillis;
    }
    
    // Returns the desired framedelay for the next frame based on the framerate.
    this.getDelayToNextFrame = function(desiredFramerate) {
	return 1/desiredFramerate - this.lastDuration;
    }
}
