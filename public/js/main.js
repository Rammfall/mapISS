'use strict';

let map,
  marker;

$(document).ready(function () {
setInterval(function () {
    let date = new Date();

    $.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
      let latitude = data.iss_position.latitude,
        longitude = data.iss_position.longitude,
        myLatLng = new google.maps.LatLng({lat: +latitude, lng: +longitude});

      if (marker !== undefined)
        marker.setMap(null);

      marker = new google.maps.Marker({
        position: myLatLng,
        map: map
      });

      map.setCenter(new google.maps.LatLng(latitude, longitude));

      $('.info__text').html('longitude: ' + longitude + ', latitude: ' + latitude);
    });


    $.getJSON('http://api.open-notify.org/astros.json', function (data) {
      let peopleString = '';

      data.people.forEach(function (people) {
        let name = document.createElement('p');

        name.className = 'people__name';
        name.innerHTML = people.name;

        peopleString += name.outerHTML;
      });

      $('.people__number').html(data.number);
      $('.people__container').html(peopleString);
    });

    $('.time').html(date.toLocaleString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }));

    $('.date').html(date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC'
    }));
  }, 5000);
});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4
  });
}

initMap();