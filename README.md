#Rectjuster
	
Rectjuste is a tool for scaling rectangles with a given aspect ratio, minimum width, 
and / or height to fit a larger rectangle with a given width and height. It also takes
into account the width of the padding on the bottom and right sides of the rectangles.

The result of the adjustment process includes the width and height of the scaled rectangles
and the number of rows and columns according to which the rectangles are to be arranged 
inside a larger rectangle. The result of the calculation also includes the actual number of 
rectangles that fit inside the larger rectangle with the given minimum width and / or height.


##Initialization

### node.js

const Rectjuster = require("rectjuster");
const rectjuster = new Rectjuster(options)


### Browser

const rectjuster = new new Rectjuster(options)


### Initalization options

- aspectRatio  number
The aspect ratio of the rectangles. Default is 4/3.

- minHeight 	number
	Minimum height of the rectangle.

- minWidth 	number
	Minimum width of the rectangle.

- padding  number
	Width of the right and the height of the bottom padding for the each rectangle.


## adjust method

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



