import React, { useRef, useLayoutEffect } from 'react';
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import './MapComponent.css';

function MapComponent(props) {
  const map = useRef(props);
  
  useLayoutEffect(() => {
    let x = am4core.create("chartMap", am4maps.MapChart);

    // let title = x.titles.create();
    // title.text = "[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder";
    // title.textAlign = "middle";

    console.log(map.current)
    // console.log('props', props)
    // Generate data
    let mapData = [];
    props.countries.forEach((country) => {
      mapData.push({
        id: country.CountryCode,
        name: `${country.Country}\nTotal confirmed`,
        value: country.TotalConfirmed,
      });
    })

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


// imageSeries.heatRules.push({
//   "property": "fill",
//   "target": polygonTemplate,
//   "min": am4core.color("#ffffff"),
//   "max": am4core.color("#AAAA00"),
//   "dataField": "value"
// });
//test

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
  // useLayoutEffect(() => {
  //   map.current.imageTemplate.data = props.countries;
  // }, [props.countries]);

  return (
    <div className="map-component-wrapper">
      <div id="chartMap" style={{ width: "100%", height: "100%" }}></div>
    </div>
   
  );
}
export default MapComponent;