$(document).ready(function()
{
    $("#SearchButton").on("submit", function()
    {
        var location = $(this).val();
        console.log = location;

        var googleMapsQueryURL = "http://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCZHm522MDtZTsy5gXFX2ni9rsUYdKXCh4&address&address=" + location;

        var lat = "";
        var long = "";
        var hikingProjectQueryURL = "https://www.hikingproject.com/data/get-trails?key=200337065-b63aa83fc2f455dc1c697f8710938ca8&lat=" + lat + "&lon=" + long;


    });
}