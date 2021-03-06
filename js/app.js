var locData;

//Google Map Key: AIzaSyDZ7402uvsGRTOP_pqKkRm3fjWXbeIJ7pg        
// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var geocoder = new google.maps.Geocoder;
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    geocoder.geocode({'latLng': pos}, function (locations, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var location of locations) {
          if ($.inArray('locality', location.types) != -1) {
            document.getElementById("locDisp").innerHTML = location.formatted_address;
            locData = location.formatted_address;
            break;
          }
        }
      }
    });
  });
}

var data = new Firebase("https://intense-fire-1222.firebaseio.com/");

data.on("value", function(snapshot){
	var context = snapshot.val();

	var source = $("#home-template").html();
	var template = Handlebars.compile(source);
	var html = template(context);

	console.log(html);
	$("#change").html(html);
});

$("#submit").click(function(){
	var entry = {
		warmhat: "No",
		tshirt: "No",
		scarf: "No",
        shorts: "No",
        jacket: "No",
        jeans: "No",
        loc: null
	}
    if ($('#warmHat').is(":checked")){
      entry.warmhat = "Yes";
    }
    if ($('#tShirt').is(":checked")){
      entry.tshirt = "Yes";
    }
    if ($('#scarf').is(":checked")){
      entry.scarf = "Yes";
    }
    if ($('#jacket').is(":checked")){
      entry.jacket = "Yes";
    }
    if ($('#shorts').is(":checked")){
      entry.shorts = "Yes";
    }
    if ($('#jeans').is(":checked")){
      entry.jeans = "Yes";
    }
    entry.loc = locData;

	console.log(entry); //testing info has been placed into object
	data.child("entries").push(entry);
});


var metServ = "http://metservice.com/publicData/localForecastwellington";

$.getJSON(metServ, function (json) {
    var weatherForecast = json.days[0].forecast;
    console.log('Forecast : ', weatherForecast);
    //Trying to test if working by printing the simple forecast to the console
});
