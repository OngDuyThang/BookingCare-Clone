import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import _ from 'lodash';
import { saveBulkSchedule } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    async componentDidMount() {
        await this.props.showAllDoctors();
        await this.props.showAllScheduleTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === 'vi' ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
            this.setState({
                allDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
            this.setState({
                allDoctors: dataSelect,
            });
        }
        if (prevProps.allSchedulesRedux !== this.props.allSchedulesRedux) {
            let allSchedules = this.props.allSchedulesRedux;
            if (allSchedules && allSchedules.length > 0) {
                allSchedules = allSchedules.map((item) => {
                    return { ...item, isSelected: false };
                })
            }
            this.setState({
                rangeTime: allSchedules,
            });
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        });

    }

    handleDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTime = (time) => {
        let rangeTime = this.state.rangeTime;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate || _.isEmpty(selectedDoctor)) {
            alert('Missing inputs!');
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate.getTime());

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => {
                return item.isSelected === true;
            })
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item) => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.timeType = item.keyMap;
                    result.push(obj);
                })
            } else {
                alert('Missing schedule!');
                return;
            }
        }
        let response = await saveBulkSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });
        if (response) {

        }
    }

    render() {
        let rangeTime = this.state.rangeTime;
        let language = this.props.language;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.allDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn active-click' : 'btn'}
                                            onClick={() => this.handleClickTime(item)}>
                                            {language === 'vi' ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary btn-save"
                            onClick={() => this.handleSaveSchedule()}
                        ><FormattedMessage id="manage-schedule.save" /></button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allSchedulesRedux: state.admin.allSchedules,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showAllDoctors: () => dispatch(actions.showAllDoctors()),
        showAllScheduleTime: () => dispatch(actions.showAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
