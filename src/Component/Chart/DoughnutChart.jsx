import React from "react";
import { Chart, registerables } from "chart.js";
import { PieChart } from "react-minimal-pie-chart";
import "./DoughnutChart.css"
Chart.register(...registerables);

export default function DoughnutChart() {
  return (
    // <Doughnut
    //   data={{
    //     labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    //     plugins: [thickness],
    //     datasets: [
    //       {
    //         label: "Population (millions)",
    //         backgroundColor: [
    //           "#3e95cd",
    //           "#8e5ea2",
    //           "#3cba9f",
    //           "#e8c3b9",
    //           "#c45850",
    //         ],
    //         data: [2000, 5267, 734, 784, 433],

    //         cutout: "60%",
    //         weight: 0.5,
    //       },
    //     ],
    //   }}
    //   option={{
    //     title: {
    //       display: true,
    //       text: "Predicted world population (millions) in 2050",
    //     },
    //     elements: {
    //       customCutout: true,
    //     },
    //   }}
    // />
    
    <PieChart
    className="pieChart"
      labelPosition={50}
      startAngle={270}
      style={{ position: "relative" }}
      lineWidth={30}
      data={[
        {
          value: 10,
          color: "#FFA544",
        },
        { value: 20, color: "#4623E9" },
        {
          value: 20,
          color: "#FFADD2",
         
        },
      ]}
    >
     
    </PieChart>
  );
}
