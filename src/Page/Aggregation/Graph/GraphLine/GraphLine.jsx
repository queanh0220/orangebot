import React, { useEffect, useRef, useState } from "react";
import "./GraphLine.css";
import icon from "../../../../Svg/aggregation/scenario/icon2.svg";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CaretDownOutlined } from "@ant-design/icons";
Chart.register(...registerables);

export default function GraphLine() {
  const ref = useRef(null);
  const [data, setData] = useState({
    labels: [
      "10am",
      "11am",
      "12am",
      "01am",
      "02am",
      "03am",
      "04am",
      "05am",
      "06am",
      "07am",
      "08am",
      "09am",
      "10am",
    ],
    datasets: [
      {
        data: [452, 250, 470, 320, 330, 210, 420, 150, 302, 305, 610, 500, 640],
        label: "",
        borderColor: "#5bc4ff",
        backgroundColor: "#3e95cd21",
        fill: true,
        tension: 0.4,
      },
    ],
  });
  const createGradient = (ctx, area, start, end) => {
    const colorStart = start;
    const colorEnd = end;

    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);

    return gradient;
  };
  useEffect(() => {
    setData({
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(
          ref.current.ctx,
          ref.current.chartArea,
          "#5bc4ff21",
          "#ff5bef21"
        ),
        borderColor: createGradient(
          ref.current.ctx,
          ref.current.chartArea,
          "#5bc4ff",
          "#ff5bef"
        ),
      })),
    });
  }, []);
  return (
    <div className="grline bg-item">
      <div className="grline-title">
        <span className="grline-label">シナリオ:</span>
        <div className="grline-img">
          <img src={icon} alt="" />
        </div>
        <span className="grline-text">航空券予約</span>
        <CaretDownOutlined />
      </div>
      <Line
        ref={ref}
        data={data}
        options={{
          title: {
            display: true,
            text: "a",
          },
          plugins: { legend: { display: false } },
          scales: {
            y: {
              min: 0,
              max: 1000,
            },
          },
        }}
      />
    </div>
  );
}
