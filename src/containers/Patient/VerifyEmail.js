import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getVerifyEmail } from '../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { lang } from 'moment/moment';
import { postVerifyAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: '',
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyAppointment({
                token: token,
                doctorId: doctorId
            });
            if (res) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    statusVerify: false,
                    errCode: res && res.errCode ? res.errCode : -1,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { language } = this.props;
        let { statusVerify, errCode } = this.state;
        console.log('con cac', this.state)

        return (
            <React.Fragment>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>Loading....</div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className="info-booking">xac nhan thanh cong</div> :
                                <div className="info-booking">xac nhan khong thanh cong</div>
                            }
                        </div>
                    }
                    <div>verify email</div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
