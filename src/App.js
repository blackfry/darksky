import React, {Component} from 'react';
import './App.css';
import Main from './components/main'
var $ = require('jquery');
import { connect } from 'react-redux';
import { correctHeight, detectBody } from './Helpers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'rxjs';

// https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();


@connect((state) => state)
class App extends Component {
    render() {
        return (
            //https://github.com/callemall/material-ui/issues/4030
            <MuiThemeProvider>
                <div id="wrapper">
                    <Main {...this.props} />
                </div>
            </MuiThemeProvider>
        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

export default App;
