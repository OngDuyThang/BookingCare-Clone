import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Suggest.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/specialty/background1.jpg'

class Suggest extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="section-suggest">
                <div className="suggest-content">
                    <Slider {...settings}>
                        <div className="slide-page">
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                        </div>
                        <div className="slide-page">
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                            <div className="slide-item">
                                <div className="item-image" style={{ background: `url(${specialtyImg})` }}></div>
                                <p className="item-title">Sample sample sample sample
                                    sample sample</p>
                                <ul className="item-content">
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                    <li>Sample sample sample</li>
                                </ul>
                                <span className="item-detail">XEM CHI TIẾT</span>
                            </div>
                        </div>
                        <div className="slide-page">
                            <h3>3</h3>
                        </div>
                        <div className="slide-page">
                            <h3>4</h3>
                        </div>
                        <div className="slide-page">
                            <h3>5</h3>
                        </div>
                        <div className="slide-page">
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggest);
