/*
----------------------------------------------------------------------------------------------------
 Rectjuster

 (c) Olli Kekäläinen, Rajahyöty Oy



 20200608
----------------------------------------------------------------------------------------------------
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