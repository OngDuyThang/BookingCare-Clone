import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DetailDoctor.scss';
import * as actions from '../../../store/actions';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let inputId = this.props.match.params.id;
            await this.props.getInfoDoctor(inputId)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.infoDoctorRedux !== this.props.infoDoctorRedux) {
            let infoDoctorRedux = this.props.infoDoctorRedux;
            this.setState({
                infoDoctor: infoDoctorRedux,
            });
        }
    }

    render() {
        let infoDoctor = this.state.infoDoctor;
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (infoDoctor && infoDoctor.positionData) {
            nameVi = `${infoDoctor.positionData.valueVi} || ${infoDoctor.lastName} ${infoDoctor.firstName}`
            nameEn = `${infoDoctor.positionData.valueEn} || ${infoDoctor.firstName} ${infoDoctor.lastName}`
        }
        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            '' : window.location.href
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left" style={{ backgroundImage: `url(${infoDoctor.image ? infoDoctor.image : ''})` }}>

                        </div>
                        <div className="content-right">
                            <div className="up">
                                <p className="">{
                                    language === 'vi' ? nameVi : nameEn
                                }</p>
                            </div>
                            <div className="down">
                                {infoDoctor.Markdown && infoDoctor.Markdown.description &&
                                    <span>
                                        {infoDoctor.Markdown.description}
                                    </span>
                                }
                                <div className="like-share-plugin">
                                    <LikeAndShare
                                        dataHref={currentURL}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorIdFromParent={infoDoctor && infoDoctor.id ? infoDoctor.id : -1} />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfo doctorIdFromParent={infoDoctor && infoDoctor.id ? infoDoctor.id : -1} />
                        </div>
                    </div>
                    <div className="detail-info-doctor">
                        {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: infoDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor">
                        <Comment
                            dataHref={currentURL}
                            width={'100%'}
                        />
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
