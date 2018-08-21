  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZqzebB-sUFbmJ3RlEJzm_QZWP_FQwNbI",
    authDomain: "zero-mark-project-1.firebaseapp.com",
    databaseURL: "https://zero-mark-project-1.firebaseio.com",
    projectId: "zero-mark-project-1",
    storageBucket: "",
    messagingSenderId: "1001665569926"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();


// END FIREBASE INITIALIZATION
  

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

                trailLocations = [];  
                
                $("#trails").html("<h3>Pick a Hike!</h3>");

                for(var i = 0; i < response.trails.length; i++)
                {
                    trailLocations.push(
                        {
                            lat: response.trails[i].latitude, 
                            lng: response.trails[i].longitude,
                            name: response.trails[i].name,
                            summary: response.trails[i].summary,
                            image: response.trails[i].imgSmallMed,
                            length: response.trails[i].length,
                            ascent: response.trails[i].ascent,
                            difficulty: response.trails[i].difficulty,
                            stars: response.trails[i].stars
                        })

                    
                    var trailDiv = $("<div>");
                    var trailList = $("<ul>");
                    var trailName = $("<p data-toggle='modal' data-target='#hikeInformation' class='clickedHike'>").html("<a href='#'>" + trailNumber[i] + ": " + response.trails[i].name + "</a>");
                    trailName.attr("id", i);
                    var trailSummary = $("<li>").text(response.trails[i].summary);
                    var trailLocation = $("<li>").text(response.trails[i].location);

                    trailList.append(trailSummary);
                    trailList.append(trailLocation);

                    trailDiv.append(trailName);
                    trailDiv.append(trailList);

            
                    $("#trails").append(trailName);
                    $("#trails").append(trailList);
                }
                console.log("Array of trails returned by Trail API: " + trailLocations);

                $(document).on("click", ".clickedHike", function(){
                    var id = $(this).attr("id");
                    $(".hikeName").text(response.trails[id].name);
                    $(".card-text").text(response.trails[id].summary);
                    $("#trailInfoImage").attr("src", response.trails[id].imgMedium);
                    $(".card-img-top").attr("src", response.trails[id].imgSmallMed);
                    $("#mileage").text("Miles: " + response.trails[id].length);
                    $("#elevationGain").text("Elevation Gain: ");
                    $("#difficulty").text("Difficulty: " + response.trails[id].difficulty);
                    $("#stars").text("Stars: " + response.trails[id].stars);

                    var googleDirections= $("<iframe allowfullscreen>");
                    googleDirections.attr
                    (
                        {
                            "width": "490",
                            "height": "300",
                            "frameborder": "0",
                            "style": "border: 0",
                            "src": "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&origin=" + lat + "," + long + "&destination=" + response.trails[id].latitude + "," + response.trails[id].longitude,
                        }
                    )
                    console.log(googleDirections);
                    $("#directions").html(googleDirections);
                });
                   
                $("#UserSearchInput").val("");
      

                $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&callback=initMap');

            });
        });
    });
});

function initMap() 
{
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
        //console.log(location);
      var marker = new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],
        name: location.name,
        summary: location.summary,
        image: location.image,
        length: location.length,
        ascent: location.ascent,
        difficulty: location.difficulty,
        stars: location.stars
      });

      google.maps.event.addListener(marker, 'click', function() 
      {
        console.log(location.lat);
        console.log(this);
        // map.setZoom(8);
        // map.setCenter(marker.getPosition());
        $(".hikeName").text(this.name);
        $(".card-text").text(this.summary);
        $("#trailInfoImage").attr("src", this.image);
        $(".card-img-top").attr("src", this.image);
        $("#mileage").text("Miles: " + this.length);
        $("#elevationGain").text("Elevation Gain: ");
        $("#difficulty").text("Difficulty: " + this.difficulty);
        $("#stars").text("Stars: " + this.stars);
      });

      var googleDirections= $("<iframe allowfullscreen>");
        googleDirections.attr
        (
            {
                "width": "600",
                "height": "450",
                "frameborder": "0",
                "style": "border: 0",
                "src": "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&origin=" + lat + "," + long + "&destination=" + location.lat + "," + location.lng
            }
        )
      $("#directions").html(googleDirections);

      return marker;
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};

// SHARE YOUR HIKE SUBMISSION

  // HIKE SHARE SUBMIT BUTTON
  $("#submitHike-btn").on("click", function(event) {
    event.preventDefault();
  
    
  
    // Grabs user input
    var hikerName = $("#hiker-name").val().trim();
    var startTime = $("#start-time").val();
    var endTime = $("#end-time").val();
    
  
    // Creates local "temporary" object for holding hike data
    var logHike = {
      name: hikerName,
      start: startTime,
      end: endTime,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };
  
    
  
    // Uploads employee data to the database
    database.ref().push(logHike);

    console.log(logHike)

//    TEMP FOR TESTING
    console.log(hikerName);
    console.log(startTime);
    console.log(endTime);



  });
