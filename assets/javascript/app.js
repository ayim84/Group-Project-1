$(document).ready(function()
{
    $("#searchForm").on("submit", function(event)
    {
        event.preventDefault();

        var lat = "";
        var long = "";

        var location = $("#UserSearchInput").val();
        console.log(location);

        var googleMapsQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&address=" + location;

        $.ajax(
        {
            url: googleMapsQueryURL,
            method: "GET"
        }).then(function(response)
        {
            var googleMapsResults = response.results[0];
            console.log(googleMapsResults);  

            lat = googleMapsResults.geometry.location.lat;
            long = googleMapsResults.geometry.location.lng;
            console.log(lat);
            console.log(long);
    
            var hikingProjectQueryURL = "https://www.hikingproject.com/data/get-trails?key=200337065-b63aa83fc2f455dc1c697f8710938ca8&lat=" + lat + "&lon=" + long;
    
            console.log(hikingProjectQueryURL);
    
            $.ajax(
            {
                url: hikingProjectQueryURL,
                method: "GET"
            }).then(function(response)
            {
                console.log(response.trails[0]);

                function initMap() {

                    var map = new google.maps.Map(document.getElementById('map'), {
                      zoom: 3,
                      center: {lat: lat, long}
                    });
            
                    // Create an array of alphabetical characters used to label the markers.
                    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            
                    // Add some markers to the map.
                    // Note: The code uses the JavaScript Array.prototype.map() method to
                    // create an array of markers based on a given "locations" array.
                    // The map() method here has nothing to do with the Google Maps API.
                    var markers = locations.map(function(location, i) {
                      return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length]
                      });
                    });
            
                    // Add a marker clusterer to manage the markers.
                    var markerCluster = new MarkerClusterer(map, markers,
                        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                  }

                  var locations = [];

                  for(var i = 0; i < response.trails.length; i++)
                  {
                      locations.push({lat: response.trails[i].latitude, lng: response.trails[i].longitude})                      
                  }
                  console.log(locations);
            });
        });
    });
});