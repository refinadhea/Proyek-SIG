// Initialize Firebase
var config = {
    apiKey: "AIzaSyByZIbMeOlaMthkuWBv08TH_BoXnBO8gnw",
    authDomain: "belajar-map-a9aea.firebaseapp.com",
    databaseURL: "https://belajar-map-a9aea.firebaseio.com",
    projectId: "belajar-map-a9aea",
    storageBucket: "belajar-map-a9aea.appspot.com",
    messagingSenderId: "854504402721"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref('markers');
var map = null;

ref.on('value', getData, showError);

function getData(data) {
    var marker = data.val();
    kunci = Object.keys(data.val());
    var content = "";
    for (var i = 0; i < kunci.length; i++) {
        // content += marker[kunci[i]].coordinate.lat + "<br>";
        var position = { lat: marker[kunci[i]].coordinate.lat, lng: marker[kunci[i]].coordinate.lng };
        createMarker(position, null, marker[kunci[i]].info).setMap(map);
    }
    // document.getElementById('info').innerHTML = content;
}
function showError(err) {
    // document.getElementById('info').innerHTML = err;
}

function initMap() {
    var center = { lat: -5.351645650506815, lng: 105.40080353027338 };
    var options = {
        center: center,
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('maps'), options);
    createMarker(center).setMap(map);
}

function createMarker(position, iconImg = null, info = null) {
    var marker = new google.maps.Marker(
        {
            position: position,
            icon: iconImg
        }
    );
    if (info) {
        var infowindow = new google.maps.InfoWindow(
            {
                content: info
            }
        );

        marker.addListener('click', function (e) {
            infowindow.open(map, marker);
        });
    }
    return marker;
}

document.getElementById('simpan').addEventListener('click', function (event) {
    ref.push(
        {
            coordinate: {
                lat: parseFloat(document.getElementById('latitude').value),
                lng: parseFloat(document.getElementById('longitude').value)
            },
            info: document.getElementById('informasi').value
        }
    );
});