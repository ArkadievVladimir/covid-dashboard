import React, { useRef, useLayoutEffect } from 'react';
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { getHistoryStatCountry } from '../../InitialStateComponent/index';
import './MapComponent.css';

function MapComponent({ countries, stat, setCountryHistoryStat, setActiveCountry, activeCountry }) {
  let mapData = [];
  var currentCountry = "World";
  var currentPolygon;

  countries.forEach((country) => {
    mapData.push({
      id: country.CountryCode,
      name: `${country.Country}\n ${stat}`,
      value: country[stat],
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

  
  polygonTemplate.events.on("hit", handleCountryHit);
  polygonTemplate.events.on("over", handleCountryOver);
  polygonTemplate.events.on("out", handleCountryOut);
  // polygon states
  var polygonHoverState = polygonTemplate.states.create("hover");
  polygonHoverState.transitionDuration = 0;
  polygonHoverState.properties.fill = 'rgb(40,40,40)';
  // var polygonActiveState = polygonTemplate.states.create("active")
  // polygonActiveState.properties.fill = 'green';

  
    // circle.events.on("hit", test);
    // async function test(e) {
    //   console.log(e.target.dataItem.dataContext.id);
    //   await showData(e.target.dataItem.dataContext.id)
    // }


imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 4,
  "max": 30,
  "dataField": "value"
});
// console.log(imageSeries)
x.legend = new am4maps.Legend();
x.legend.background.fillOpacity = 0;
x.legend.labels.template.fill = 'rgba(255,0,0,0.6)';
// x.legend.labels.cornerRadius = 80;
// x.legend.width = 120;
x.legend.useDefaultMarker = true;
var marker = x.legend.markers.template.children.getIndex(0);
marker.cornerRadius(12, 12, 12, 12);
// marker.strokeWidth = 2;
// marker.strokeOpacity = 1;
// marker.stroke = am4core.color("#ccc");
x.legend.align = "left";
x.legend.padding(10, 15, 10, 15);
x.legend.data = [{
    name: stat, 
}];
x.legend.itemContainers.template.clickable = false;
x.legend.itemContainers.template.focusable = false;

  // MAP CHART zoomControl
  x.zoomControl = new am4maps.ZoomControl();
  x.zoomControl.align = "right";
  x.zoomControl.marginRight = 15;
  x.zoomControl.valign = "middle";
  x.zoomControl.opacity = 0.5;
  x.zoomControl.minusButton.events.on("hit", showWorld);

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

    // !console.log(x.series)
    if (polygonSeries.mapPolygons.values[1]) {
      polygonSeries.mapPolygons.values[1].isActive = true;
      selectCountry(polygonSeries.mapPolygons.values[1])
    }
    
    // polygonSeries.mapPolygons.isActive = true;
    // polygonSeries.mapPolygons.isHover = true;
    // x.zoomToMapObject(polygonSeries.mapPolygons.values[1], getZoomLevel(polygonSeries.mapPolygons.values[1]))
  // select a country
  function selectCountry(mapPolygon) {
    // console.log('mapPolygon', mapPolygon)
    resetHover();
    polygonSeries.hideTooltip();

    // if the same country is clicked show world
    if (currentPolygon == mapPolygon) {
      currentPolygon.isActive = false;
      currentPolygon = undefined;
      showWorld();
      return;
    }
    // save current polygon
    currentPolygon = mapPolygon;
    // var countryIndex = countryIndexMap[mapPolygon.dataItem.id];
    currentCountry = mapPolygon.dataItem.dataContext.name;
    // console.log('target', mapPolygon.dataItem.dataContext.id)
    showData(mapPolygon.dataItem.dataContext.id)
    // make others inactive
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isActive = false;
    })

    mapPolygon.isActive = true;

    // zoom to country
    x.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
  }

  async function showData(selectedCountyCode) {
    setActiveCountry(selectedCountyCode);

    const historyData =  await getHistoryStatCountry(selectedCountyCode, countries)
    // console.log('historyData', historyData)
    setCountryHistoryStat(historyData);

    function changeHighlightSelectedCountry(activeCountry) {
      if (document.querySelector('.active-country')) {
        document.querySelector('.active-country').classList.toggle('active-country');
      }
      if (document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`)) {
        document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`).classList.toggle('active-country');
      }
    }

    changeHighlightSelectedCountry(selectedCountyCode);
  }


  // show world data
  function showWorld() {
    currentCountry = "World";
    // console.log('target', 'world')
    currentPolygon = undefined;
    resetHover();

    // make all inactive
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isActive = false;
    })

    x.goHome();
  }

  function resetHover() {
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isHover = false;
    })

    
    // bubbleSeries
    imageSeries.mapImages.each(function(image) {
      image.isHover = false;
    })
  }

    // calculate zoom level (default is too close)
    function getZoomLevel(mapPolygon) {
      var w = mapPolygon.polygon.bbox.width;
      var h = mapPolygon.polygon.bbox.width;
      // change 2 to smaller walue for a more close zoom
      return Math.min(x.seriesWidth / (w * 2), x.seriesHeight / (h * 2))
    }

    function handleCountryHit(event) {
      selectCountry(event.target);

    }

    function handleCountryOut(event) {
      rollOutCountry(event.target);
    }

    function handleImageOver(event) {
      rollOverCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleCountryOver(event) {
      rollOverCountry(event.target);
    }

      // what happens when a country is rolled-out
  function rollOutCountry(mapPolygon) {
    var image = imageSeries.getImageById(mapPolygon.dataItem.id)

    resetHover();
    if (image) {
      image.isHover = false;
    }
  }

    // what happens when a country is rolled-over
    function rollOverCountry(mapPolygon) {

      resetHover();
      if (mapPolygon) {
        mapPolygon.isHover = true;
  
        // make bubble hovered too
        var image = imageSeries.getImageById(mapPolygon.dataItem.id);
        if (image) {
          image.dataItem.dataContext.name = mapPolygon.dataItem.dataContext.name;
          image.isHover = true;
        }
      }
    }


    return () => {
      x.dispose();
    };
  }, []);
  
  // When the --- prop changes it will update the map
  useLayoutEffect(() => {
    map.current.series.values[1].data = mapData;
    map.current.legend.data = [{
      name: stat, 
      fill: 'rgba(255,0,0,0.6)'
  }];
  }, [mapData]);

  // useLayoutEffect(() => {
  //   target.current.series.values[1].data = selectCountry;
  // }, [selectCountry]);

  return (
    <div className="map-component-wrapper">
      <div id="mapdiv" style={{ width: "100%", height: "100%" }}></div>
    </div>
   
  );
}
export default MapComponent;