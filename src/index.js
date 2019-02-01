 import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import'./styles/styles.scss';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import {html, render, templateCaches} from 'lit-html';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// var MapboxDraw = require('@mapbox/mapbox-gl-draw');

// Not sure how to import turf here (need it for MB example and other work)
// import turf from 'turf';

import intersect from '@turf/intersect';
import polygon from '@turf/helpers';
import bbox from '@turf/bbox';

import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

import Chart from 'chart.js';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l0bWFjbGVvZCIsImEiOiJjaXdnOWF5YzQwMDBqMnlsZnNlYW05aHB1In0.9y6icPG278-a8uWZr8cmLQ';
const map = new mapboxgl.Map({
  container: 'map-container',
  // MB outdoorAndLochs
  //style:'mapbox://styles/kitmacleod/cjozuoutc9iv02ro4srhjg7rh',
  // MB OutdoorsAndOrdSurWoodland (throwing an error in console)
  // style: 'mapbox://styles/kitmacleod/cjrhtu5959a3e2totyhn412jb',
  // MB Outdoor Style- test (throwing the same errors)
  // style: 'mapbox://styles/kitmacleod/cjrhx6z7w0b7d2spefrrst402',
  // MB Basic Template - test
  // style: 'mapbox://styles/kitmacleod/cjrhxdf9r8lfb2spdnt1n98zt',
  // Standard tiles
  // style: 'mapbox://styles/mapbox/outdoors-v9',
  // SatAddedLanduseFromTerrain
  style: 'mapbox://styles/kitmacleod/cjritfyfz000e2smtq157niyp',
  // starting position [lng, lat]
  // CNPA coords
  center: [-3.617, 57.035],

  
  // Normal zoom
  // zoom: 8
  // Test zoom
   zoom: 12
  // WMS example
  // zoom: 8,
  // center: [-74.5447, 40.6892]

  //US draw select example
  //center: [-98, 38.88],
  //zoom: 3

});

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

// Add US map layer for queryRender examples (may take function out into its own like draw)
//   map.on('load', function() {
//     // Add the source to query. In this example we're using
//     // county polygons uploaded as vector tiles
//     map.addSource('counties', {
//         "type": "vector",
//         "url": "mapbox://mapbox.82pkq93d"
//     });

//     map.addLayer({
//         "id": "counties",
//         "type": "fill",
//         "source": "counties",
//         "source-layer": "original",
//         "paint": {
//             "fill-outline-color": "rgba(0,0,0,0.1)",
//             "fill-color": "rgba(0,0,0,0.1)"
//         }
//     }, 'place-city-sm'); // Place polygon under these labels.


//   map.addLayer({
//     "id": "counties-highlighted",
//     "type": "fill",
//     "source": "counties",
//     "source-layer": "original",
//     "paint": {
//       "fill-outline-color": "#484896",
//       "fill-color": "#6e599f",
//       "fill-opacity": 0.75
//     },
//     "filter": ["in","COUNTY",""]
//   }, 'place-city-sm');
// });

// Add SEPA loch data based on MB 'how web apps work' (not used as added to the main layer above)
// map.on("load", function() {
//   map.addLayer({
//     id: "SepaLochsOvrlClas",
//     type: "fill",
//     source: {
//       type: "vector",
//       url: "mapbox://styles/kitmacleod/cjozo724zeb772rp6prfrq80g"
//     },
//     "source-layer": "SepaLochsOvrlClas"
//   });
// });

// Adding rectangle mode to draw
const modes = MapboxDraw.modes;
modes.draw_rectangle = DrawRectangle;


// Charlie example of draw to select polygons
// 070119 added modes: modes, for rectangle mode (may remove)
const draw = new MapboxDraw({
  displayControlsDefault: false,
  modes: modes,
  controls: {
    polygon: true,
    trash: true
  }
});
map.addControl(draw);

// Draw mode (may remove)
draw.changeMode('draw_rectangle');

// Charlie's function
// map.on('draw.create', function(el) {
//    let userPolygon = el.features[0];
//    console.log(userPolygon);

//    // Generate bbox from polygon
//    let polygonBoundingBox = turf.bbox(userPolygon);
//    console.log(polygonBoundingBox);

//    let southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
//    let northEast =[polygonBoundingBox[2], polygonBoundingBox[3]];

//    let northEastPointPixel = map.project(northEast);
//    let southWestPointPixel = map.project(southWest);
//    console.log(northEastPointPixel);

//    let features = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['counties'] });

