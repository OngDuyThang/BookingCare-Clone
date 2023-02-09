import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/specialty/background1.jpg'

class Handbook extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="section-specialty section-handbook">
                <div className='section-header'>
                    <span className="section-title">Cẩm nang</span>
                    <button className="more-button">XEM THÊM</button>
                </div>
                <div className="specialty-content">

                    <Slider {...this.props.settings}>
                        <div className="slide-item">
                            <div className="item-image-handbook" style={{ background: `url(${specialtyImg})` }}></div>
                            <p className="item-title">Sample sample sample sample</p>
                        </div>
                        <div className="slide-item">
                            <div className="item-image-handbook" style={{ background: `url(${specialtyImg})` }}></div>
                            <p className="item-title">Sample sample sample sample</p>
                        </div>
                        <div className="slide-item">
                            <div className="item-image-handbook" style={{ background: `url(${specialtyImg})` }}></div>
                            <p className="item-title">Sample sample sample sample</p>
                        </div>
                        <div className="slide-item">
                            <div className="item-image-handbook" style={{ background: `url(${specialtyImg})` }}></div>
                            <p className="item-title">Sample sample sample sample</p>
                        </div>
                        <div className="slide-item">
                            <div className="item-image-handbook" style={{ background: `url(${specialtyImg})` }}></div>
                            <p className="item-title">Sample sample sample sample</p>
                        </div>
                        <div className="slide-item">
                            <div className="item-image-handbook" style={{ background: `url(${specialtyImg})` }}></div>
                            <p className="item-title">Sample sample sample sample</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
