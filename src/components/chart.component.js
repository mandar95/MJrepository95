import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

function ChartCard(props) {
    return (
        <div className="card my-forecastcard">
            <div className="card-body text-center">
                <Bar data={props.data}
                    options={{
                        title: {
                            display: true,
                            text: `Highest ${props.data.datasets[0].label}`,
                            fontSize: 15,
                            fontColor:'#e0e0e0'
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            fontColor:'#e0e0e0'
                        }
                    }} />
            </div>
        </div>
    )
}

export default class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formatedChartData: {}
        }
    }
    createChartData(forecastData, item) {
        const data = {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(209,76,192,0.6)"
                ]
            }]
        };
        data.datasets[0].label = item;
        for (var i = 0; i < forecastData.length; i++) {
            data.labels.push(new Date(forecastData[i].dt_txt).toDateString())
            data.datasets[0].data.push(forecastData[i].main[item])
        }
        return data;
    }
    render() {
        const forecastData = this.props.chartDetails.slice(0, 5);
        if (forecastData.length > 0) {
            const charts = ['humidity', 'sea_level'].map((item, i) => {
                return <ChartCard data={this.createChartData(forecastData, item)} key={forecastData[i].dt} />
            })
            return (
                <div className="card-deck">
                    {charts}
                </div>
            )
        }
        else {
            return (
                ''
            )
        }
    }
}