//    let filter = features.reduce(function(memo, feature) {
//      if (! (undefined === turf.intersect(feature, userPolygon))) {
//        // only add the property, if the feature intersects with drawn polygon
//        memo.push(feature.properties.FIPS);
//      }
//      return memo;
//    }, ['in', 'FIPS']);

//    map.setFilter("counties-highlighted", filter);


// });



// Rest of MB example code to select features aroud a click using bbox (working)
// map.on('click', function(e) {
//   // set bbox as 5px rectangle around clicked point
//   const bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
//   const features = map.queryRenderedFeatures(bbox, { layers: ['counties'] });
//   // Run through selected features and set a filter
//   // to match features with unique FIPS codes to activate
//   // the 'counties-highlighted' layer
//   console.log('features', features);
//   const filter = features.reduce(function(memo, feature) {
//     memo.push(feature.properties.FIPS);
//     return memo;
//     console.log('memo', memo);
//   },['in', 'FIPS']);
//   map.setFilter("counties-highlighted", filter);
// });




// // Start of draw (working)
// var draw = new MapboxDraw({
//   displayControlsDefault: false,
//   controls: {
//     polygon: true,
//     trash: true
//   } 
// });

// // Add zoom and rotation controls to the map
// map.addControl(new mapboxgl.NavigationControl());
// map.addControl(draw);



// // Add a MB layer for contours
// map.on('load', function() {
//   map.addLayer({
//     id: 'terrain-data',
//     type: 'line',
//     source: {
//       type: 'vector',
//       url: 'mapbox://mapbox.mapbox-terrain-v2'
//     },
//     'source-layer': 'contour'

//   });
// });


// // Add MB layer for landuse (not fully working)
// // map.on('load', function() {
// //   map.addLayer({
// //     id: 'terrain-land', 
// //     type: 'fill',
// //     source: {
// //       type: 'vector',
// //       url: 'mapbox://mapbox.mapbox-terrain-v2'
// //     },
// //     'source-layer': 'landcover'
// //   });
// // });


// // Add improved hillshading based on MBGL example (may add again)
// // map.on('load', function () {
// //   map.addSource('dem', {
// //       "type": "raster-dem",
// //       "url": "mapbox://mapbox.terrain-rgb"
// //   });
// //   map.addLayer({
// //       "id": "hillshading",
// //       "source": "dem",
// //       "type": "hillshade"
// //   // insert below waterway-river-canal-shadow;
// //   // where hillshading sits in the Mapbox Outdoors style
// //   }, 'waterway-river-canal-shadow');
// // });



// // Adds a WMS (tested, maybe modify later)
// // Use MBGL exmaple https://www.mapbox.com/mapbox-gl-js/example/wms/
// // map.on('load', function() {
// // map.addLayer({
// //   'id':'wms-test-layer',
// //   'type': 'raster',
// //   'source': {
// //     'type': 'raster',
// //     'tiles': [
// //       'https://geodata.state.nj.us/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
// //     ],
// //     'tileSize': 256
// //   },
// //   'paint': {}
// //   },'aeroway-taxiway');
// // });

//Dev show tile boundaries 
map.showTileBoundaries = true;

// // From MB-GL draw example
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);


// Def these as need outwith updateArea
let areaList = [];
let classList = [];

// Use lit-html to return polygon area or no area message
// TODO may change data to be more specific e.g. drawnFeature
function updateArea(e) {
  let data = draw.getAll();
 // console.log('draw.getAll', draw.getAll());

  // TODO: may need to add a test that data.features.length > 0
  // Create bbox and use (NJ code)
  let bbox =turf.bbox(data.features[0]);
  // console.log('bbox', bbox);

  let southWest = [bbox[0], bbox[1]];
  let northEast = [bbox[2], bbox[3]];
  let northEastPointPixel = map.project(northEast);
  let southWestPointPixel = map.project(southWest);
  // console.log(southWestPointPixel);
  // TODO: need to add layers, this is throwing an error 

  let tileFeatures = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: [ 'landcover' ]});
  //console.log(tileFeatures);
 
  // Trying to get information out of tileFeatures
  tileFeatures.forEach((feature)=> {
    let featureClass = feature.properties.class;
    // console.log('featureClass', featureClass);
    classList = classList.concat(featureClass);
    // console.log('classList', classList);
    // console.log('classList type: ',typeof classList);
    let featureArea = turf.area(feature);
    // console.log('featureArea', featureArea);
    let featureAreaRound = Math.round(featureArea);
    areaList = areaList.concat(featureAreaRound);
    console.log('areaList', areaList);
    console.log('areaList type: ',typeof areaList);
  });
  
 // Update chart
 // Try simpler function, if all code in this func then may not be needed
