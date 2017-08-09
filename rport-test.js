
const assert = require( "assert" );
const rport = require( "./rport.js" );

let port = rport( true );

port.forEach( ( port ) => {
		assert.equal( typeof port, "number", "should be a port number" );
	} );

assert.equal( port.length > 0, true, "should not be empty" );

console.log( "ok" );
