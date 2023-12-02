import "./BarChart.style.css"
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const BarChart = ({title, labelsArr, xLegend, dataArr, bC, bW}) =>{

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales:{
          y:{
            ticks:{
              font: {
                size: 13,
                weight: 'bold'
              }
            }
          },
          x:{
            ticks:{
              font: {
                size: 13,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font:{
                size: 16,
                weight: 'bold'
              }
            }
          },
          title: {
            display: false,
            position: 'bottom',
            text: title,
            labels: {
              font:{
                size: 15
              }
            }
          },
          
        },
      };
      
      const labels = labelsArr;
      
      const data = {
        labels,
        datasets: [
          {
            label: xLegend,
            data: dataArr,
            backgroundColor: bC,
            // borderWidth: bW,
            barThickness: 20,
            borderColor: 'rgba(0,0,0,0)'
          }
        ],
      };

    return(
        <Bar options={options} data={data} />
    )
}

export default BarChart;