import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

export default class Movie extends Component {
    render() {
        let data = this.props.movie;

        let poster = data.images.filter((image) => {
            if (image.type === 'POSTER') {
                return image;
            }
            return false;
        });

        return (
            <div className="movie-wrapper">
                <Link to={"/movies/" + data.id}>
                    <img src={poster[0].url} alt="Poster" />
                    <div className="movie-title"><span>{data.title}</span></div>
                </Link>
            </div >
        );
    }
}
