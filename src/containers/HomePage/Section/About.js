import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss';
import background1 from '../../../assets/about/background1.png';
import background2 from '../../../assets/about/background2.png';
import background3 from '../../../assets/about/background3.png';
import background4 from '../../../assets/about/background4.png';
import background8 from '../../../assets/about/background8.png';
import background6 from '../../../assets/about/background6.png';
import background7 from '../../../assets/about/background7.png';

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
                        <a href="#"><div className='links-img' style={{ background: `url(${background1})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${background2})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${background3})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${background4})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${background8})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${background6})` }}></div></a>
                        <a href="#"><div className='links-img' style={{ background: `url(${background7})` }}></div></a>
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
