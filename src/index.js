 import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import'./styles/styles.scss';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import {html, render} from 'lit-html';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// var MapboxDraw = require('@mapbox/mapbox-gl-draw');

// Not sure how to import turf here (need it for MB example and other work)
// import turf from 'turf';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l0bWFjbGVvZCIsImEiOiJjam12d3F0Y3QyZXBvM3ZwbjRsajMwZG53In0.XU1YIWr-iN8_tovQx93X7A';
const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/outdoors-v10',
  // starting position [lng, lat]
  center: [-3.617, 57.035],
  zoom: 8
  // WMS example
  // zoom: 8,
  // center: [-74.5447, 40.6892]
});
var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  } 
});

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());
map.addControl(draw);



// Look to add a MB layer
map.on('load', function() {
  map.addLayer({
    id: 'terrain-data',
    type: 'line',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    },
    'source-layer': 'contour'

  });
});


// Adds a WMS (tested, maybe modify later)
// Use MBGL exmaple https://www.mapbox.com/mapbox-gl-js/example/wms/
// map.on('load', function() {
// map.addLayer({
//   'id':'wms-test-layer',
//   'type': 'raster',
//   'source': {
//     'type': 'raster',
//     'tiles': [
//       'https://geodata.state.nj.us/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
//     ],
//     'tileSize': 256
//   },
//   'paint': {}
//   },'aeroway-taxiway');
// });



// From MB-GL draw example
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

// Use lit-html to return polygon area or no area message
function updateArea(e) {
  let data = draw.getAll();

  let areaMessage;
  if (data.features.length > 0) {
    let area = turf.area(data);
    let rounded_area = Math.round(area*100)/100;
    areaMessage = html`<p>The area is ${rounded_area} square meters </p>`
  } else {
    areaMessage = html`<p>No area selected</p>`
  };  

  const areaTemplate = html`${areaMessage}`;
  render(areaTemplate, outcomes__area);

};


