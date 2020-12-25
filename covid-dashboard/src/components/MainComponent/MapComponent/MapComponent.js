import React, { useRef, useLayoutEffect, useState } from 'react';
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { getHistoryStatCountry } from '../../InitialStateComponent/index';
import './MapComponent.css';
import FullScreenBtnComponent from '../LeftSideComponent/ListComponent/FullScreenBtnComponent/index';

function MapComponent({ countries, stat, setCountryHistoryStat, setActiveCountry, activeCountry }) {
  let mapData = [];
  let currentPolygon;
  countries.forEach((country) => {
    mapData.push({
      id: country.CountryCode,
      name: `${country.Country}\n ${stat}`,
      value: country[stat],
    });
  })
  const map = useRef(null);
  useLayoutEffect(() => {
    let x = am4core.create("mapdiv", am4maps.MapChart);
    x.geodata = am4geodata_worldLow;
    x.projection = new am4maps.projections.Miller();
    x.background.fill = 'rgb(20,30,50)';
    x.background.fillOpacity = 1;
    // Create map polygon series
    let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;
    let imageSeries = x.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "value";
    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;
    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.fill = 'rgba(255,0,0,0.6)';
    circle.tooltipText = "{name}: [bold]{value}[/]";
    let polygonTemplate = polygonSeries.mapPolygons.template;
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
    let polygonHoverState = polygonTemplate.states.create("hover");
    polygonHoverState.transitionDuration = 0;
    polygonHoverState.properties.fill = 'rgb(40,40,40)';
    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 4,
      "max": 30,
      "dataField": "value"
    });
    x.legend = new am4maps.Legend();
    x.legend.background.fillOpacity = 0;
    x.legend.labels.template.fill = 'rgba(255,0,0,0.6)';
    x.legend.useDefaultMarker = true;
    let marker = x.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    x.legend.align = 'left';
    x.legend.valign = 'bottom';
    x.legend.padding(10, 15, 10, 15);
    x.legend.data = [{
      name: stat, 
    }];
    x.legend.itemContainers.template.clickable = false;
    x.legend.itemContainers.template.focusable = false;
    // switch between map and globe
	  var mapGlobeSwitch = x.createChild(am4core.SwitchButton);
	  mapGlobeSwitch.align = "left"
	  mapGlobeSwitch.y = 10;
	  mapGlobeSwitch.leftLabel.text = "Map";
	  mapGlobeSwitch.rightLabel.text = "Globe";
	  mapGlobeSwitch.verticalCenter = "top";
	  mapGlobeSwitch.leftLabel.fill = 'red';
	  mapGlobeSwitch.rightLabel.fill = 'red';
	  mapGlobeSwitch.events.on("toggled", function() {
		  if (mapGlobeSwitch.isActive) {
			  x.projection = new am4maps.projections.Orthographic;
        x.backgroundSeries.show();
        x.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('rgb(25,35,55)');
        x.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
			  x.panBehavior = "rotateLongLat";
			  polygonSeries.exclude = [];
		  } else {
        x.projection = new am4maps.projections.Miller;
        x.backgroundSeries.hide();
			  x.panBehavior = "move";
			  polygonSeries.data = [];
		  	polygonSeries.exclude = ["AQ"];
		  }
	  })
    // MAP CHART zoomControl
    x.zoomControl = new am4maps.ZoomControl();
    x.zoomControl.align = "right";
    x.zoomControl.marginRight = 15;
    x.zoomControl.valign = "middle";
    x.zoomControl.opacity = 0.5;
    x.zoomControl.minusButton.events.on("hit", showWorld);
    imageTemplate.adapter.add("latitude", function(latitude, target) {
    let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
    if(polygon){
      return polygon.visualLatitude;
    }
    return latitude;
  });
  imageTemplate.adapter.add("longitude", function(longitude, target) {
    let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
    if(polygon){
      return polygon.visualLongitude;
    }
    return longitude;
  });
  map.current = x;
  if (polygonSeries.mapPolygons.values[1]) {
    polygonSeries.mapPolygons.values[1].isActive = true;
    selectCountry(polygonSeries.mapPolygons.values[1])
  }
  function selectCountry(mapPolygon) {
    resetHover();
    polygonSeries.hideTooltip();
    // if the same country is clicked show world
    if (currentPolygon === mapPolygon) {
      currentPolygon.isActive = false;
      currentPolygon = undefined;
      showWorld();
      return;
    }
    // save current polygon
    currentPolygon = mapPolygon;
    let currentCountry = mapPolygon.dataItem.dataContext.name;
    showData(mapPolygon.dataItem.dataContext.id)
    // make others inactive
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isActive = false;
    });
    mapPolygon.isActive = true;
    // zoom to country
    x.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
  }
  async function showData(selectedCountyCode) {
    setActiveCountry(selectedCountyCode);
    const historyData =  await getHistoryStatCountry(selectedCountyCode, countries);
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
    let currentCountry = "World";
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
    let w = mapPolygon.polygon.bbox.width;
    let h = mapPolygon.polygon.bbox.width;
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
    let image = imageSeries.getImageById(mapPolygon.dataItem.id)
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
      let image = imageSeries.getImageById(mapPolygon.dataItem.id);
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
  useLayoutEffect(() => {
    map.current.series.values[1].data = mapData;
    map.current.legend.data = [{
      name: stat, 
      fill: 'rgba(255,0,0,0.6)'
  }];
  }, [mapData]);
  const [fullScreen, setfullScreen] = useState(false);
  function onFullScreen () {
    setfullScreen(!fullScreen);
    const body = document.getElementsByTagName('body');
    if(body[0].style.overflow === "hidden") {
      body[0].style.overflow = "auto";
    } else {
      body[0].style.overflow = "hidden";
    } 
  };
  const zIndex = 'zIndex';
  const background = 'backgroundColor';
  const style = {
    position: fullScreen ? "absolute" : "relative",
    top: fullScreen ? "0" : "0",
    bottom: fullScreen ? "0" : "0",
    right: fullScreen ? "0" : "0",
    left: fullScreen ? "0" : "0",
    width: fullScreen ? "100%" : "49%",
    height: fullScreen ? "100vh" : "73vh",
    [background]: fullScreen ? "black" : "#222222",
    [zIndex]: fullScreen ? "1000" : "0",
  };
  return (
    <div className="map-component-wrapper"  style={style} >
      <div id="mapdiv" style={{ width: "100%", height: "100%" }}></div>
      <FullScreenBtnComponent  onFullScreen={onFullScreen}/>
    </div>
  );
}
export default MapComponent;
