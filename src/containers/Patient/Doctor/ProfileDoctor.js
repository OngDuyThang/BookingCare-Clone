import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from '../../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getProfileDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { lang } from 'moment/moment';
import './ProfileDoctor.scss';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: {},
        }
    }

    async componentDidMount() {
        let profile = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            profileData: profile
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        let res = await getProfileDoctor(id);
        if (res) {
            result = res;
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInfoDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === 'vi' ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === 'vi' ?
                moment.unix(new Date(+dataTime.date / 1000)).format('dddd - DD/MM/YYYY')
                : moment.unix(new Date(+dataTime.date / 1000)).locale('en').format('ddd - MM/DD/YYYY');
            return (
                <React.Fragment>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.bookingPrice' /></div>
                </React.Fragment>
            )
        }
    }

    render() {
        let { language, isShowDescription, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props;
        let { profileData } = this.state;
        let nameVi = '', nameEn = '';
        if (profileData && profileData.positionData) {
            nameVi = `${profileData.positionData.valueVi} || ${profileData.lastName} ${profileData.firstName}`
            nameEn = `${profileData.positionData.valueEn} || ${profileData.firstName} ${profileData.lastName}`
        }
        return (
            <div className="doctor-profile-container">
                <div className="intro-doctor">
                    <div className="content-left" style={{ backgroundImage: `url(${profileData.image ? profileData.image : ''})` }}>

                    </div>
                    <div className="content-right">
                        <div className="up">
                            <p className="">{
                                language === 'vi' ? nameVi : nameEn
                            }</p>
                        </div>
                        <div className="down">
                            {isShowDescription ?
                                <React.Fragment>
                                    {profileData.Markdown && profileData.Markdown.description &&
                                        <span>
                                            {profileData.Markdown.description}
                                        </span>
                                    }
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    {this.renderTimeBooking(dataTime)}
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
                {isShowLinkDetail &&
                    <div className="view-detail-doctor">
                        {/* <a href={`/detail-doctor/${doctorId}`}>xem them</a> */}
                        <Link to={`/detail-doctor/${doctorId}`}>xem them</Link>
                    </div>
                }
                {isShowPrice &&
                    <div className="price">
                        <FormattedMessage id="patient.extra-doctor-info.price" />
                        {profileData && profileData.Doctor_Info && language === 'vi' ?
                            <NumericFormat
                                className='currency'
                                value={profileData.Doctor_Info.priceTypeData.valueVi}
                                displayType="text"
                                thousandSeparator={true}
                                suffix={'VND'} /> : ''}
                        {profileData && profileData.Doctor_Info && language === 'en' ?
                            <NumericFormat
                                className='currency'
                                value={profileData.Doctor_Info.priceTypeData.valueEn}
                                displayType="text"
                                thousandSeparator={true}
                                suffix={'$'} /> : ''}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
