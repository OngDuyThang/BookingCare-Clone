import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './RemedyModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { LANGUAGES, CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onChangeSelectedImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    render() {
        let { language, isOpenModal, closeRemedy, dataTime, dataModal, sendRemedy } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={isOpenModal}
                    size='lg'
                    className={'booking-modal-container'}
                    centered>
                    <div className='modal-header'>
                        <h5 className='modal-title'>gui hoa don kham benh thanh cong</h5>
                        <button>
                            <span onClick={closeRemedy}>x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <div className="form-group">
                                    <label>email benh nhan</label>
                                    <input type="email" className="form-control" value={this.state.email}
                                        onChange={(event) => this.handleChangeEmail(event)} />
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <div className="form-group">
                                    <label>chon file don thuoc</label>
                                    <input type="file" className="form-control"
                                        onChange={(event) => this.onChangeSelectedImage(event)} />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                        <Button color="secondary" onClick={closeRemedy}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
