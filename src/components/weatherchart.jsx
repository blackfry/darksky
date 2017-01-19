import React, { Component } from 'react'
import { AreaChart } from 'react-d3';

class WeatherChart extends Component {

    composeChartData = () => {
        if(typeof this.props.WEATHER !== 'undefined') {
            let weatherResults = this.props.WEATHER.weatherResults;
            let hourlyData = weatherResults.hourly.data;
            return hourlyData.map(({time, tempInC}) => ({'x': time, 'y': tempInC}))
        }
    };

    getTimeZone = () => {
         if(typeof this.props.WEATHER !== 'undefined') {
            let weatherResults = this.props.WEATHER.weatherResults;
            return weatherResults.timezone;
        }
    };

    render() {
        let composedValues = this.composeChartData();
        let timeZone = this.getTimeZone(); // for chart title
        var areaData = [
            {
                name: "temperature",
                values: composedValues
            },
    ]
        ;
        return (
            <div style={{ paddingLeft: '60px' }}>
                <AreaChart
                    data={areaData}
                    width={800} // react d3 requires an int, fix this
                    height={400}
                    yAxisTickInterval={{unit: 'temperature', interval: 1}}
                    yAxisLabel="Temperature"
                    xAxisTickInterval={{unit: 'hour', interval: 1}}
                    xAxisLabel={"48 hours forecast beginning  -   "+ new Date()}
                    title={timeZone}
                />
            </div>
        )
    }
}


export class WeatherChartContainer extends Component {
    render() {
        // provide an element to render safely when data loading is incomplete
        if(!this.props.WEATHER.weatherSuccess || typeof this.props.WEATHER === 'undefined')
            return (
                <div>

                </div>
            );

        return (
            <div>
                <WeatherChart {...this.props} />
            </div>
        )
    }
}