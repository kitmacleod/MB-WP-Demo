import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l0bWFjbGVvZCIsImEiOiJjam12d3F0Y3QyZXBvM3ZwbjRsajMwZG53In0.XU1YIWr-iN8_tovQx93X7A';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-74.50, 40],
  zoom: 9
});