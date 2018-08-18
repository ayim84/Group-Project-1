$(document).ready(function()
{

    $("#searchForm").on("submit", function(event)
    {
        event.preventDefault();

        var lat = "";
        var long = "";
        
        var trailLocations = [];

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

                for(var i = 0; i < response.trails.length; i++)
                {
                    trailLocations.push({lat: response.trails[i].latitude, lng: response.trails[i].longitude})                      
                }
                console.log(trailLocations);

                var newMap = $("<img>");
            
                newMap.attr(
                {
                    "src": "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&center=" + lat + "," + long + "&size=600x450&maptype=roadmap&markers=color:blue%7Clabel:A%7C" + response.trails[0].latitude + "," + response.trails[0].longitude + "&markers=color:red%7Clabel:B%7C" + response.trails[1].latitude + "," + response.trails[1].longitude + "&markers=color:green%7Clabel:C%7C" + response.trails[2].latitude + "," + response.trails[2].longitude + "&markers=color:orange%7Clabel:D%7C" + response.trails[3].latitude + "," + response.trails[3].longitude + "&markers=color:black%7Clabel:E%7C" + response.trails[4].latitude + "," + response.trails[4].longitude + "&markers=color:brown%7Clabel:F%7C" + response.trails[5].latitude + "," + response.trails[5].longitude + "&markers=color:purple%7Clabel:G%7C" + response.trails[6].latitude + "," + response.trails[6].longitude + "&markers=color:gray%7Clabel:H%7C" + response.trails[7].latitude + "," + response.trails[7].longitude + "&markers=color:yellow%7Clabel:I%7C" + response.trails[8].latitude + "," + response.trails[8].longitude + "&markers=color:white%7Clabel:J%7C" + response.trails[9].latitude + "," + response.trails[9].longitude
                });
                
                $("#trailMap").html(newMap);

                $("#UserSearchInput").val("");
      
                console.log(newMap.attr("src"));
            });
        });
    });
});