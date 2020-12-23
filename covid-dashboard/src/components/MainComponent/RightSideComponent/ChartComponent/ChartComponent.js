import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useRef, useLayoutEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import './ChartComponent.css';
import FullScreenBtnComponent from '../../LeftSideComponent/ListComponent/FullScreenBtnComponent/index';

function ChartComponent({ stat, activeCountry, globalHistory, countryHistoryStat }) {
  const chart = useRef(null);
  let data = [];
  if (activeCountry) {
    data = countryHistoryStat.map((el) => {
      return {
        date: el.date,
        value: el[stat],
      }
    });
  } else {
    data = globalHistory.map((el) => {
      return {
        date: el.date,
        value: el[stat],
      }
    });
  }
  useLayoutEffect(() => {
    let x = am4core.create('chartdiv', am4charts.XYChart);
    x.paddingLeft = 0;
    x.data = data;
    x.zoomOutButton.icon.disabled = true;
    let zoomImage = x.zoomOutButton.createChild(am4core.Image);
    zoomImage.href = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJ
    QyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEu
    ZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2IDk2IiBoZWlnaHQ9Ijk2cHgiIGlkPSJ6b29tX291dCIgdmVy
    c2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgOTYgOTYiIHdpZHRoPSI5NnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0
    cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBk
    PSJNOTAuODI5LDg1LjE3MUw2OC4xMjEsNjIuNDY0QzczLjA0Nyw1Ni4zMDcsNzYsNDguNSw3Niw0MEM3NiwyMC4xMTgsNTkuODgy
    LDQsNDAsNEMyMC4xMTgsNCw0LDIwLjExOCw0LDQwczE2LjExOCwzNiwzNiwzNiAgYzguNSwwLDE2LjMwNi0yLjk1MywyMi40NjQt
    Ny44NzlsMjIuNzA4LDIyLjcwOGMxLjU2MiwxLjU2Miw0LjA5NSwxLjU2Miw1LjY1NywwQzkyLjM5MSw4OS4yNjcsOTIuMzkxLDg2
    LjczMyw5MC44MjksODUuMTcxeiAgIE00MCw2OGMtMTUuNDY0LDAtMjgtMTIuNTM2LTI4LTI4czEyLjUzNi0yOCwyOC0yOGMxNS40
    NjQsMCwyOCwxMi41MzYsMjgsMjhTNTUuNDY0LDY4LDQwLDY4eiIvPjxwYXRoIGQ9Ik01Niw0MGMwLDIuMjA5LTEuNzkxLDQtNCw0
    SDI4Yy0yLjIwOSwwLTQtMS43OTEtNC00bDAsMGMwLTIuMjA5LDEuNzkxLTQsNC00aDI0QzU0LjIwOSwzNiw1NiwzNy43OTEsNTYs
    NDBMNTYsNDB6Ii8+PC9zdmc+`;
    zoomImage.width = 12;
    zoomImage.height = 12;
    zoomImage.interactionsEnabled = false;
    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.tooltip.label.fontSize = '12px';
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.stroke = am4core.color('rgb(180,180,180)');
    // axes labels
    dateAxis.renderer.labels.template.fontSize = '12px';
    dateAxis.renderer.labels.template.fill = am4core.color('rgb(180,180,180)');
    dateAxis.renderer.minGridDistance = 20;
    dateAxis.renderer.labels.template.rotation = -45;
    dateAxis.renderer.labels.template.paddingTop = '0px';
    dateAxis.renderer.labels.template.verticalCenter = 'left';
    dateAxis.renderer.labels.template.horizontalCenter = 'right';
    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    // axes labels
    valueAxis.renderer.labels.template.fontSize = '12px';
    valueAxis.renderer.labels.template.fill = am4core.color('rgb(180,180,180)');
    // x.numberFormatter.numberFormat = "#.#'%'";
    valueAxis.renderer.minGridDistance = 20;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.grid.template.stroke = am4core.color('rgb(150,150,150)');
    // ColumnSeries() LineSeries()
    let series = x.series.push(new am4charts.ColumnSeries());
    series.fill = am4core.color('red');
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.stroke = am4core.color('red');
    series.strokeWidth = 2;
    series.tensionX = 0.7;
    series.tooltipText = '{valueY.value}';
    // Drop-shaped tooltips
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = 'black';
    series.tooltip.background.cornerRadius = 80;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = 'middle';
    series.tooltip.label.fontSize = '12px';
    series.tooltip.animationDuration = 200;
    x.cursor = new am4charts.XYCursor();
    x.cursor.lineY.disabled = true;
    x.cursor.lineX.stroke = am4core.color('white');
    x.cursor.lineX.strokeOpacity = 0.6;
    chart.current = x;
    return () => {
      x.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    chart.current.data = data;
  }, [data]);

  const [fullScreen, setfullScreen] = useState(false);
  function onFullScreen () {
    setfullScreen(!fullScreen);
    const body = document.getElementsByTagName('body');
    if(body[0].style.overflow === 'hidden') {
      body[0].style.overflow = 'auto';
    } else {
      body[0].style.overflow = 'hidden';
    } 
  };
  const zIndex = 'zIndex';
  const background = 'backgroundColor';
  const style = {
    position: fullScreen ? 'absolute' : 'relative',
    top: fullScreen ? '0' : '0',
    bottom: fullScreen ? '0' : '0',
    right: fullScreen ? '0' : '0',
    left: fullScreen ? '0' : '0',
    width: fullScreen ? '100%' : '100%',
    height: fullScreen ? '100vh' : '50%',
    [background]: fullScreen ? 'black' : '#222222',
    [zIndex]: fullScreen ? '1000' : '0',
  };
  return (
    <div style={style}>
    <div id="chartdiv" style={{ width: "100%", height: "100%", backgroundColor: "#222222", borderRadius: "5px"}}></div>
    <FullScreenBtnComponent onFullScreen={onFullScreen}/>
    </div>
  );
}
export default ChartComponent;
