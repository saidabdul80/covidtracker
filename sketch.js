/*
function setup(){
    
   
}

function positionChanged(position){
    x.innerHTML ="lat: " + position.latitude;
    print("long: " + position.longitude);
}*/


var danger =[
//correct
	{"lat": 9.616966, "long":6.533678},
	{"lat": 9.216966, "long":7.533678},
	{"lat": 9.616966, "long":6.033678}
	
]
console.log(danger);
var fence;
var distance;
	
function setup(){

	//watchPosition(positionChanged);

	//optional options object for geoFenceCircle
	//fence = new geoFenceCircle(44.979779, -93.325499, .05, insideTheFence, 'mi', fenceOptions)
    // fenceOptions = {
    //   enableHighAccuracy: false,
    //   timeout: 5000,
    //   maximumAge: 0
    // };

    fence = new geoFenceCircle(9.616966, 6.533678, 40, insideTheFence, outsideTheFence, 'mi');
    /*
    for (var i = 0; i < danger.length; i++) {
    	danger[i]
    }
    //calculating distance

	distance = calcGeoDistance( 9.081999, 8.675277, 9.616966, 6.533678,  'mi')
    */
}


function insideTheFence(position){
	var y = document.getElementById("demo2");
	var x = document.getElementById("demo");
    print("INlat: " + position.latitude);
    print("INlong: " + position.longitude);
    x.innerHTML = "<div style='width:100px; height:100px; border-radius:50%;background:red;'></div>";
    if (fence.distance<1){
		y.innerHTML = "you are approximately <b>0</b> meters away from limawa";
    }else{
		y.innerHTML = "you are approximately <b>"+ ceil(fence.distance)+"m</b> meters away from limawa";
    }
}

function outsideTheFence(position){
	var y = document.getElementById("demo2");
	var x = document.getElementById("demo");
    print("OUTlat: " + position.latitude);
    print("OUTlong: " + position.longitude);
    x.innerHTML = "<div style='width:100px; height:100px; border-radius:50%;background:green;'></div><p>You are outside danger</p>";
	y.innerHTML = "you are approximately <b>"+ ceil(fence.distance)+"m</b> meters away from limawa";
    
    
}