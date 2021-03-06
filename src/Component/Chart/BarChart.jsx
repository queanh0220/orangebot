import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const data = {
  labels: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  datasets: [{ data: [0, 20, 40, 60] }],
};
const BarChart = () => {
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
