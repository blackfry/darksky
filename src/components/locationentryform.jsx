import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Field, reduxForm } from 'redux-form'
import { RaisedButton, MenuItem } from 'material-ui'
import { renderSelectField } from './mui/SelectField';
import { locationArr, locationsObj } from '../redux/constants'
import {
    getWeather
} from '../redux/actions/actions';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


const required = value => value == null ? 'Required' : undefined

const provideCity = () => {
    return locationArr.map((city, i) => {
        return (
            <MenuItem key={i} value={city} primaryText={city}/>
        )
    })
};

const composeForecastCities = () => {
    return (
        <Field
            name="city"
            component={renderSelectField}
            label="Select City"
            validate={required}>
            { provideCity()}
        </Field>
    )
};


let SelectCityForm = props => {
    const {handleSubmit, pristine, submitting} = props;

    return (
        <MuiThemeProvider>
            <div style={{padding: '30px'}}>
                <form onSubmit={handleSubmit}>
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <div>
                                    { composeForecastCities() }
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <div>
                        <RaisedButton
                            label="Get Forecast"
                            primary={true}
                            style={{margin: '12px'}}
                            type="submit"
                            disabled={pristine || submitting}
                        />
                    </div>
                </form>
            </div>
        </MuiThemeProvider>
    )
};

SelectCityForm = reduxForm({
    form: 'selectCityForm',
})(SelectCityForm);


export class LocationFormContainer extends Component {

    asyncFormSubmitHandler = cityObj => {
        let selectedLocationCoords = locationsObj[cityObj.city];
        let dispatch = this.props.dispatch;
        dispatch(getWeather(selectedLocationCoords));

    };

    render() {

        if (this.props.WEATHER.weatherInitiated && !this.props.WEATHER.weatherSuccess) {
            return (
                <div style={{ margin: '200px' }}>
                    <h2>
                        ..loading
                    </h2>
                </div>
            )
        }

        return (
            <div style={{maxWidth: '320px'}}>
                <SelectCityForm
                    dispatch={this.props.dispatch}
                    onSubmit={ this.asyncFormSubmitHandler }
                />
            </div>
        )
    }
}
