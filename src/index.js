 import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import'./styles/styles.scss';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import '@mapbox/mapbox-gl-draw';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// var MapboxDraw = require('@mapbox/mapbox-gl-draw');

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l0bWFjbGVvZCIsImEiOiJjam12d3F0Y3QyZXBvM3ZwbjRsajMwZG53In0.XU1YIWr-iN8_tovQx93X7A';
const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-74.50, 40],
  zoom: 9
});
var Draw = new MapboxDraw();
map.addControl(Draw);
// map.on('load', function () {

// });