// GAME ENGINE FUNCTION OF GREATNESS
Engine = function()
{
    var that = this; // Create a handle to the instance of this entity.
    
    this.framerate = 40;
    this.performanceTimer = new GameTimer();
    
    this.gameUpdate = null;
    this.drawList = null; // Not real, but for placement. // Temporarily hijacked for testing purposes
    
    this.runLock = false;
    this.context = null;
    
    this.physics = new PhysicsInterface();
    
    this.ponies = new Array();
    
    this.init = function(context)
    {
	// START THE ENGINE UP
        that.context = context;
	that.physics.init();
    };
    
    this.setContext = function(context) { that.context = context; };
    
    this.run = function()
    {
	// Lock this run cycle, if not already locked.
        if(!that.runLock) {
            that.runLock = true;
        } else { // If locked, terminate.
            console.log("Run collision detected.");
            
            return;
        }
        
	// RUN ALL THE THINGS
	that.performanceTimer.start();
	
	// UPDATE
	// Do engine specific stuff
	// Setup for game content
	// Call game content
	// Desetup for game content
        
	that.physics.run(1.0 / that.framerate);
	
	// ADD PONIES!!
	if(that.ponies.length < 250) {
	    var tempPony = new Pony();
	    tempPony.create(that.physics.world, that.physics.ptom(Math.floor(Math.random()*800*0.8 + 800*0.1)), that.physics.ptom(Math.floor(Math.random()*600*0.8 + 600*0.1)), 0);
	    
	    that.ponies.push(tempPony);
	}
	
	// DRAW IT ALL
	that.draw(that.context);
	
	// BORING MANAGEMENT STUFF
	that.performanceTimer.end();
        
	// End that run cycle.
        that.runLock = false;
	
	console.log(that.performanceTimer.getDelayToNextFrame(that.framerate));
	
        // Setup next run cycle ...
	// window.setTimeout(that.run(), that.performanceTimer.getDelayToNextFrame(that.framerate));
    };
    
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
	
        // Clear canvas ...
	context.clearRect(0, 0, 800, 600);
	context.fillStyle = "#ffffff";
	context.fillRect(0, 0, width, height);
        
	// Proof that draw is called every frame
	context.fillStyle = "#333333";
	context.fillText(that.performanceTimer.firstMillis, 30, 30);
	
	that.physics.drawPhysicsBodies(context);
	
        // Draw the ponies
        for(var i = 0; i < that.ponies.length; ++i) {
            that.ponies[i].draw(context, that.physics);
        }
    };
};
