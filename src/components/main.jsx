import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => state)
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        return (
            <div>
                hai
            </div>
        );
    }
}