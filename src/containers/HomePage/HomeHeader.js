import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from "react-router";

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            whichLanguage: 'vi',
        }
    }

    componentDidMount() {

    }

    onClickLanguage = (whichLanguage) => {
        this.props.changeLanguageAppRedux(whichLanguage);
        this.setState({
            whichLanguage: whichLanguage,
        })
    }

    handleReturnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="home-header-logo">
                            <button><i class="fas fa-bars"></i></button>
                            <div className="header-logo" onClick={() => this.handleReturnHome()}></div>
                        </div>
                        <div className="home-header-selection">
                            <div>
                                <span className='bold-span'><FormattedMessage id="homeheader.speciality" /></span><br />
                                <span><FormattedMessage id="homeheader.searchdoctor" /></span>
                            </div>
                            <div>
                                <span className='bold-span'><FormattedMessage id="homeheader.healthfacility" /></span><br />
                                <span><FormattedMessage id="homeheader.selectroom" /></span>
                            </div>
                            <div>
                                <span className='bold-span'><FormattedMessage id="homeheader.doctor" /></span><br />
                                <span><FormattedMessage id="homeheader.selectdoctor" /></span>
                            </div>
                            <div>
                                <span className='bold-span'><FormattedMessage id="homeheader.fee" /></span><br />
                                <span><FormattedMessage id="homeheader.checkhealth" /></span>
                            </div>
                        </div>
                        <div className="home-header-info">
                            <div className={this.state.whichLanguage === 'vi' ? 'language-vi' : 'language-vi language-hide'} onClick={() => this.onClickLanguage(LANGUAGES.VI)}>
                                <span>VN</span>
                            </div>
                            <div className={this.state.whichLanguage === 'en' ? 'language-en' : 'language-en language-hide'} onClick={() => this.onClickLanguage(LANGUAGES.EN)}>
                                <span>EN</span>
                            </div>
                            <a><i class="fas fa-info-circle"></i><FormattedMessage id="homeheader.support" /></a>
                        </div>
                    </div>
                </div>
                <div style={{ height: '80px' }}></div>
                {this.props.isShowBanner &&
                    <div className="home-header-banner">
                        <div className="banner-title">
                            <span><FormattedMessage id="banner.title1" /></span><br />
                            <span className="bold-span"><FormattedMessage id="banner.title2" /></span>
                        </div>
                        <div className="banner-search">
                            <i class="fas fa-search"></i>
                            <input type='text' value={'Tìm kiếm'}></input>
                        </div>
                        <div className="banner-selection">
                            <a>
                                <i class="fas fa-hospital"></i>
                                <span><FormattedMessage id="banner.selection1" /></span>
                            </a>
                            <a>
                                <i class="fas fa-mobile"></i>
                                <span><FormattedMessage id="banner.selection2" /></span>
                            </a>
                            <a>
                                <i class="fas fa-medkit"></i>
                                <span><FormattedMessage id="banner.selection3" /></span>
                            </a>
                            <a>
                                <i class="far fa-microscope"></i>
                                <span><FormattedMessage id="banner.selection4" /></span>
                            </a>
                            <a>
                                <i class="fas fa-head-side-brain"></i>
                                <span><FormattedMessage id="banner.selection5" /></span>
                            </a>
                            <a>
                                <i class="fas fa-tooth"></i>
                                <span><FormattedMessage id="banner.selection6" /></span>
                            </a>
                            <a>
                                <i class="fas fa-kidneys"></i>
                                <span><FormattedMessage id="banner.selection7" /></span>
                            </a>
                            <a>
                                <i class="fas fa-watch-fitness"></i>
                                <span><FormattedMessage id="banner.selection8" /></span>
                            </a>
                            <a>
                                <i class="far fa-procedures"></i>
                                <span><FormattedMessage id="banner.selection9" /></span>
                            </a>
                        </div>
                    </div>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
