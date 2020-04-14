var danger =[
//correct
	{"lat": 9.616972, "long":6.533667, "name": "limawaA"}
	]

function distance(latitude1,longitude1,latitude2,longitude2,units) {
  var earthRadius = 6371; // Radius of the earth in km
  var dLat = deg2rad(latitude2-latitude1);  // deg2rad below
  var dLon = deg2rad(longitude2-longitude1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = earthRadius * c; 
  var miles = d / 1.609344; 

if ( units == 'km' ) {  
return d*1000; 
 } else {
return miles; 
}
}



 // Set global variable
    var watchID;

    function showPosition() {
        if(navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(successCallback);
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }

    function successCallback(position) {
        toggleWatchBtn.innerHTML = "Stop Watching";
        
        // Check position has been changed or not before doing anything
        if(prevLat != position.coords.latitude || prevLong != position.coords.longitude){
            
            // Set previous location
            var prevLat = position.coords.latitude;
            var prevLong = position.coords.longitude;
            var data = [];
            var diff=0;
           	//diff = distance(prevLat,prevLong,danger[2]['lat'],danger[2]['long']);
           	//console.log(diff);


            for (var i = 0; i < danger.length; i++) {
            	diff = distance(prevLat,prevLong,danger[i]['lat'],danger[i]['long'],'km');
            	if(diff<=40){
            		data.push({'name':danger[i]['name'], "distt":diff});
            	}
            }
            // Get current position
            var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
            var x =document.getElementById("demo");
            var dd =document.getElementById("ddd");
            var y =document.getElementById("demo2");
            
            dd.innerHTML = "lat:" +prevLat +",long:"+ prevLong ;
             if(data.length<1){
             	x.innerHTML = "<div style='width:100px; height:100px; border-radius:50%;background:green;'></div><p>You are outside danger</p>";
            }else{
    			x.innerHTML = "<div style='width:100px; height:100px; border-radius:50%;background:red;'></div>";
    			y.innerHTML ='';
    			for (var i = 0; i < data.length; i++){
					y.innerHTML += "you are approximately <b>"+ Math.ceil(data[i]['distt'])+ "m</b> meters away from "+ data[i]['name']+"</br>";
    			}
    			var audio = new Audio('dangerSound.mp3');
				audio.play();
            }
            
            
        }
        
    }

    function startWatch() {
        var result = document.getElementById("demo");
        
        var toggleWatchBtn = document.getElementById("toggleWatchBtn");
        
        toggleWatchBtn.onclick = function() {
            if(watchID) {
                toggleWatchBtn.innerHTML = "Start Watching";
                navigator.geolocation.clearWatch(watchID);
                watchID = false;
            } else {
                toggleWatchBtn.innerHTML = "Aquiring Geo Location...";
                showPosition();
            }
        }
    }
    
    // Initialise the whole system (above)
    window.onload = startWatch;

/*









function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
	var clat = position.coords.latitude;
	var clng = position.coords.longitude;
	data = [];
	for (var i = 0; i < danger.length; i++) {
		var diff = distance(clat, clng,danger[i]['lat'],danger[i]['long']);

	}
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}*/
