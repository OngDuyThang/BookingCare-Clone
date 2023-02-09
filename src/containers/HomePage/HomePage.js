import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Suggest from './Section/Suggest';
import Specialty from './Section/Specialty';
import Facilities from './Section/Facilities';
import Doctors from './Section/Doctors';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <React.Fragment >
                <HomeHeader isShowBanner={true} />
                <Suggest />
                <Specialty settings={settings} />
                <Facilities settings={settings} />
                <Doctors settings={settings} />
                <Handbook settings={{
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1,

                }} />
                <About />
                <HomeFooter />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
