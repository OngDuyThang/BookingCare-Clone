import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { LANGUAGES, CommonUtils } from '../../../utils';
import facilitiesImg from '../../../assets/facilities/background1.jpg'
import { withRouter } from "react-router";

class Doctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        }
    }

    async componentDidMount() {
        await this.props.getTopDoctor(12);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            let topDoctorsRedux = this.props.topDoctorsRedux;
            this.setState({
                topDoctors: topDoctorsRedux,
            });
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }

    render() {
        let language = this.props.language;
        let topDoctors = this.state.topDoctors;

        return (
            <div className="section-specialty section-doctors">
                <div className='section-header'>
                    <span className="section-title"><FormattedMessage id='homepage.out-standing-doctors' /></span>
                    <button className="more-button"><FormattedMessage id='homepage.more-info' /></button>
                </div>
                <div className="specialty-content">

                    <Slider {...this.props.settings}>
                        {topDoctors && topDoctors.length > 0 &&
                            topDoctors.map((item) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('Binary');
                                }
                                return (
                                    <div className="slide-item" onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className="item-image-doctor" style={{ background: `url(${imageBase64})` }}></div>
                                        <p className="item-title">{
                                            language === 'vi' ? item.positionData.valueVi : item.positionData.valueEn
                                        }, {item.lastName} {item.firstName}</p>
                                        <p className="item-descript"></p>
                                    </div>
                                );
                            })
                        }
                        <div className="slide-item">
                            <div className="item-image-doctor" ></div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: (inputLimit) => dispatch(actions.getTopDoctor(inputLimit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctors));
