// Timer class for proper milliseconds timing.
GameTimer = function()
{
	this.firstMillis = 0;
	this.averageDuration = 0;
	this.duration = 0;
	
	// Resets and starts the timer.
	this.start = function() {
		var date = new Date();
                
		this.firstMillis = date.getTime();
		this.duration = 0;
	};
	
	// Ends the timer, setting the duration and averaging it with the last durations.
	this.end = function() {
		var date = new Date();
		
		currentMillis = date.getTime();
		this.duration = currentMillis - this.firstMillis;
		
		// A temporary implementation of averaging duration, really it calculates some mix between latest duration and average
		if(this.averageDuration == 0)
		{
			this.averageDuration = this.duration;
		}
		else
		{
			this.averageDuration = (this.averageDuration + this.duration) / 2.0;
		};
	};
	
	// Returns the desired framedelay for the next frame based on the framerate.
	this.getDelayToNextFrame = function(desiredFramerate) {
		return ((1.0/desiredFramerate*1000) - this.duration);
	};
};
