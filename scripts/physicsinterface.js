// The physics interface - aggregates the interface between the engine and the box2d physics engine
PhysicsInterface = function()
{
	this.world = null;
	
	// Dimensions of the physics world in meters
	this.worldDimensions = new b2Vec2(80, 60);
	
	// Dimensions of the screen in meters
	this.screenmDimensions = new b2Vec2(80,60);
	
	// Dimensions of the screen in pixels
	this.screenpDimensions = new b2Vec2(800.0, 600.0);
	
	// The gravity vector for the physics world
	this.gravity = new b2Vec2(0, 8);
	
	var planet;
	
	// Initializes the physics interface
	this.init = function()
	{
		this.world = setupWorld(this.worldDimensions, this.gravity);
		
		addBox(this.world, 30, 30, 1, 1);
		
		addBox(this.world, 30.5, 25, 1, 1);
		
		addCircle(this.world, 31, 20, 1);
		
		addStaticCircle(this.world, 30, 35, 2);
		
		addStaticBox(this.world, 35, 40, 2.5, 2.5);
		
		planet = new Planet();
		
		planet.create(this.world, 50, 30, 5);
	}
	
	// Runs the physcs simulation for a given time step
	this.run = function(step)
	{
		for(var body = this.world.m_bodyList; body; body = body.m_next)
		{
			if(body.IsSleeping() == false && body.GetMass() > 0)
			{
				var forceVec = planet.calcGravForce(body);
				body.ApplyForce(forceVec, body.m_position);
			}
		}
		this.world.Step(step, 1);
	}
	
	// Draws the all physics bodies
	this.drawPhysicsBodies = function(context)
	{
		for(var body = this.world.m_bodyList; body; body = body.m_next)
		{
			if(body.GetMass() > 0)
			{
				context.strokeStyle = "#ff0000";
				var forceVec = planet.calcGravForce(body);
				this.drawForce(body.m_position, forceVec, context);
				context.strokeStyle = "#333333";
			}
			
			for(var fixture = body.GetShapeList(); fixture != null; fixture = fixture.GetNext())
			{
				if(body.IsSleeping() == true)
				{
					context.strokeStyle = "#0000ff";
				}
				this.drawFixture(fixture, context);
				context.strokeStyle = "#333333";
			}
		}
	}
	
	// Draws a force vector
	this.drawForce = function(position, forceVec, context)
	{
		position = this.mtop(position);
		forceVec = this.mtop(forceVec);
		var finalVec = b2Math.AddVV(position, forceVec);
		
		context.beginPath();
		
		context.moveTo(position.x, position.y);
		context.lineTo(finalVec.x, finalVec.y);
		
		context.stroke();
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
		var thickness = 1;
		
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
		boxDef.friction = 0.1;
		
		// Add to the world
		return addSingleFixtureBody(world, boxDef, x, y);
	}
	
	// Adds a dynamic circle to the world
	function addCircle(world, x, y, radius)
	{
		// Create the fixture definition
		var circleDef = new b2CircleDef();
		circleDef.radius = radius;
		circleDef.density = 1.0;
		circleDef.friction = 0.1;
		
		// Add to the world
		return addSingleFixtureBody(world, circleDef, x, y);
	}
	
	// Adds a static box to the world
	function addStaticBox(world, x, y, width, height)
	{
		// Create the fixture definition
		var boxDef = new b2BoxDef();
		boxDef.extents.Set(width, height);
		boxDef.density = 0.0;
		boxDef.friction = 0.1;
		
		// Add to the world
		return addSingleFixtureBody(world, boxDef, x, y);
	}
	
	// Adds a static circle to the world
	function addStaticCircle(world, x, y, radius)
	{
		// Create the fixture definition
		var circleDef = new b2CircleDef();
		circleDef.radius = radius;
		circleDef.density = 0.0;
		circleDef.friction = 0.1;
		
		// Add to the world
		return addSingleFixtureBody(world, circleDef, x, y);
	}
	
	// Adds a body that has only a single fixture
	function addSingleFixtureBody(world, fixtureDef, x, y)
	{
		// Create the body definition
		var bodyDef = new b2BodyDef();
		bodyDef.AddShape(fixtureDef);
		bodyDef.position.Set(x,y);
		
		// Add the body to the world
		return world.CreateBody(bodyDef);
	}
}