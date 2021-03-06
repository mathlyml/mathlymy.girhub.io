var canvas;
var context ;
var y_max;
var y_min;
var sections;
var xScale;
var yScale;
var gy_step;
var gx_step;
var trans = false;
		// Values for the Data Plot, they can also be obtained from a external file
var x_points =  [-1,4];
var y_points =  [-2,5];

function initCanvas(xArr, x_step, yArr, y_step, append) {
		// set these values for your data 
	x_min = xArr[0];
	x_max = xArr[1];

	y_min = yArr[0];
	y_max = yArr[1];
	gy_step = y_step;
	gx_step = x_step;
	var margin = 10;

	var columnSize = 50;
	var rowSize = 50;
		
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.fillStyle = "#0099ff"
	context.font = "10pt Verdana"
	
	yScale = (canvas.height - columnSize - margin) / (y_max - y_min);
	xScale = (canvas.width - rowSize) / (x_max - x_min);
	
	context.strokeStyle="#cccccc"; // color of grid lines
	context.beginPath();
		// print Parameters on X axis, and grid lines on the graph
	var count =  0;
	for (scale=x_min;scale<=x_max;scale = scale + x_step) {
		var x = rowSize + (xScale * count * x_step); 
		context.fillText(setAppend(scale,append[0]), x-5, columnSize - margin);
		context.moveTo(x, columnSize);
		context.lineTo(x, canvas.height - margin);
        count++
	}
		// print row header and draw horizontal grid lines
	var count =  0;
	for (scale=y_max;scale>=y_min;scale = scale - gy_step) {
		var y = columnSize + (yScale * count * gy_step) + 5; 
		//var y = columnSize + (yScale * 0 * y_step) + 5; 
		context.fillText(setAppend(scale,append[1]), margin,y + margin);

		context.moveTo(rowSize,y)
		context.lineTo(canvas.width,y)
		count++;
	}
	context.stroke();
	
	trans = false;
}

function plotData(x_points, y_points, color) {
	if(arguments.length==2)
	{
		context.strokeStyle="#9933FF";
	} else
	{
		context.strokeStyle=color;
	}
	if(!trans)
	{
		context.translate(50,canvas.height + y_min * yScale);
		context.scale(1,-1 * yScale);
		trans = true;
	}
	
	context.beginPath();
	for (i=0;i<y_points.length;i++) {
		context.lineTo((x_points[i]+5) * xScale, y_points[i]+.1);
	}
    context.lineWidth=.1;
	context.stroke();
}

function addText(p, text) {
	//context.fillStyle = "#0099ff"
	//context.font = "10pt Verdana"
	yScale = (canvas.height - 50 - 10) / (y_max - y_min);
	xScale = (canvas.width - 50) / (x_max - x_min);

	var x = 50 + (xScale * (p[0]-x_min) * gx_step); 
	var y = 50 + (yScale * (-p[1]-y_min) * gy_step) + 5; 
	context.fillText(text, x-5, y+10);
}

function addCircle(p, r) {
	var x = 50 + (xScale * (p[0]-x_min) * gx_step); 
	var y = 50 + (yScale * (-p[1]-y_min) * gy_step) + 5; 
	context.beginPath();
	context.arc(x,y,r,0,2*Math.PI);
	context.stroke();
}

function setAppend(num, append)
{
    if(num==0) return 0;
    else if(num==1 && append!="") return append;
    else if(num==-1 && append!="") return '-'+append;
    else return ""+num+append;
}

// pi = \u{03C0}
