'use strict'

export function nextChunk( stream: NodeJS.ReadableStream )
: Promise< Buffer | string >
{
	if ( !stream )
		return Promise.reject( new Error( "Not a stream" ) );

	const anyStream = < any >stream;
	if (
		typeof anyStream._readableState === 'object'
		&&
		anyStream._readableState.buffer
		&&
		anyStream._readableState.buffer.length === 0
		&&
		anyStream._readableState.ended
	)
		return Promise.resolve( null );

	return new Promise< Buffer | string >( function( resolve, reject )
	{
		let cleanup: ( ) => void = null;

		function onReadable( sync = false )
		{
			const chunk = stream.read( );
			if ( sync === true && !chunk )
				return false;
			cleanup && cleanup( );
			resolve( chunk );
			return true;
		}

		function onError( err )
		{
			cleanup && cleanup( );
			reject( err );
		}

		function onClose( )
		{
			cleanup && cleanup( );
			resolve( null );
		}

		if ( onReadable( true ) )
			return;

		cleanup = function( )
		{
			stream.removeListener( 'readable', onReadable );
			stream.removeListener( 'error', onError );
			stream.removeListener( 'close', onClose );
		}

		stream.addListener( 'readable', onReadable );
		stream.addListener( 'error', onError );
		stream.addListener( 'close', onClose );
	} );
}
