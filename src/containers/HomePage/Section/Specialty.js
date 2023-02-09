import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/specialty/background1.jpg'
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className="section-specialty">
                <div className='section-header'>
                    <span className="section-title"><FormattedMessage id="homepage.popular" /></span>
                    <button className="more-button"><FormattedMessage id="homepage.more-info" /></button>
                </div>
                <div className="specialty-content">

                    <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item) => {
                                return (
                                    <div className="slide-item"
                                        onClick={() => this.handleViewDetailSpecialty(item)}>
                                        <div className="item-image" style={{ background: `url(${item.image})` }}></div>
                                        <p className="item-title">{item.name}</p>
                                    </div>
                                )
                            })}
                        <div className="slide-item">
                            <div className="item-image"></div>
                            <p className="item-title"></p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
