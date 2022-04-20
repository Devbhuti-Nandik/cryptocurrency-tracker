import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { Chart, registerables } from "chart.js";

const Graph = ({ pointData }) => {
  Chart.register(...registerables);
  let chartRef = useRef();

  const [decreasing, setDecreasing] = useState(false);
  let firstPoint = pointData[0];
  let lastPoint = pointData[pointData.length - 1];

  useLayoutEffect(() => {
    if (firstPoint > lastPoint) {
      setDecreasing(true);
    }
  }, [firstPoint, lastPoint, decreasing]);

  useEffect(() => {
    let label = [];
    for (let i = 0; i < 168; i++) {
      label[i] = i;
    }
    const myChartRef = chartRef.current.getContext("2d");
    var greenGradient = myChartRef.createLinearGradient(0, 40, 0, 0);
    greenGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    greenGradient.addColorStop(1, "rgb(36, 152, 4, 0.8)");

    var redGradient = myChartRef.createLinearGradient(0, 40, 0, 0);
    redGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    redGradient.addColorStop(1, "rgba(240, 65, 53, 0.9)");

    let graph = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: label,
        datasets: [
          {
            data: pointData,
            backgroundColor: decreasing ? redGradient : greenGradient,
            borderColor: decreasing
              ? "rgba(240, 65, 53, 0.733)"
              : "rgba(59,172,7,0.65)",
            lineTension: 0.4,
          },
        ],
      },
      options: {
        plugins:{
            legend: {
             display: false
            }
           },
        tooltips: {
          enabled: true,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: {
            display: false,
            scaleLabel: {
              type: "linear",
              display: true,
            },
            gridLines: {
              display: true,
            },
          },

          yAxes: {
            display: false,
            gridLines: {
              display: true,
            },
            title: {
              display: false,
            },
          },
        },
      },
    });
    graph.update();
    return()=>{
        graph.destroy();
    }
  }, [pointData, decreasing]);

  return (
    <div>
      <canvas id="myChart" height="50" width="170" ref={chartRef}></canvas>
    </div>
  );
};

export default Graph;
