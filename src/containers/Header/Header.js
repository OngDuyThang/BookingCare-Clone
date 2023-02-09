import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whichLanguage: 'vi',
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        });
    }

    onClickLanguage = (whichLanguage) => {
        this.props.changeLanguageAppRedux(whichLanguage);
        this.setState({
            whichLanguage: whichLanguage,
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className="right-content">
                    <span className='welcome'><FormattedMessage id='homeheader.welcome' />, {userInfo && userInfo.firstName ? userInfo.firstName : ''}!</span>
                    <div className="header-languages">
                        <span className={this.state.whichLanguage == 'vi' ? 'language-on' : 'language-hide'} onClick={() => this.onClickLanguage(LANGUAGES.VI)}>VN</span>
                        <span className={this.state.whichLanguage == 'en' ? 'language-on' : 'language-hide'} onClick={() => this.onClickLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
