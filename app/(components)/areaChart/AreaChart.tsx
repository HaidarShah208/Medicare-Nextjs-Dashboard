'use client'
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  appointmentsData: any[]; // assuming your appointment data is of type any[]
}

interface State {
  series: { name: string, data: number[] }[];
  options: {
    chart: { height: number, type: string };
    dataLabels: { enabled: boolean };
    stroke: { curve: string };
    xaxis: { type: string, categories: string[] };
    tooltip: { x: { format: string } };
    toolbar: { show: boolean };
  };
}

class AreaChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      series: [{
        name: 'series1',
        data: [1, 40, 28, 51, 42, 109, 100]
      }],
      options: {
        toolbar: {
          show: false,  
        },
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
 
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
          labels: {
            show: false  
          }
        },
        yaxis: {
          labels: {
            show: false  
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        
          
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={112} width={164}/>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default AreaChart;
