import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCode } from '../../../services/userService';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import TableManageUser from './TableManageUser';
import { turnEditMode } from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewUrl: '',
            isLightbox: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            isEditMode: false,
        }
    }

    async componentDidMount() {
        await this.props.getGenderStart();
        await this.props.getPositionStart();
        await this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderRedux = this.props.genderRedux;
            this.setState({
                genderArr: genderRedux,
                gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : ''
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positionRedux = this.props.positionRedux;
            this.setState({
                positionArr: positionRedux,
                position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : ''
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roleRedux = this.props.roleRedux;
            this.setState({
                roleArr: roleRedux,
                role: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : ''
            });
        }
        if (prevProps.editDataRedux !== this.props.editDataRedux) {
            let editDataRedux = this.props.editDataRedux;

            let imageBase64 = '';
            if (editDataRedux.image) {
                imageBase64 = new Buffer(editDataRedux.image, 'base64').toString('Binary');
            }

            this.setState({
                id: editDataRedux.id,
                email: editDataRedux.email,
                password: 'aaaaaaaa',
                firstName: editDataRedux.firstName,
                lastName: editDataRedux.lastName,
                address: editDataRedux.address,
                phoneNumber: editDataRedux.phoneNumber,
                gender: editDataRedux.gender,
                avatar: '',
                previewUrl: imageBase64,
                role: editDataRedux.roleId,
                position: editDataRedux.positionId,
                isEditMode: this.props.isEditModeRedux,
            });
        }
    }

    onChangeSelectedImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let url = URL.createObjectURL(file);
            this.setState({
                previewUrl: url,
                avatar: base64,
            })
        }
    }

    onClickZoom = () => {
        if (this.state.previewUrl !== '') {
            this.setState({
                isLightbox: true,
            })
        }
    }

    onChangeInput = (event, whichState) => {
        let copyState = { ...this.state };
        copyState[whichState] = event.target.value;

        this.setState({
            ...copyState,
        })
    }

    checkInput = () => {
        let isValid = true;
        let arr = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isValid = false;
                alert('Please enter all required fields');
                break;
            }
        }
        return isValid;
    }

    onClickSaveAndEdit = async () => {
        if (this.checkInput()) {
            if (this.state.isEditMode) {
                await this.props.editOneUser({
                    id: this.state.id,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    avatar: this.state.avatar,
                    roleId: this.state.role,
                    positionId: this.state.position,
                })
                this.setState({
                    isEditMode: false,
                })
                this.props.turnEditMode();
            } else {
                await this.props.addNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    avatar: this.state.avatar,
                    roleId: this.state.role,
                    positionId: this.state.position,
                })
            }
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: this.props.genderRedux[0].keyMap,
                position: this.props.positionRedux[0].keyMap,
                role: this.props.roleRedux[0].keyMap,
                previewUrl: '',
            })
        }
        await this.props.getUsers('ALL');
    }

    render() {
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { genderArr, positionArr, roleArr, isEditMode, gender, position, role } = this.state;
        console.log('this is', gender)
        return (
            <div className="user-redux-container">
                <div className="title">User Redux manage</div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id='manage-user.add' /></div>
                            <div className="col-12">{isLoadingGender ? 'Loading genders...' : ''}</div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.email' />
                                <input className='form-control' type='email' value={this.state.email} style={this.props.isEditModeRedux ? { pointerEvents: 'none', backgroundColor: '#ccc' } : {}} onChange={(event) => this.onChangeInput(event, 'email')} />
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.password' />
                                <input className='form-control' type='password' value={this.state.password} style={this.props.isEditModeRedux ? { pointerEvents: 'none', backgroundColor: '#ccc' } : {}} onChange={(event) => this.onChangeInput(event, 'password')} />
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.first-name' />
                                <input className='form-control' type='text' value={this.state.firstName} onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.last-name' />
                                <input className='form-control' type='text' value={this.state.lastName} onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.phone-number' />
                                <input className='form-control' type='text' value={this.state.phoneNumber} onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-9 mt-3">
                                <FormattedMessage id='manage-user.address' />
                                <input className='form-control' type='text' value={this.state.address} onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.gender' />
                                <select className="form-control" value={gender} onChange={(event) => this.onChangeInput(event, 'gender')}>
                                    {genderArr && genderArr.length > 0
                                        && genderArr.map((item, index) => {
                                            return (
                                                <option value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.position' />
                                <select className="form-control" value={position} onChange={(event) => this.onChangeInput(event, 'position')}>
                                    {positionArr && positionArr.length > 0
                                        && positionArr.map((item, index) => {
                                            return (
                                                <option value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.role' />
                                <select className="form-control" value={role} onChange={(event) => this.onChangeInput(event, 'role')}>
                                    {roleArr && roleArr.length > 0
                                        && roleArr.map((item, index) => {
                                            return (
                                                <option value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <FormattedMessage id='manage-user.image' />
                                <div className="preview-container" >
                                    <input id='previewImage' type='file' hidden
                                        onChange={(event) => this.onChangeSelectedImage(event)} />
                                    <label className="label-upload" htmlFor="previewImage">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image" style={{ background: `url(${this.state.previewUrl})` }} onClick={() => this.onClickZoom()}></div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className={isEditMode ? 'btn btn-warning' : 'btn btn-primary'} style={{ height: '40px', width: '60px' }} onClick={() => this.onClickSaveAndEdit()}>{
                                    isEditMode ? <FormattedMessage id='manage-user.edit' /> : <FormattedMessage id='manage-user.save' />
                                }</button>
                            </div>
                            <TableManageUser />
                            <div style={{ height: '50px' }}></div>
                        </div>
                    </div>
                </div>
                {this.state.isLightbox &&
                    <Lightbox
                        mainSrc={this.state.previewUrl}
                        onCloseRequest={() => this.setState({ isLightbox: false })}

                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        editDataRedux: state.admin.editData,
        isEditModeRedux: state.admin.isEditMode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        addNewUser: (data) => dispatch(actions.addNewUser(data)),
        getUsers: (inputId) => dispatch(actions.getUsers(inputId)),
        editOneUser: (inputData) => dispatch(actions.editOneUser(inputData)),
        turnEditMode: () => dispatch(actions.turnEditMode()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
