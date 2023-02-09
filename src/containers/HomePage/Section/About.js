import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import a from '../../../assets/about/background1.png'

class About extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="section-specialty section-about">
                <div className='section-header'>
                    <span className="section-title">Truyền thông nói gì về BookingCare</span>
                </div>
                <div className="about-content">
                    <iframe width="400" height="280" src="https://www.youtube.com/embed/FyDQljKtWnI" title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div className='web-links'>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${a})` }}></div></a>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
