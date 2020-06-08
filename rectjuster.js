/*

	Rectjuster
	============================================================================================
	
	Rectjuste is a tool for scaling rectangles with a given aspect ratio, minimum width, 
	and / or height to fit a larger rectangle with a given width and height. It also takes
	into account the width of the padding on the bottom and right sides of the rectangles.

	The result of the adjustment process includes the width and height of the scaled rectangles
	and the number of rows and columns according to which the rectangles are to be arranged 
	inside a larger rectangle. The result of the calculation also includes the actual number of 
	rectangles that fit inside the larger rectangle with the given minimum width and / or height.


	Initialization
	--------------------------------------------------------------------------------------------
	new Rectjuster(params)

		params  object

			aspectRatio  number
				The aspect ratio of the rectangles. Default is 4/3.

			minHeight 	number
				Minimum height of the rectangle.

			minWidth 	number
				Minimum width of the rectangle.

			padding  number
				Width of the right and the height of the bottom padding for the each rectangle.


	Methods
	--------------------------------------------------------------------------------------------

	adjust( params ) -> result

		params  object

			height  number
				The height of the area in witch rectangles are scaled

			rectangleCount  number
				The number of rectangles to be fitted to the area.

			width  number
				The width of the area in witch rectangles are scaled

		Returns an object value.
			{
				width: number,
				height: number,
				columns: number,
				rows: number,
				rectangles: number
			}

			columns
				The number of columns in area.

			height
				Height (without the padding) of the rectangles that fit the area.

			rectangles
				The actual number of the rectangles that fit the area in their minimum size.

			rows
				The number of row in area.

			width
				Width (without the padding) of the rectangles that fit the area.

*/
(() => {

	class Rectjuster {
		constructor( params = {}) {
			this.aspectRatio = params.aspectRatio||4/3;
			this.padding = params.padding||0;
			this.minWidth = params.minWidth||1;
			this.minHeight = params.minHeight||1;
		}

		adjust( params = {} )  {
			params.rectangleCount = params.rectangleCount||1;
			params.width = params.width||0;
			params.height = params.height||0;
			let result = this._adjust( params );
			if (result.width == 0) {
				result = this._calcFittingRectangles( params );
			}
			return result;
		}

		_adjust( params )  {
			const result = { width: 0, height: 0, rows: 0, columns: 0, rectangles: 0 };
			let width, height, columns, rowHeight;
			let availWidth, availHeight;
			let rows = 0; 
			while (rows < params.rectangleCount) {
				columns = Math.ceil( params.rectangleCount / ++rows );
				availHeight = params.height - ((rows)*this.padding);
				availWidth = params.width - ((columns)*this.padding);
				if (availHeight > 0 && availWidth > 0) {
					rowHeight = rows > 1 ? Math.floor( availHeight / rows ) : params.height;
					width = Math.max( 0, columns ? Math.floor( availWidth / columns ) : 0 );
					height = Math.max( 0, Math.round( width / this.aspectRatio ));
					if (height > rowHeight) {
						height = rowHeight;
						width = Math.round( height * this.aspectRatio );
						columns = Math.floor( params.width / (width + this.padding));
					}
					if (width > result.width) {
						if (!this.minWidth || width >= this.minWidth) {
							if (!this.minHeight || height >= this.minHeight) {
								result.width = width;
								result.height = height;
								result.rows = rows;
								result.columns = columns;
							}
						}
					}
				}
			}
			result.width && (result.rectangles = params.rectangleCount);
			return result;
		}

		_calcFittingRectangles( params ) {
			let result = { width: 0, height: 0, rows: 0, columns: 0, rectangles: 0 };
			const p = Object.assign( {}, params );
			while (--p.rectangleCount && !result.width) {
				result = this._adjust(p);
			}
			return result;
		}

	}

	if (typeof require == "function" && typeof process == "object" && typeof process.exit == "function") {
		module.exports = Rectjuster;
	}
	else {
		try {
			SITE.set( "Rectjuster", Rectjuster );
		}
		catch (error) {
			window.Rectjuster = Rectjuster;
		}
	}

})();