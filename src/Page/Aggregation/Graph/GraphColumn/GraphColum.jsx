import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./GraphColumn.css";
export default function GraphColum() {
  
  const ref = useRef(null);
  const [data, setData] = useState({
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
    datasets: [
      {
        data: [32, 18, 50, 30, 38, 51, 18, 42, 30, 16, 19, 24],
        label: "",
        fill: true,
        tension: 0.4,
        barThickness: 20
      },
    ],
  });
  const createGradient = (ctx, area, start, end) => {
    const colorStart = start;
    const colorEnd = end;

    const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);

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
          "#344FDB",
          "#CF6BFF"
        ),
      })),
    });
  }, []);
  return (
    <div className="grcol bg-item">
        <span className="grcol-label">チャットボットの途中で離脱数</span>

      <Bar
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
              max: 60,
            },
          },
        }}
      />
    </div>
  );
}
