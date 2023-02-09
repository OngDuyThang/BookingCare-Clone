import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { getAllUsers, createNewUser, deleteUser, editUser } from '../../../services/userService';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { CRUD_ACTIONS } from '../../../../src/utils/constant'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: [],
            infoDoctor: {},
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            clinicName: '',
            clinicAddress: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }

    async componentDidMount() {
        await this.props.showAllDoctors();
        await this.props.getRequireInfo();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label = language === 'vi' ? labelVi : labelEn;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} VND`;
                    obj.label = language === 'vi' ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    obj.label = language === 'vi' ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux, "USERS");
            this.setState({
                allDoctors: dataSelect,
            });
        }
        if (prevProps.infoDoctorRedux !== this.props.infoDoctorRedux) {
            let infoDoctorRedux = this.props.infoDoctorRedux;
            this.setState({
                infoDoctor: infoDoctorRedux,
            });
        }
        if (prevProps.requiredInfo !== this.props.requiredInfo) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.requiredInfo;
            let price = this.buildDataInputSelect(resPrice, "PRICE");
            let payment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let province = this.buildDataInputSelect(resProvince, "PROVINCE");
            let specialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
            let clinic = this.buildDataInputSelect(resClinic, "CLINIC");
            this.setState({
                listPrice: price,
                listPayment: payment,
                listProvince: province,
                listSpecialty: specialty,
                listClinic: clinic
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux, "USERS");
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.requiredInfo;
            let price = this.buildDataInputSelect(resPrice, "PRICE");
            let payment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let province = this.buildDataInputSelect(resProvince, "PROVINCE");
            let specialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
            let clinic = this.buildDataInputSelect(resClinic, "CLINIC");
            this.setState({
                allDoctors: dataSelect,
                listPrice: price,
                listPayment: payment,
                listProvince: province,
                listSpecialty: specialty,
                listClinic: clinic
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    handleSaveContent = async () => {///////////////////////////////////////////
        let { hasOldData } = this.state;

        await this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }



    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        await this.props.getInfoDoctor(selectedOption.value);
        let markdown = this.state.infoDoctor.Markdown;

        let clinicAddress = '', clinicName = '', note = '',
            paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
            selectedPayment = '', selectedProvince = '', selectedPrice = '',
            selectedSpecialty = '', selectedClinic = '';
        let doctorInfo = this.state.infoDoctor.Doctor_Info;
        if (doctorInfo) {
            clinicAddress = doctorInfo.clinicAddress;
            clinicName = doctorInfo.clinicName;
            note = doctorInfo.note;
            paymentId = doctorInfo.paymentId;
            priceId = doctorInfo.priceId;
            provinceId = doctorInfo.provinceId;
            specialtyId = doctorInfo.specialtyId;
            clinicId = doctorInfo.clinicId;
            selectedPayment = listPayment.find((item) => {
                return item && item.value === paymentId;
            })
            selectedPrice = listPrice.find((item) => {
                return item && item.value === priceId;
            })
            selectedProvince = listProvince.find((item) => {
                return item && item.value === provinceId;
            })
            selectedSpecialty = listSpecialty.find((item) => {
                return item && item.value === specialtyId;
            })
            selectedClinic = listClinic.find((item) => {
                return item && item.value === clinicId;
            })
        }

        if (markdown) {
            this.setState({
                contentHTML: markdown.contentHTML ? markdown.contentHTML : '',
                contentMarkdown: markdown.contentMarkdown ? markdown.contentMarkdown : '',
                description: markdown.description ? markdown.description : '',
                hasOldData: true,
                clinicAddress: clinicAddress,
                clinicName: clinicName,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                clinicAddress: '',
                clinicName: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    }

    handleChangeSelectInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState
        })
    }

    handleChangeText = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    render() {
        let { hasOldData } = this.state;
        console.log(this.state.selectedSpecialty.value)
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.allDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className="form-control pb-3" rows="4"
                            onChange={(event) => this.handleChangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-detail row">
                    <div className="col-4 form-group">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select className="pb-3"
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select className="pb-3"
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select className="pb-3"
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className="col-4 form-group pb-4">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.clinicName" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleChangeText(event, 'clinicName')}
                            value={this.state.clinicName} />
                    </div>
                    <div className="col-4 form-group pb-4">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.clinicAddress" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleChangeText(event, 'clinicAddress')}
                            value={this.state.clinicAddress} />
                    </div>
                    <div className="col-4 form-group pb-4">
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleChangeText(event, 'note')}
                            value={this.state.note} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select className="pb-3"
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label className="py-2"><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select className="pb-3"
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            name='selectedClinic'
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor mt-3">
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className="save-content-doctor" onClick={() => this.handleSaveContent()}>
                    {hasOldData === true ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        infoDoctorRedux: state.admin.infoDoctor,
        requiredInfo: state.admin.requiredInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showAllDoctors: () => dispatch(actions.showAllDoctors()),
        saveDetailDoctor: (inputData) => dispatch(actions.saveDetailDoctor(inputData)),
        getInfoDoctor: (inputData) => dispatch(actions.getInfoDoctor(inputData)),
        getRequireInfo: () => dispatch(actions.getRequireInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
