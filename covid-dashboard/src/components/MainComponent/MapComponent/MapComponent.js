import React, { useRef, useLayoutEffect } from 'react';
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import './MapComponent.css';

function MapComponent({ countries, stat }) {
  let mapData = [];
  let inputData = countries;

  let prop;
  if (stat === 0) {
    prop = 'TotalConfirmed';
  } else if (stat === 1) {
    prop = 'TotalRecovered';
  } else if (stat === 2) {
    prop = 'TotalDeaths';
  } else if (stat === 3) {
    prop = 'NewConfirmed';
  } else if (stat === 4) {
    prop = 'NewRecovered';
  } else if (stat === 5) {
    prop = 'NewDeaths';
  } else if (stat === 6) {
    prop = 'GlobalCasesPer100Thousand';
  } else if (stat === 7) {
    prop = 'GlobalRecoveredPer100Thousand';
  } else if (stat === 8) {
    prop = 'GlobalDeathesPer100Thousand';
  } else if (stat === 9) {
    prop = 'NewGlobalCasesPer100Thousand';
  } else if (stat === 10) {
    prop = 'NewGlobalRecoveredPer100Thousand';
  } else if (stat === 11) {
    prop = 'NewGlobalDeathsPer100Thousand';
  };


  inputData.forEach((country) => {
    mapData.push({
      id: country.CountryCode,
      name: `${country.Country}\n ${prop}`,
      value: country[prop],
    });
  })
  //test
  
  const map = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("mapdiv", am4maps.MapChart);

    // let title = x.titles.create();
    // title.text = "[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder";
    // title.textAlign = "middle";

// Set map definition
x.geodata = am4geodata_worldLow;

// Set projection
x.projection = new am4maps.projections.Miller();

x.background.fill = 'rgb(20,30,50)';
x.background.fillOpacity = 1;

// Create map polygon series
var polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["AQ"];
polygonSeries.useGeodata = true;
polygonSeries.nonScalingStroke = true;
polygonSeries.strokeWidth = 0.5;
polygonSeries.calculateVisualCenter = true;

// x.imageTemplate.data = mapData;
var imageSeries = x.series.push(new am4maps.MapImageSeries());
imageSeries.data = mapData;

imageSeries.dataFields.value = "value";

var imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = true;

var circle = imageTemplate.createChild(am4core.Circle);

circle.fillOpacity = 0.7;
circle.fill = 'rgba(255,0,0,0.6)';
circle.tooltipText = "{name}: [bold]{value}[/]";


  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.fill = 'rgb(60,60,60)';
  polygonTemplate.fillOpacity = 1
  polygonTemplate.stroke = "black";
  polygonTemplate.strokeOpacity = 0.15;
  polygonTemplate.setStateOnChildren = true;
  polygonTemplate.tooltipPosition = "fixed";
  // polygon states
  var polygonHoverState = polygonTemplate.states.create("hover");
  polygonHoverState.transitionDuration = 0;
  polygonHoverState.properties.fill = 'rgb(40,40,40)';
  // var polygonActiveState = polygonTemplate.states.create("active")
  // polygonActiveState.properties.fill = 'green';

imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 4,
  "max": 30,
  "dataField": "value"
});

imageTemplate.adapter.add("latitude", function(latitude, target) {
  var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})

imageTemplate.adapter.add("longitude", function(longitude, target) {
  var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})
    map.current = x;
    
    return () => {
      x.dispose();
    };
  }, []);
  
  // When the paddingLeft prop changes it will update the map
  useLayoutEffect(() => {
    map.current.series.values[1].data = mapData;
  }, [mapData]);

  return (
    <div className="map-component-wrapper">
      <div id="mapdiv" style={{ width: "100%", height: "100%" }}></div>
    </div>
   
  );
}
export default MapComponent;