import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Register.scss';
import { FormattedMessage } from 'react-intl';
import { createNewUser } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            errMessage: '',
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleOnClickRegister = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            let data = await createNewUser(this.state);
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.consequence.errMessage,
                });
            } else {
                this.setState({
                    errMessage: data.consequence.errMessage,
                });
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
        }
    }

    handleOnClickEye = () => {
        if (this.state.isShowPassword) {
            this.setState({
                isShowPassword: false,
            })

        } else {
            this.setState({
                isShowPassword: true,
            })
        }
    }

    handleOnKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleOnClickRegister();
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Sign up</div>
                        <div className="col-12 form-group login-input">
                            <label>Email:</label>
                            <input type="text" className="form-control" placeholder="Enter email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="col-12 form-group password-input">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"} className="form-control" placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                />
                                <span onClick={() => this.handleOnClickEye()}><i class={this.state.isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"} ></i></span>
                            </div>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>First name:</label>
                            <input type="text" className="form-control" placeholder="Enter first name"
                                value={this.state.firstName}
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Last name:</label>
                            <input type="text" className="form-control" placeholder="Enter last name"
                                value={this.state.lastName}
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Address:</label>
                            <input type="text" className="form-control" placeholder="Enter address"
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Phone number:</label>
                            <input type="text" className="form-control" placeholder="Enter phone number"
                                value={this.state.phoneNumber}
                                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                onKeyDown={(event) => this.handleOnKeyDown(event)}
                            />
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn-login"
                                onClick={() => this.handleOnClickRegister()}>Sign up</button>
                        </div>
                        <div className="col-12 text-center login-with">
                            <span className="">Or Sign up with:</span>
                        </div>
                        <div className="col-12 social-login text-center">
                            <i class="fab fa-google col-1"></i>
                            <i class="fab fa-facebook-f col-1"></i>
                            <i class="fab fa-github col-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
