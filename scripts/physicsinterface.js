// The physics interface - aggregates the interface between the engine and the box2d physics engine
PhysicsInterface = function()
{
	this.world = null;
	
	// Dimensions of the physics world in meters
	this.worldDimensions = new b2Vec2(8, 6);
	
	// Dimensions of the screen in meters
	this.screenmDimensions = new b2Vec2(8,6);
	
	// Dimensions of the screen in pixels
	this.screenpDimensions = new b2Vec2(800, 600);
	
	// The gravity vector for the physics world
	this.gravity = new b2Vec2(0, 8);
	
	// Initializes the physics interface
	this.init = function()
	{
		this.world = setupWorld(this.worldDimensions, this.gravity);
	}
	
	// Converts from pixels to meters
	this.ptom = function(val, direction)
	{
		// Default x dimension conversion
		direction = direction || "x";
		
		// If has an x and y coordinate, treat it as a vector
		if(val.x != null && val.y != null)
		{
			var x = (val.x * screenmDimensions.x) / screenpDimensions.x;
			var y = (val.y * screenmDimensions.y) / screenpDimensions.y;
			return new b2Vec2(x, y);
		}
		// If a single value, treat it as a single value
		else if(val.constructor = Number)
		{
			if(direction == "y")
			{
				return (val * screenmDimensions.y) / screenpDimensions.y;
			}
			else
			{
				return (val * screenmDimensions.x) / screenpDimensions.x;
			}
		}
	}
	
	// Converts from meters to pixels
	this.mtop = function()
	{
		// Default x dimension conversion
		direction = direction || "x";
		
		// If has an x and y coordinate, treat it as a vector
		if(val.x != null && val.y != null)
		{
			var x = (val.x * screenpDimensions.x) / screenmDimensions.x;
			var y = (val.y * screenpDimensions.y) / screenmDimensions.y;
			return new b2Vec2(x, y);
		}
		// If a single value, treat it as a single valuee
		else if(val.constructor = Number)
		{
			if(direction == "y")
			{
				return (val * screenpDimensions.y) / screenmDimensions.y;
			}
			else
			{
				return (val * screenpDimensions.x) / screenmDimensions.x;
			}
		}
	}
	
	// Initializes a new physics world
	function setupWorld(dimensions, gravity)
	{
		// Arbitrary world setup constants (things I don't want to pass, but would like a variable for)
		var thickness = 0.1;
		
		// Define world extents
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(0,0);
		worldAABB.maxVertex = dimensions;
		
		// Create the world object
		var world = new b2World(worldAABB, gravity, true);
		
		// Bound the world with boxes for padding
		setupWall(world, 0, dimensions.y - thickness, dimensions.x, thickness); // Bottom
		setupWall(world, 0, 0, thickness, dimensions.y);                        // Left
		setupWall(world, 0, 0, dimensions.x, thickness);                        // Top
		setupWall(world, dimensions.x - thickness, 0, thickness, dimensions.y); // Right
	}

	// Sets up a rectangle wall in the world
	function setupWall(world, x, y, width, height)
	{
		// Create the fixture definition
		var boxDef = new b2BoxDef();
		boxDef.extents.Set(width, height);
		boxDef.restitution = 0.2;
		
		// Create the body definition
		var bodyDef = new b2BodyDef();
		bodyDef.AddShape(boxDef);
		bodyDef.position.Set(x,y);
		
		// Add the body to the world
		return world.CreateBody(bodyDef);
	}
}