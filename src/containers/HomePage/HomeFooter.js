import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import './HomeFooter.scss';
// import "slick-carousel/slick/slick-theme.css";

class HomeFooter extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="home-footer">
                <span>&copy; 2022 My Project</span>
                <div><a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
