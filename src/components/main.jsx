import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocationFormContainer } from './locationentryform';
import { WeatherChartContainer } from './weatherchart'


@connect((state) => state)
export default class Main extends Component {

    render() {
        return (
            <div>
                <div style={{ paddingLeft: '50px',  marginBottom: '-35px' }}>
                     <h3>Weather Forecast Powered by Dark Sky</h3>
                 </div>
                <LocationFormContainer {...this.props} />
                <WeatherChartContainer {...this.props} />
            </div>
        );
    }
}