var lat = 39.7392358;
var long = -104.990251;
var trailLocations = [
    {lat: 39.9787, lng: -105.2755},
    {lat: 39.9511, lng: -105.3378},
    {lat: 39.9997, lng: -105.2979},
    {lat: 40.02, lng: -105.2979},
    {lat: 40.0202, lng: -105.2977},
    {lat: 39.9388, lng: -105.2582},
    {lat: 39.9975, lng: -105.2928},
    {lat: 39.7736, lng: -105.2541},
    {lat: 39.7169, lng: -105.3156},
    {lat: 39.8505, lng: -105.3606}
];


$(document).ready(function()
{
    $("#searchForm").on("submit", function(event)
    {
        event.preventDefault();

        var location = $("#UserSearchInput").val();
        console.log("User Inputted Location: " + location);

        var googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&address=" + location;

        $.ajax(
        {
            url: googleMapsQueryURL,
            method: "GET"
        }).then(function(response)
        {
            var googleMapsResults = response.results[0];
            console.log("Google Maps API Return: " + googleMapsResults);  

            lat = googleMapsResults.geometry.location.lat;
            long = googleMapsResults.geometry.location.lng;
            console.log("Latitude from User Input: " + lat);
            console.log("Longitude from user Input: " + long);
    
            var hikingProjectQueryURL = "https://www.hikingproject.com/data/get-trails?key=200337065-b63aa83fc2f455dc1c697f8710938ca8&lat=" + lat + "&lon=" + long;
    
            console.log(hikingProjectQueryURL);
    
            $.ajax(
            {
                url: hikingProjectQueryURL,
                method: "GET"
            }).then(function(response)
            {
                console.log(response.trails[0]);

                var trailNumber = 
                {
                    0: "A",
                    1: "B",
                    2: "C",
                    3: "D",
                    4: "E",
                    5: "F",
                    6: "G",
                    7: "H",
                    8: "I",
                    9: "J"
                };

                console.log(trailNumber["0"]);

                trailLocations = [];  
                
                $("#trails").text("");

                for(var i = 0; i < response.trails.length; i++)
                {
                    trailLocations.push({lat: response.trails[i].latitude, lng: response.trails[i].longitude})

                    
                    var trailList = $("<ul>");
                    var trailName = $("<p>").html("<a href='#'>" + trailNumber[i] + ": " + response.trails[i].name + "</a>");
                    var trailSummary = $("<li>").text(response.trails[i].summary);
                    var trailLocation = $("<li>").text(response.trails[i].location);

                    trailList.append(trailSummary);
                    trailList.append(trailLocation);

                    $("#trails").append(trailName);
                    $("#trails").append(trailList);
                }
                console.log(trailLocations);

                

                // var newMap = $("<img>");
            
                // newMap.attr(
                // {
                //     "src": "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&center=" + lat + "," + long + "&size=600x450&maptype=roadmap&markers=color:blue%7Clabel:A%7C" + response.trails[0].latitude + "," + response.trails[0].longitude + "&markers=color:red%7Clabel:B%7C" + response.trails[1].latitude + "," + response.trails[1].longitude + "&markers=color:green%7Clabel:C%7C" + response.trails[2].latitude + "," + response.trails[2].longitude + "&markers=color:orange%7Clabel:D%7C" + response.trails[3].latitude + "," + response.trails[3].longitude + "&markers=color:black%7Clabel:E%7C" + response.trails[4].latitude + "," + response.trails[4].longitude + "&markers=color:brown%7Clabel:F%7C" + response.trails[5].latitude + "," + response.trails[5].longitude + "&markers=color:purple%7Clabel:G%7C" + response.trails[6].latitude + "," + response.trails[6].longitude + "&markers=color:gray%7Clabel:H%7C" + response.trails[7].latitude + "," + response.trails[7].longitude + "&markers=color:yellow%7Clabel:I%7C" + response.trails[8].latitude + "," + response.trails[8].longitude + "&markers=color:white%7Clabel:J%7C" + response.trails[9].latitude + "," + response.trails[9].longitude
                // });
                
                //$("#trailMap").html(newMap);
                // console.log(newMap.attr("src"));


                $("#UserSearchInput").val("");
      

                $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&callback=initMap');

            });
        });
    });
});

function initMap() {
    console.log("Lat for current Google Map: " + lat + " Long for current Google Map: " + long);

    var map = new google.maps.Map(document.getElementById('trailMap'), {
      zoom: 9,
      center: {lat: lat, lng: long}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = trailLocations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }
//   var locations = [
//     {lat: 39.9787, lng: -105.2755},
//     {lat: 39.9511, lng: -105.3378},
//     {lat: 39.9997, lng: -105.2979},
//     {lat: 40.02, lng: -105.2979},
//     {lat: 40.0202, lng: -105.2977},
//     {lat: 39.9388, lng: -105.2582},
//     {lat: 39.9975, lng: -105.2928},
//     {lat: 39.7736, lng: -105.2541},
//     {lat: 39.7169, lng: -105.3156},
//     {lat: 39.8505, lng: -105.3606}
//   ]