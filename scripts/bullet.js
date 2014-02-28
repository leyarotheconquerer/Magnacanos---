Bullet = function()
{
    var that = this; // Fix JS scoping issues.
    
    // MEMBER VARIABLES --
    this.x = 0;
    this.y = 0;
    
    this.power = 0; // YOU HAVE NO POWER HERE.
    
    // MEMBER FUNCTIONS --
    // Create function intitializes the bullet, primarily
    //   for Box2D physics integration.
    this.create = function(world, x, y)
    {
	// Create the fixture.
	that.fixtureDef = new b2CircleDef();
	that.fixtureDef.radius = 1; // Arbitrary number, change later for better bullet effect.
	that.fixtureDef.density = 1.0;
	that.fixtureDef.friction = 0.1;
	
	// Create the BODY. THE BOOOOOOOOOOOODY.
	that.bodyDef = new b2BodyDef();
	that.bodyDef.AddShape(this.fixtureDef);
	that.bodyDef.position.Set(x, y);
	
	that.physicsBody = world.CreateBody(that.bodyDef);
    }
    
    // Draw function draws the bullet. Yep. Pretty much.
    this.draw = function(context, fizzieface) // Forgot what fizzieface was...oh well.
    {
	var position = fizzieface.mtop(that.physicsBody.m_position);
	
	// Draw the image...if I had one... T_T
	context.save();
	context.translate(position.x, position.y);
	context.rotate(0); // Rotation of this object. Fix later.
	context.beginPath();
	context.arc(0, 0, 10, 0, 2*Math.PI);
	context.stroke();
	context.restore();
    }
}
