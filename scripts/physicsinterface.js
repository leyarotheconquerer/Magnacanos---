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
	
	var box;
	
	// Initializes the physics interface
	this.init = function()
	{
		this.world = setupWorld(this.worldDimensions, this.gravity);
		
		box = addBox(this.world, 3, 3, 1, 1);
	}
	
	this.run = function()
	{
		this.world.Step();
	}
	
	// Draws the all physics bodies
	this.drawPhysicsBodies = function(context)
	{
		for(var body = this.world.m_bodyList; body; body = body.m_next)
		{
			for(var fixture = body.GetShapeList(); fixture != null; fixture = fixture.GetNext())
			{
				this.drawFixture(fixture, context);
			}
		}
	}
	
	// Draws a fixture to the given context
	this.drawFixture = function(fixture, context)
	{
		context.beginPath();
		
		switch(fixture.m_type)
		{
		case b2Shape.e_circleShape:
			var circle = fixture;
			
			var position = this.mtop(circle.m_position);
			var radius = this.mtop(circle.m_radius);
			
			context.arc(position.x, position.y, radius, 0, 2*Math.PI);
			
			break;
		case b2Shape.e_polyShape:
			var polygon = fixture;
			
			var initVertex = this.mtop(b2Math.AddVV(polygon.m_position, b2Math.b2MulMV(polygon.m_R, polygon.m_vertices[0])));
			context.moveTo(initVertex.x, initVertex.y);
			
			for(var i = 0; i < polygon.m_vertexCount; i++)
			{
				var vertex = this.mtop(b2Math.AddVV(polygon.m_position, b2Math.b2MulMV(polygon.m_R, polygon.m_vertices[i])));
				context.lineTo(vertex.x, vertex.y);
			}
			
			context.lineTo(initVertex.x, initVertex.y);
			
			break;
		}
		
		context.stroke();
	}
	
	// Converts from pixels to meters
	this.ptom = function(val, direction)
	{
		// Default x dimension conversion
		direction = direction || "x";
		
		// If has an x and y coordinate, treat it as a vector
		if(val.x != null && val.y != null)
		{
			var x = (val.x * this.screenmDimensions.x) / this.screenpDimensions.x;
			var y = (val.y * this.screenmDimensions.y) / this.screenpDimensions.y;
			return new b2Vec2(x, y);
		}
		// If a single value, treat it as a single value
		else if(val.constructor = Number)
		{
			if(direction == "y")
			{
				return (val * this.screenmDimensions.y) / this.screenpDimensions.y;
			}
			else
			{
				return (val * this.screenmDimensions.x) / this.screenpDimensions.x;
			}
		}
	}
	
	// Converts from meters to pixels
	this.mtop = function(val, direction)
	{
		// Default x dimension conversion
		direction = direction || "x";
		
		// If has an x and y coordinate, treat it as a vector
		if(val.x != null && val.y != null)
		{
			var x = (val.x * this.screenpDimensions.x) / this.screenmDimensions.x;
			var y = (val.y * this.screenpDimensions.y) / this.screenmDimensions.y;
			return new b2Vec2(x, y);
		}
		// If a single value, treat it as a single valuee
		else if(val.constructor = Number)
		{
			if(direction == "y")
			{
				return (val * this.screenpDimensions.y) / this.screenmDimensions.y;
			}
			else
			{
				return (val * this.screenpDimensions.x) / this.screenmDimensions.x;
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
		
		return world;
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
	
	// Adds a dynamic box to the world
	function addBox(world, x, y, width, height)
	{
		// Create the fixture definition
		var boxDef = new b2BoxDef();
		boxDef.extents.Set(width, height);
		boxDef.density = 1.0;
		
		// Create the body definition
		var bodyDef = new b2BodyDef();
		bodyDef.AddShape(boxDef);
		bodyDef.position.Set(x,y);
		
		// Add the body to the world
		return world.CreateBody(bodyDef);
	}
}