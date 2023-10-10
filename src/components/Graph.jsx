import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = (prop) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (prop.crimeData) {
      const ctx = document.getElementById("revenueChart");

      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: prop.crimeData.data.map((item) => item.data_year),
            datasets: [
              {
                label: "My Line Chart",
                data: prop.crimeData.data.map(
                  (item) => item["Aggravated Assault"]
                ),
                fill: true,
                borderColor: "#0074D9",
                backgroundColor: "rgba(0, 116, 217, 0.2)",
                tension: 0.2,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "My Line Chart",
                font: {
                  size: 16,
                  family: "Arial",
                },
              },
            },
          },
        });

        chartRef.current = newChart;
      }
    }
  }, [prop.crimeData]);

  return <canvas id="revenueChart" />;
};

export default LineChart;
