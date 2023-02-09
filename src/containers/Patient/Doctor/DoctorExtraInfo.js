import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DoctorExtraInfo.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getDoctorExtraInfo } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { lang } from 'moment/moment';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowPrice: false,
            extraInfo: {},
        }
    }

    async componentDidMount() {
        let info = await getDoctorExtraInfo(this.props.doctorIdFromParent);
        this.setState({
            extraInfo: info
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let info = await getDoctorExtraInfo(this.props.doctorIdFromParent);
            this.setState({
                extraInfo: info
            })
        }
    }

    showHidePrice = (status) => {
        this.setState({
            isShowPrice: status,
        })
    }

    render() {
        let { language } = this.props;
        let { isShowPrice, extraInfo } = this.state;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="patient.extra-doctor-info.address" /></div>
                    <div className="clinic-name">
                        {extraInfo && extraInfo.clinicName ? extraInfo.clinicName : ''}
                    </div>
                    <div className="clinic-address">
                        {extraInfo && extraInfo.clinicAddress ? extraInfo.clinicAddress : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowPrice === false &&
                        <div className='short-info'>
                            <FormattedMessage id="patient.extra-doctor-info.price" />
                            {extraInfo && extraInfo.priceTypeData && language === 'vi' &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfo.priceTypeData.valueVi}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'VND'} />
                            }
                            {extraInfo && extraInfo.priceTypeData && language === 'en' &&
                                <NumericFormat
                                    className='currency'
                                    value={extraInfo.priceTypeData.valueEn}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }
                            <span className="detail" onClick={() => this.showHidePrice(true)}><FormattedMessage id="patient.extra-doctor-info.detail" /></span>
                        </div>
                    }
                    {isShowPrice === true &&
                        <React.Fragment>
                            <div className="title-price"><FormattedMessage id="patient.extra-doctor-info.price" /></div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left"><FormattedMessage id="patient.extra-doctor-info.price" /></span>
                                    <span className="right">
                                        {extraInfo && extraInfo.priceTypeData && language === 'vi' &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'VND'} />
                                        }
                                        {extraInfo && extraInfo.priceTypeData && language === 'en' &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfo.priceTypeData.valueEn}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id="patient.extra-doctor-info.payment" />
                                {extraInfo && extraInfo.paymentTypeData && language === 'vi' ?
                                    extraInfo.paymentTypeData.valueVi : ''}
                                {extraInfo && extraInfo.paymentTypeData && language === 'en' ?
                                    extraInfo.paymentTypeData.valueEn : ''}
                            </div>
                            <div className="hide-price">
                                <span onClick={() => this.showHidePrice(false)}><FormattedMessage id="patient.extra-doctor-info.hide" /></span>
                            </div>
                        </React.Fragment>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
