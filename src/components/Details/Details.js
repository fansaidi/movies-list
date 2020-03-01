import React, { Component } from 'react';
import MovieAttributes from './Attributes';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            images: null,
        };
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        try {
            let { params } = this.props.match;
            let response = await fetch('https://cdn-discover.hooq.tv/v1.2/discover/titles/' + params.id);
            let result = await response.json();

            console.log(result);
            let images = {};

            result.data.images.forEach((image) => {
                images[image.type] = image.url;
            });

            this.setState(() => {
                return {
                    data: result.data,
                    images: images,
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let data = this.state.data;
        let images = this.state.images

        return (
            (data && images) && (
                <>
                    <div className="details-bg" style={{
                        background: 'linear-gradient(270deg, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.8) 100%), url(' + images.BACKGROUND + ')',
                        backgroundSize: 'cover',
                        backgroundAttachment: 'fixed',
                    }}>
                    </div>
                    <div className="details-container">
                        <div className="details-header">
                            <span className="title">{data.title}</span>
                            <div className="details-meta">
                                <span>{data.meta.ageRating}</span>
                                <span>{data.meta.releaseYear}</span>
                                <span>{data.running_time_friendly}</span>
                            </div>
                        </div>
                        <div className="details-body">
                            <div className="col-1">
                                <img src={images.POSTER} alt="Movie poster" />
                            </div>
                            <div className="col-2">
                                <span>{data.description}</span>
                                <MovieAttributes label="Languages" attributes={data.languages} />
                                <MovieAttributes label="Audios" attributes={data.audios} />
                            </div>

                        </div>
                    </div>

                </>
            )
        );
    }
}

