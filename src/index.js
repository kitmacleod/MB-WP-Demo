 import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import'./styles/styles.scss';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// var MapboxDraw = require('@mapbox/mapbox-gl-draw');

// Not sure how to import turf here (need it for MB example and other work)
// import turf from 'turf';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l0bWFjbGVvZCIsImEiOiJjam12d3F0Y3QyZXBvM3ZwbjRsajMwZG53In0.XU1YIWr-iN8_tovQx93X7A';
const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-74.50, 40],
  zoom: 9
});
var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});
map.addControl(draw);

// From MB-GL draw example
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);


// Need to check this, as not using <p>
function updateArea(e) {
  var data = draw.getAll();
  console.log(data);
  var area = turf.area(data);
  console.log(area);


// Still working on getting 'area' returned to html element, see notes

  var answer = document.getElementById('outcomes-area');
  if (data.features.length > 0) {
    var area = turf.area(data);
    var rounded_area = Math.round(area*100)/100;
    console.log(area);
    console.log(rounded_area);
    return `Rounded area ${area} square meters`;


    // answer.innerHTML = '<p><strong>' + rounded_area + '</strong></p><p>square meters</p>';

  } else {
      console.log('error');
     answer.innerHTML = '';
       if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
  }
}




// map.on('load', function () {

// });