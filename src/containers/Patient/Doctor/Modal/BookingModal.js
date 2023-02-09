import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../../store/actions';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctor } from '../../../../services/userService'
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { postPatientAppointment } from '../../../../services/userService';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: [],
            doctorId: '',
            timeType: '',
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        await this.props.fetchGenders();
    }

    buildGenderData = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === 'vi' ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildGenderData(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildGenderData(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === 'vi' ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === 'vi' ?
                moment.unix(new Date(+dataTime.date / 1000)).format('dddd - DD/MM/YYYY')
                : moment.unix(new Date(+dataTime.date / 1000)).locale('en').format('ddd - MM/DD/YYYY');
            return (
                `${time} - ${date}`
            )
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === 'vi' ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return ''
    }

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true,
        })

        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });

        this.setState({
            isShowLoading: true,
        })

        if (res) {
            this.props.closeModal();
        }
    }

    render() {
        let { language, isOpenModal, closeModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }

        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
                <React.Fragment>
                    <Modal isOpen={isOpenModal}
                        size='lg'
                        className={'booking-modal-container'}
                        centered>
                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                                <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                                <span className='right' onClick={closeModal}><i className='fas fa-times'></i></span>
                            </div>
                            <div className='booking-modal-body'>
                                <div className='doctor-info'>
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescription={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                        <input className='form-control'
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleChangeInput(event, 'fullName')} />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                        <input className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleChangeInput(event, 'phoneNumber')} />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                        <input className='form-control'
                                            value={this.state.email}
                                            onChange={(event) => this.handleChangeInput(event, 'email')} />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                        <input className='form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleChangeInput(event, 'address')} />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                        <input className='form-control'
                                            value={this.state.reason}
                                            onChange={(event) => this.handleChangeInput(event, 'reason')} />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                        <DatePicker
                                            onChange={this.handleDatePicker}
                                            className="form-control"
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button className='btn-booking-confirm'
                                    onClick={() => this.handleConfirmBooking()}
                                ><FormattedMessage id='patient.booking-modal.verify' /></button>
                                <button className='btn-booking-cancel'><FormattedMessage id='patient.booking-modal.cancel' /></button>
                            </div>
                        </div>
                    </Modal>
                </React.Fragment>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
