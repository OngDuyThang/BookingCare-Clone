import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import facilitiesImg from '../../../assets/facilities/background1.jpg';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class Facilities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    }

    render() {
        let { dataClinics } = this.state;
        return (
            <div className="section-specialty section-facilities">
                <div className='section-header'>
                    <span className="section-title">Cơ sở y tế nổi bật</span>
                    <button className="more-button">TÌM KIẾM</button>
                </div>
                <div className="specialty-content">

                    <Slider {...this.props.settings}>
                        {dataClinics && dataClinics.length > 0 &&
                            dataClinics.map(item => {
                                return (
                                    <div className="slide-item" onClick={() => this.handleViewDetailClinic(item)}>
                                        <div className="item-image" style={{ background: `url(${item.image})` }}></div>
                                        <p className="item-title">{item.name}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="slide-item">
                            <div className="item-image"></div>
                            <p className="item-title"></p>
                        </div>
                    </Slider>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Facilities));
