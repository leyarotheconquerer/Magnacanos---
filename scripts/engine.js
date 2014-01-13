// GAME ENGINE FUNCTION OF GREATNESS
Engine = function()
{
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
                this.context = context;
		this.physics.init();
	};
        
        this.setContext = function(context) { this.context = context; };
	
	this.run = function()
	{
                // Lock this run cycle, if not already locked.
                if(!this.runLock) {
                        this.runLock = true;
                } else { // If locked, terminate.
                        alert("Run collision detected.");
                        
                        return;
                }
                
		// RUN ALL THE THINGS
		this.performanceTimer.start();
		
		// UPDATE
		// Do engine specific stuff
		// Setup for game content
		// Call game content
		// Desetup for game content
                
		this.physics.run(1.0 / this.framerate);
		
                // ADD PONIES!!
                if(this.ponies.length < 250) {
                var tempPony = new Pony();
                    tempPony.create(this.physics.world, this.physics.ptom(Math.floor(Math.random()*800*0.8 + 800*0.1)), this.physics.ptom(Math.floor(Math.random()*600*0.8 + 600*0.1)), 0);
                
                    this.ponies.push(tempPony);
                }
                
                // DRAW IT ALL
                this.draw(this.context)
                
                // BORING MANAGEMENT STUFF
		this.performanceTimer.end();
                
		// End this run cycle.
                this.runLock = false;
                
                // Setup next run cycle ...
		window.setTimeout(this.run(), this.performanceTimer.getDelayToNextFrame(this.framerate));
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
		context.fillText(this.performanceTimer.firstMillis, 30, 30);
		
		this.physics.drawPhysicsBodies(context);
	        
                // Draw the ponies
                for(var i = 0; i < this.ponies.length; ++i) {
                        this.ponies[i].draw(context, this.physics);
                }
	};
};
