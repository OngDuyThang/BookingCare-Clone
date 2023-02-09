import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from '../../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getDetailSpecialty, getAllCode } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { lang } from 'moment/moment';
import './DetailSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let inputId = this.props.match.params.id;
            let res = await getDetailSpecialty({
                id: inputId,
                location: 'ALL'
            });
            let resProvince = await getAllCode('PROVINCE');
            if (res && resProvince) {
                let data = res;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.result;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn quốc',
                    })
                }
                this.setState({
                    dataDetailSpecialty: res,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let inputId = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialty({
                id: inputId,
                location: location,
            });

            if (res) {
                let data = res;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { language } = this.props;
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className='detail-specialty-body'>

                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map(item => {
                                    return (
                                        <option value={item.keyMap}>
                                            {language === 'vi' ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item) => {
                            return (
                                <div className='each-doctor'>
                                    <div className='dt-content-left'>
                                        <div>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className='doctor-extra-info'>
                                            <DoctorExtraInfo doctorIdFromParent={item} />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
