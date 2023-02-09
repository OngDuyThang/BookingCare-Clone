import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DoctorSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModal: false,
            dataSchedule: {}
        }
    }

    async componentDidMount() {
        this.getArrDays();
        let allDays = this.getArrDays();
        if (allDays && allDays.length > 0) {
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allDays: allDays,
                allAvailableTime: res.schedules ? res.schedules : [],
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays();
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays();
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allDays: allDays,
                allAvailableTime: res.schedules ? res.schedules : [],
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = () => {
        let language = this.props.language;
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === 'vi') {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }
        return allDays;
    }

    handleChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value;
            let res = await getScheduleByDate(doctorId, date);
            if (res) {
                this.setState({
                    allAvailableTime: res.schedules ? res.schedules : []
                });
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataSchedule: time,
        })
    }

    closeModal = () => {
        this.setState({
            isOpenModal: false,
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModal, dataSchedule } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                    <div className="all-schedules">
                        <select onChange={(event) => this.handleChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item) => {
                                    return (<option value={item.value}>{item.label}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <React.Fragment>
                                    <div className="time-content-btn">
                                        {allAvailableTime.map((item) => {
                                            let timeDisplay = language === "vi" ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button onClick={() => this.handleClickScheduleTime(item)}
                                                    className={language === "vi" ? "btn-vi" : "btn-en"}>
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="free-booking"><FormattedMessage id="patient.detail-doctor.choose" /> <i className="far fa-hand-point-up"></i> <FormattedMessage id="patient.detail-doctor.free-booking" /></div>
                                </React.Fragment>
                                :
                                <div className="no-schedule"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal isOpenModal={isOpenModal}
                    closeModal={this.closeModal}
                    dataTime={dataSchedule}

                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        infoDoctorRedux: state.admin.infoDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getInfoDoctor: (inputData) => dispatch(actions.getInfoDoctor(inputData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
