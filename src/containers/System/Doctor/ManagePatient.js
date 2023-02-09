import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from '../../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getAllPatient, postSendRemedy } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { lang } from 'moment/moment';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import RemedyModal from '../Doctor/RemedyModal';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedy: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        await this.getDataPatient();
    }

    getDataPatient = async () => {
        let { userInfo } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatient({
            doctorId: userInfo.id, //43
            date: formatedDate,
        });
        if (res) {
            this.setState({
                dataPatient: res
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedy: true,
            dataModal: data
        })
    }

    handleRemedy = () => {

    }

    closeRemedy = () => {
        this.setState({
            isOpenRemedy: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res) {
            this.setState({
                isShowLoading: false,
            })
            this.closeRemedy()
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            })
        }
    }

    render() {
        let { language, userInfo } = this.props;
        let { currentDate, dataPatient, isOpenRemedy, dataModal } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title mt-3">
                            quan ly benh nhan
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group py-3">
                                <label>chon ngay kham</label>
                                <DatePicker
                                    onChange={this.handleDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className="col-12">
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thoi gian</th>
                                            <th>Ho ten</th>
                                            <th>Dia chi</th>
                                            <th>Gioi tinh</th>
                                            <th>Action</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === 'vi' ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === 'vi' ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className="mp-btn-confirm"
                                                                onClick={() => this.handleConfirm(item)}>xac nhan</button>
                                                            <button className="mp-btn-remedy"
                                                                onClick={() => this.handleRemedy(item)}>gui hoa don</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedy}
                        dataModal={dataModal}
                        closeRemedy={this.closeRemedy}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
