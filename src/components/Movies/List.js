import React, { Component, Fragment } from 'react';
import '../../App.css';
import MoviesCarousel from './Carousel';

export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            page: 1,
            totalPages: 0,
            isLoading: false,
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.loadData(this.state.page);
        document.addEventListener('scroll', this.handleScroll);
    }

    async loadData(page) {
        try {
            let response = await fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=' + page + '&perPage=20');
            let result = await response.json();

            let movies = result.data.filter(movie => {
                if (movie.type === "Multi-Title-Manual-Curation") {
                    return movie;
                }
                return false;
            });

            this.setState((state) => {
                return {
                    movies: [...state.movies, ...movies],
                    totalPages: result.pagination.totalPages,
                    page: page,
                };
            });
        } catch (error) {
            console.log(error);
        }

    }

    handleScroll() {
        if (
            (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
            || this.state.page >= this.state.totalPages
        ) return;

        this.loadData(this.state.page + 1);
    }

    render() {
        return (
            (this.state.movies) && (
                <div className="container">{
                    this.state.movies.map((movie, index) => (
                        <Fragment key={index}>
                            <h3>{movie.row_name} <span className="sub-title">{movie.data.length} Items</span></h3>
                            <MoviesCarousel movies={movie.data} />
                        </Fragment>
                    ))
                }
                </div>
            )
        );
    }
}
