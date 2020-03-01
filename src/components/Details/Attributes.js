import React, { Component, Fragment } from 'react';
import '../../App.css';

export default class MovieAttributes extends Component {
    render() {
        let attr = this.props.attributes;
        var attributes = [];

        for (var i in attr)
            attributes[i] = attr[i];

        return ((attr != null && attr.length > 0) &&
            <>
                <h4>{this.props.label ? this.props.label + " :" : ''}</h4>
                <div className="attributes-container">
                    {attributes.map((attribute, index) => (
                        <Fragment key={index}>
                            <span>{attribute}</span>
                        </Fragment>
                    ))}
                </div>
            </>
        );
    }
}

