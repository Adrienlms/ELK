import React from "react";
import { Line } from "react-chartjs-2";
import { Bubble } from "react-chartjs-2";

function ChartJs({ yieldData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={yieldData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default ChartJs;