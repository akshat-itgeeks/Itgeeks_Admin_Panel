import React from 'react'
import Chart from 'react-apexcharts'
import DataTable from '../../components/DataTable'
import MobileTabel from '../../components/MobileTable'
function Home() {

  ////////// Dashboard top Cards Data ///////////
  const CardData = [
    { name: "Total Tutorials", value: 22 },
    { name: "Total Product", value: 14 },
    { name: "Total Warehouses", value: 14},
    { name: "Total Income", value: 11 },
  ]

  //////////// Donut Chart Data //////////////
  const ChartData = {
    options: { labels: ['Team 1', 'Team 2', 'Team 3', 'Team 4'] },
    series: CardData.map((itm)=> {return itm.value}),

  }

  ///////// Bar Chart Data //////////
  const ColumnChartData = {
    series: [{
      name: 'Margin',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, ]
    }],
    options: {
      chart: {
        height: 100,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }

      }
    },
  }

  ////////// Polar Area Chart Data //////////
  const PolarArea = {
    series: [24, 33, 31, 27, 25, 22, 24],
    options: {
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 0.8
      },
      labels: ['Team 1', 'Team 2', 'Team 3', 'Team 4','Team 5'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },

  }
  /////////////// Dashboard Home Table Heading /////////////////
  const TableHeading = ['Name', 'Email', 'Address', 'Number']

  //////////////// Dashboard Home Table Body Data ////////////////////
  const TableBody = [
    { name: 'Akshat', email: 'akshat@gmail.com', address: '101 vikas nagar', number: '8987908821' },
    { name: 'Amit', email: 'amit@gmail.com', address: '', number: '7998508098' },
    { name: 'Raj', email: 'raj@gmail.com', address: '03 yamuna nagar', number: '9879070703' },
    { name: 'Kumkum', email: 'kumkum@gmail.com', address: '60 gandhi nagar', number: '7896987794' },
    { name: 'Mihir', email: 'mihir@gmail.com', address: '33 prem nagar', number: '8907800985' },
    { name: 'Deepraj', email: 'deepraj@gmail.com', address: '78 jaadu nagar', number: '8907890985' },
    { name: 'Ankit', email: 'ankit@gmail.com', address: '81 ujwal nagar', number: '8908890586' },
    { name: 'Jay', email: 'jay@gmail.com', address: '99 gomti nagar', number: '9798987698' },
  ]
  return (
    <div className=' flex flex-col gap-8 overflow-y-scroll scroll-m-1 py-4 px-4 bg-white h-full w-full'>
      <div className=' pt-3 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-8 gap-y-3'>
        {
          CardData.map((itm, indx) => {
            return <div key={indx} className=' rounded-md border   hover:shadow-lg transition-all duration-200 h-18 items-center flex-col gap-1 justify-center w-full flex bg-slate-50 p-2'>
              <span className=' font-semibold  text-[20px]'>{itm.name}</span>
              <span className=' font-semibold text-[18px]'>{itm.value}</span>
            </div>
          })
        }
      </div>
      <hr />
      <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        <div className=' flex-col h-full justify-center self-center  border-r-4 w-full flex items-center'>

          <Chart options={ChartData.options} series={ChartData.series} type="donut" width="350" height="320" />
        </div>
        <div className=' flex flex-col items-center border-r-4 w-full h-full'>

          <Chart options={ColumnChartData.options} series={ColumnChartData.series} type="bar" width="350" height='300' />
        </div>
        <div className=' w-full flex items-center justify-center  h-full'>

          <Chart options={PolarArea.options} series={PolarArea.series} type="polarArea" width="355" height='400' />
        </div>
      </div>
          <span className=' font-bold self-center'>Monthly Profit Ratios</span>
      <hr />
      <div className=' hidden md:block pb-2'>
        <DataTable Body={TableBody} Heading={TableHeading} />
      </div>
      <div className='block md:hidden pb-2'>
        {/* <DataTable Body={TableBody} Heading={TableHeading} /> */}
        <MobileTabel  Body={TableBody} Heading={TableHeading}/>
      </div>
    </div>
  )
}

export default Home;