//  function updateChart(){
//  // Docs function
//  //function addData(testChart, classList, areaList) {
//  // testChart.data.labels.push(classList);
//  // try simpler assignment
//    testChart.data.labels = classList;
//    testChart.data.datasets.data = areaList; 
//   //  testChart.datasets.forEach((datasets) => {
//   //    datasets.data.push(areaList);
//    testChart.update;
//    console.log('testChart.data.datasets',testChart.data.datasets);
//  };

 // Invoke function
 //updateChart();

// Chart example
// get a basic chart working here linked to scss
const ctx = document.getElementById("testChart");
console.log('chartAreaList', areaList);
let testChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
  labels: classList,
  datasets: [{
    label: 'Land cover',

    data: areaList,
    backgroundColor: [  
      "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)"
    ],
    borderColor: [
      "rgba(54, 162,235, 1)", "rgba(54, 162,235, 1)"
    ],
    borderWidth: 1

  }
]
},
options: {
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }]
  }
}
});



  // DRAFT:  parse the tileFeature based on drawnFeature
//   tileFeatures.forEach((feature) => {
//     if (turf.intersect(APP.areaOfInterest.features[0], feature)) {
//         let item = JSON.parse(feature.properties.species);
//         species = species.concat(item);
//     }
// });



  // TODO: may remove, as not needed
  // Save drawn FeatureCollection as a string using localStorage
  // let savedFeature;
  // console.log('savedFeature type: ',typeof savedFeature);
  // let drawnFeature = draw.get(data);
  // console.log('drawnFeature type: ',typeof drawnFeature);
  // let drawnFeatureCoord = drawnFeature[0];
  // console.log('drawnFeatureCoord type: ',typeof drawnFeature);


  // localStorage.setItem('savedFeature', drawnFeature);
  // if(drawnFeature) {
  //   console.log("savedFeature exists");
  // } else{
  //   console.log("savedFeature does not exist");
  // };

  // DRAFT:trying NJ queryRenderedFeatures
  // TRY: to see what turf.combine does
  




  let areaMessage;
  if (data.features.length > 0) {
    let area = turf.area(data);
   // let rounded_area = Math.round(area*100)/100;
   // May want to convert this to ha
    let rounded_area = Math.round(area);
    areaMessage = html`<p><strong>The area is ${rounded_area} square meters </strong> </p>`
    // console.log('data type of; ', typeof data);
    // let intersectData = turf.intersect(data, polyLarge);
    // console.log('intersectData type of; ', typeof intersectData);
  } else {
    areaMessage = html`<p>No area selected</p>`
  };  

  const areaTemplate = html`${areaMessage}`;
  render(areaTemplate, outcomes__area);

};


// Test if classList and areaList work here
// classList = ['grass', 'crop'];
// areaList = [10000, 24000];

// Chart was here

// Chart example
// get a basic chart working here linked to scss
const ctx = document.getElementById("testChart");
console.log('chartAreaList', areaList);
let testChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
  labels: classList,
  datasets: [{
    label: 'Land cover',

    data: areaList,
    backgroundColor: [  
      "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)"
    ],
    borderColor: [
      "rgba(54, 162,235, 1)", "rgba(54, 162,235, 1)"
    ],
    borderWidth: 1

  }
]
},
options: {
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }]
  }
}
});



// // Practice polygons CNPA (working)

          
          
          
//           const polyLarge = turf.polygon([[
//             [
//               -3.922119140625,
//               56.88650220638941
//             ],
//             [
//               -3.409881591796875,
//               56.88650220638941
//             ],
//             [
//               -3.409881591796875,
//               57.125804948722575
//             ],
//             [
//               -3.922119140625,
//               57.125804948722575
//             ],
//             [
//               -3.922119140625,
//               56.88650220638941
//             ]
//           ]]);
          
          
//           const polyThin = turf.polygon([[
//             [
//               -4.069061279296875,
//               57.025036816645255
//             ],
//             [
//               -3.2148742675781246,
//               57.025036816645255
//             ],
//             [
//               -3.2148742675781246,
//               57.060150113451755
//             ],
//             [
//               -4.069061279296875,
//               57.060150113451755
//             ],
//             [
//               -4.069061279296875,
//               57.025036816645255
//             ]
//           ]]);



// console.log('polyLarge type: ',typeof polyLarge);
// console.log('polyThin type: ',typeof polyThin);




// Turf intersection test (working)
// let intersectTest = intersect(polyLarge, polyThin);
// console.log('in type intersectTest: ',typeof intersectTest);



// Testing modal

// Get the modal
var modal = document.getElementById('learn-more-modal');

// Get the button that opens the modal
var btn = document.getElementById("modal-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





