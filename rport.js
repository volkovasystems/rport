/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "rport",
			"path": "rport/rport.js",
			"file": "rport.js",
			"module": "rport",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/rport.git",
			"test": "rport-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		List open port.
	@end-module-documentation

	@include:
		{
			"comex": "comex"
		}
	@end-include
*/

const comex = require( "comex" );
const zelf = require( "zelf" );

const rport = function rport( synchronous, option ){
	/*;
		@meta-configuration:
			{
				"synchronous": "boolean",
				"option": "object"
			}
		@end-meta-configuration
	*/

	return comex( "netstat -ntl" )
		.context( zelf( this ) )
		.pipe( "grep LISTEN" )
		.pipe( "tr -s ' '" )
		.pipe( "cut -d ' ' -f 4" )
		.pipe( "cut -d ':' -f 2" )
		.pipe( "xargs echo -n" )
		.format( ( port ) => {
			return port.split( /\s+/g ).map( ( port ) => parseInt( port ) ).sort( );
		} )
		.execute( synchronous, option );
};

module.exports = rport;
