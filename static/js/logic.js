let myMap = L.map("map", {
    center: [35.5051667, -118.388],
    zoom: 6
    });


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
let geojson;

d3.json(url).then(function(data){


function chooseColor(depth) {
    if (depth < 10 ) return "#B2FF66";
    else if (depth < 30 ) return "#FFFF33";
    else if (depth < 50 ) return "#FFB226";
    else if (depth < 70 ) return "#FF9933";
    else if (depth < 90) return "#FF8000";
    else return "#CC0000";
    }

    
    data.features.forEach(feature => {
      let properties = feature.properties;
      let geometry = feature.geometry;

      let latitude = geometry.coordinates[1];
      let longitude = geometry.coordinates[0];
      let magnitude = properties.mag;
      let depth = geometry.coordinates[2];

      
      let markerSize = magnitude * 5;

     
      
      let marker = L.circleMarker([latitude, longitude], {
        radius: markerSize,
        fillColor: chooseColor(depth),
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
      }).addTo(myMap);

      
      let popupContent = `<strong>Magnitude: </strong>${magnitude}<br><strong>Depth: </strong>${depth}`;

      
      marker.bindPopup(popupContent);
    });


    let legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
      let div = L.DomUtil.create('div', 'legend');
      let depthRanges = [-10, 10, 30, 50, 70, 90];
      let colors = ['#B2FF66', '#FFFF33', '#FFB226', '#FF9933', '#FF8000', '#CC0000'];
    
      div.style.backgroundColor = 'white';
    
      for (let i = 0; i < depthRanges.length; i++) {
        let depthRange = depthRanges[i];
        let color = colors[i];
        let label = (depthRange === 90) ? depthRange + '+' : depthRange + ' - ' + depthRanges[i + 1];
    
        let legendItem = document.createElement('div');
        legendItem.innerHTML = `<span class="legend-color" style="background-color:${color}"></span> ${label}`;
        div.appendChild(legendItem);
      }

    
      return div;
    };
    
    legend.addTo(myMap);
    
    let legendStyles = `
    .legend-color {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  `;

  let style = document.createElement('style');
  style.innerHTML = legendStyles;
  document.getElementsByTagName('head')[0].appendChild(style);
    

  

});







