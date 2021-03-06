// Timer class for proper milliseconds timing.
GameTimer = function()
{
    var that = this; // Create a handle to the instance of this entity.

    this.firstMillis = 0;
    this.averageDuration = 0;
    this.duration = 0;
    
    // Resets and starts the timer.
    this.start = function() {
	var date = new Date();
        
	that.firstMillis = date.getTime();
	that.duration = 0;
    };
    
    // Ends the timer, setting the duration and averaging it with the last durations.
    this.end = function() {
	var date = new Date();
	
	currentMillis = date.getTime();
	that.duration = currentMillis - that.firstMillis;
	
	// A temporary implementation of averaging duration, really it calculates some mix between latest duration and average
	if(that.averageDuration == 0)
	{
	    that.averageDuration = that.duration;
	}
	else
	{
	    that.averageDuration = (that.averageDuration + that.duration) / 2.0;
	};
    };
    
    // Returns the desired framedelay for the next frame based on the framerate.
    this.getDelayToNextFrame = function(desiredFramerate) {
	var calculatedTime = ((1.0/desiredFramerate*1000) - that.duration);
	
	return (calculatedTime > 0 ? calculatedTime : 1);
    };
};
