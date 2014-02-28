// This is the Pony class. Yesssssssss.
FILEPATH = "./assets/images/"
PONYMAP = new Array("dashie", "aj", "pinkie", "rarity", "flutters", "twispar");
PONYSTATS = new Array(0, 0, 0, 0, 0, 0);

Pony = function()
{
    // VARIABLES --
    this.type = "T"; // TAPDRF
    this.x = 0;
    this.y = 0;
    
    this.mass = 1;
    
    this.image = new Image();
    
    // FUNCTIONS --
    // Create intializes the pony and adds it to the world.
    // Type specifies the type of pony to spawn,
    //   if type == 0, the pony is randomly picked.
    this.create = function(world, x, y, type)
    {
	// Determine random pony.
	if(type == 0) {
	    type = Math.floor(Math.random()*6 + 1);
	}
	
	// Set pony type.
	++PONYSTATS[type - 1];
	this.type = PONYMAP[type - 1];
	
	// Load the pony sprite.
	this.image.src = FILEPATH + this.type + ".png";
	
	// Create the fixture
	this.fixtureDef = new b2CircleDef();
	this.fixtureDef.radius = 1; // Arbitrary number, check bounding.
	this.fixtureDef.density = 1.0;
	this.fixtureDef.friction = 0.1;
	
	// Create the body for the pony
	this.bodyDef = new b2BodyDef();
	this.bodyDef.AddShape(this.fixtureDef);
	this.bodyDef.position.Set(x, y);
	
	this.physicsBody = world.CreateBody(this.bodyDef);
    }
    
    this.draw = function(context, fizzieface)
    {
	var body = this.physicsBody; // THERE CAN ONLY BE ONE
	var position = fizzieface.mtop(body.m_position);
	var direction = new b2Vec2(0, 0); // body.m_linearVelocity;
	var rotation;
	
	// Calculate direction.
	for(var planet = 0; planet < fizzieface.planets.length; ++planet) {
	    var forceVector = fizzieface.planets[planet].calcGravForce(body);
	    
	    direction = b2Math.AddVV(direction, forceVector);
	}
	
	direction.Normalize();	
	
	context.strokeStyle = "#00ff00";
	fizzieface.drawForce(body.m_position, direction, context);
	
	rotation = Math.acos(direction.x*-1 + direction.y*0);
	
	if(direction.y > 0) rotation = Math.PI + -1*(rotation - Math.PI);
	
	rotation += Math.PI/2;
	
	context.save();
	context.translate(position.x, position.y);
	context.rotate(rotation);
	context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
	context.restore();
    }
}
