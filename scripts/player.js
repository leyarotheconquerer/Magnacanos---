Player = function()
{
    var that = this; // Fixing Javascripts scoping issues for 'this' references. I am pretty sure this comment changes everytime I write it.
    
    // MEMBER VARIABLES --
    this.x = 0;
    this.y = 0;
    
    // FUNCTIONS --
    // WHO NEEDS FUNCTIONS SCREW FUNCTIONS BLARG
    // Player update function, because palyers do taht yeah.
    this.update = function()
    {
	// Update player?

	// NOTE: Player is not a physics object, so yeah. I guess he could be but that could be deadly.
	//         Let's jsut make him run around isntead.
	
	// Run around?
    }

    this.draw = function(context)
    {
	context.save();
	context.translate(that.x, that.y);
	context.rotate(that.rotation);
	context.drawImage("./assets/images/dashie.png"); // TEMP IMAGE
	context.restore();
}
