<!-- This program draws a triangle -->

<html>

<head>

<!-- script files for webgl set up and math operations -->
<script type="text/javascript" src="webgl-utils.js"></script>
<script type="text/javascript" src="init-shaders.js"></script>
<script type="text/javascript" src="math.js"></script>

<!-- vertex shader -->
<script id="vertex-shader" type="x-shader/x-vertex">
attribute vec4 aPosition;       //vertex coordinate
void main()
{
    gl_Position = aPosition;    //pass vertex coordinate to gl_Position
}
</script>

<!-- fragment shader -->
<script id="fragment-shader" type="x-shader/x-fragment">
precision mediump float;                     //medium float precision
void main()
{
    gl_FragColor = vec4(0.0, 0.7, 0.0, 1.0); //fragment color is red
}
</script>

<script>
//main drawing function
function main()
{
    var vertices =        //vertices of triangle
    [
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.0)
    ];

    //set up webgl
    var canvas = document.getElementById("gl-canvas");
    var gl = WebGLUtils.setupWebGL(canvas);
    
    //set up shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //create vertex buffer and bind it
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    //connect vertex bufffer to attribute variable aPosition
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //buffer vertices into vertex buffer    
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    //canvas color is black, clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //set view port to canvas
    gl.viewport(0, 0, canvas.width, canvas.height);
	
	var points = 100;
	var theta = 2*Math.PI/points;
	var vertices =[];
	
	for  (var i = 0; i < points; i++)
	{
		var x = 0.5*Math.cos(i*theta);
		var y = 0.5*Math.sin(i*theta);
		vertices.push(vec2(x,y));
	}

    //draw triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
</script>

</head>

<!-- draw scene -->
<body onload="main()">

<!-- canvas for drawing scene -->
<canvas id="gl-canvas" width="500" height="500"></canvas>

</body>

</html>