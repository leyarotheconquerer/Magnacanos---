// The planet object - simplifies gravity calculations
Planet = function()
{
	// The physics body of the planet
	this.physicsBody = null;
	
	// Gets the mass of the planet
	this.mass = 10;
	
	// Initializes the planet and adds it to the world
	this.create = function(world, x, y, radius)
	{
		// Create the fixture definition
		var circleDef = new b2CircleDef();
		circleDef.radius = radius;
		circleDef.density = 0.0;
		circleDef.friction = 0.1;
		
		// Create the body definition
		var bodyDef = new b2BodyDef();
		bodyDef.AddShape(circleDef);
		bodyDef.position.Set(x,y);
		
		this.physicsBody = world.CreateBody(bodyDef);
	}
	
	// Calculate gravity force due to this planet
	this.calcGravForce = function(otherBody)
	{
		// Just a note, but the math here is very inefficient for testing purposes
		// TODO: Clean it up.
		var otherMass = otherBody.GetMass();
		var otherPosition = otherBody.m_position;
		
		var thisMass = this.mass;
		var thisPosition = this.physicsBody.m_position;
		
		// Calculate the vector from the other body to the planet
		var positionDiff = b2Math.SubtractVV(otherPosition, thisPosition);
		
		// Calculate useful median values from the difference vector
		var distanceDiff = positionDiff.Normalize();
		
		// Calculate the gravity force
		var gravForce = (otherMass * thisMass) / (distanceDiff * distanceDiff);
		
		// Multiply the normal difference vector by the gravity force to find the gravity force vector
		var gravForceVector = b2Math.MulFV(gravForce * -100, positionDiff);
		
		return gravForceVector;
	}
}