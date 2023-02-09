import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        if (this.props.editData && !_.isEmpty(this.props.editData)) {
            this.setState({
                id: this.props.editData.id,
                email: this.props.editData.email,
                password: 'password',
                firstName: this.props.editData.firstName,
                lastName: this.props.editData.lastName,
                address: this.props.editData.address,
            })
        }
    }

    handleOnChangeUserInput = (event, whichState) => {
        let copyState = { ...this.state };
        copyState[whichState] = event.target.value;

        this.setState({
            ...copyState,
        })
    }

    handleEditUser = async () => {
        if (this.checkInput()) {
            this.props.handleEditUser(this.state);
        }
    }

    checkInput = () => {
        let isValid = true;
        let arr = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isValid = false;
                alert('Please enter all required fields');
                break;
            }
        }
        return isValid;
    }

    render() {

        return (
            <div className="" >
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    className={'modal-user-container'}
                >
                    <ModalHeader toggle={this.props.toggle}>Edit user</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input type="text" disabled
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeUserInput(event, 'email')} />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password" disabled
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeUserInput(event, 'password')} />
                            </div>
                            <div className="input-container">
                                <label>First name</label>
                                <input type="text"
                                    value={this.state.firstName}
                                    onChange={(event) => this.handleOnChangeUserInput(event, 'firstName')} />
                            </div>
                            <div className="input-container">
                                <label>Last name</label>
                                <input type="text"
                                    value={this.state.lastName}
                                    onChange={(event) => this.handleOnChangeUserInput(event, 'lastName')} />
                            </div>
                            <div className="input-container">
                                <label>Address</label>
                                <input type="text"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeUserInput(event, 'address')} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="px-2" onClick={() => this.handleEditUser()}>Edit</Button>{' '}
                        <Button color="secondary" className="px-2" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
