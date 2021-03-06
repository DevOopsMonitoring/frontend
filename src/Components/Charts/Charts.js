import React from 'react';
import axios from 'axios';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
  } from 'chart.js';
import './Charts.css';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

Array.prototype.dobav = function(newElement, n) {
    while(n--)
        this.push(newElement);
    return this;
}


export default function Charts({id}){
    const [chartData, setChartData] = React.useState([])

    React.useEffect(() => {
        getChartData()
        setInterval(function(){
            getChartData()
        }, 60000)
    }, [])

    const getChartData = () => {
        axios({
            method: 'get',
            url: `/api/v1/data/${id}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(response => {
            setChartData(response.data.data)
            if (response.data.data.length === 0)
                document.getElementById("text_load").style.visibility = "hidden"
            response.data.data.map(item => {
                var ctx = document.getElementById(item.name);
                var tmp = [].dobav(item.critical_value, item.time.length)
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: item.time,
                        datasets: [
                            {
                                data: item.values,
                                tension: 0.4,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.8)',
                                ],
                                borderColor: 'rgba(53,191,255,0.34)',
                                fill: '+1'
                            },
                            {
                                data: tmp,
                                borderColor: 'rgba(255, 99, 132)',
                                pointRadius: 0,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: item.name
                            },
                            legend: {
                                display: false,
                                labels: {
                                    color: 'rgb(255, 99, 132)'
                                }
                            }
                        }
                    },
                    onAnimationComplete: new function () {
                        document.getElementById("text_load").style.visibility = "hidden"
                    }
                });
            })
            
        })
        .catch(err => {
            refreshToken()
        })
    }
    
    const refreshToken = () => {
        axios({
            method: 'post',
            url: '/auth/refresh',
            withCredentials: false,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'),
              'Access-Control-Allow-Origin': '*'
          }
          })
            .then(response => {
              localStorage.setItem('access_token', response.data.access_token)
            })
    }

    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {chartData.map(item => {
                return(
                    <div style={{ width:800, height: 400, alignSelf: 'center', margin: 20}}>
                        <canvas id={item.name} style={{backgroundColor: 'white', borderRadius: 15}}/>
                    </div>
                )
            })}
        </div>
    )
}