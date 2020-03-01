import React, { Component, Fragment } from 'react';
import '../../App.css';
import Movie from './Movie';

export default class MoviesCarousel extends Component {
    render() {
        let movies = this.props.movies;

        return (
            <div className="carousel-wrapper">
                {(movies) && (
                    movies.map((movie, index) => (
                        <Fragment key={index}>
                            <Movie movie={movie} />
                        </Fragment>
                    ))
                )}
            </div>
        );
    }
}

