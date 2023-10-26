import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  return <Doughnut data={chartData} />;
};

export default PieChart;
