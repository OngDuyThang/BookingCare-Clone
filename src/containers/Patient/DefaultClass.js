import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from '../../../store/actions';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getDefaultClass } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { lang } from 'moment/moment';

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { language } = this.props;
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
