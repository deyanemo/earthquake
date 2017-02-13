var mapimg;
var clat = 0;
var clon = 0;
var zoom = 1;
// 33.5138° N, 36.2765° E
// The lat is the North
var lat = 33.5138;
// The lon is the East 
var lon = 36.2765;


var earthquakes;
function preload() {
	mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiZGV5YW5lbW8iLCJhIjoiY2l6NGQ5Y2xqMDVwazJxb2E5MHB0bGhsOCJ9.yDteLkX_pX_oFP3SrrIHdQ');
	//earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv');
	earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
	lon = radians(lon);
	var a = (256 / PI) * pow(2,zoom);
	var b = lon + PI;
	return a * b ;
}

function mercY(lat) {
	lat = radians(lat);
	var a = (256 / PI) * pow(2,zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c ;
}
function setup() {
	createCanvas(1024,512);
	imageMode(CENTER);
	translate(width /2, height /2);
	image(mapimg,0,0);
	var cx = mercX(clon);
	var cy = mercY(clat);

	for( i=0; i< earthquakes.length; i++) {
		var data = earthquakes[i].split(/,/);
		// console.log(data);
		var lat = data[1];
		var lon = data[2];
		var mag = data[4];
		var x = mercX(lon) -cx;
		mag = pow(10, mag);
		mag = sqrt(mag);
		var magmax = sqrt(pow(10,10));
		var d = map(mag , 0, magmax, 0,60);
		stroke(255,0,255);

		var y = mercY(lat) - cy;
		fill(255,0,255,200);
		ellipse(x,y,d,d);
	}

	
}
