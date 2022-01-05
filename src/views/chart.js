import React from "react";
import Chart from 'react-apexcharts';
import axios from 'axios';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],

            series:
                [
                    {
                        name: "Temperature",
                        data: [10, 41, 36, 60, 49, 62, 69, 91, 50]
                    },
                    {
                        name: "Air Humidity",
                        data: [11, 40, 35, 51, 46, 30, 40, 80, 90]
                    },
                    {
                        name: "Soil Moisture",
                        data: [8, 30, 45, 40, 50, 25, 90, 84, 54]
                    }
                ],

            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                }
            },

        };
    }

    componentDidMount() {
        let self = this;
        axios
            .get('http://103.7.40.93:8001/my-portal/tmt/system/history?page=0&size=10')
            .then(function (response) {
                self.setState({
                    dataSource: response.data,
                    series:
                        [
                            {
                                name: "Temperature",
                                data: self.getItemInObject(response.data, 'temperature'),
                            },
                            {
                                name: "Air Humidity",
                                data: self.getItemInObject(response.data, 'airHumidity'),
                            },
                            {
                                name: "Soil Moisture",
                                data: self.getItemInObject(response.data, 'groundMoisture'),
                            }
                        ],
                    options: {
                        chart: {
                            height: 350,
                            type: 'line',
                            zoom: {
                                enabled: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: self.getItemInObject(response.data, 'createdTime'),
                        }
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    getItemInObject = (arr, key) => {
        let newArr = [];
        console.log(arr);
        switch (key) {
            case 'airHumidity':
                for (let i = 0; i < arr.length; i++) {
                    newArr.push(arr[i].airHumidity);
                }
                break;
            case 'groundMoisture':
                for (let i = 0; i < arr.length; i++) {
                    newArr.push(arr[i].groundMoisture);
                }
                break;
            case 'temperature':
                for (let i = 0; i < arr.length; i++) {
                    newArr.push(arr[i].temperature);
                }
                break;
            case 'createdTime':
                for (let i = 0; i < arr.length; i++) {
                    newArr.push(arr[i].createdTime);
                }
                break;

            default:
                break;
        }

        return newArr;
    }


    render() {
        console.log(this.state);
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        );
    }
}

export default LineChart;
