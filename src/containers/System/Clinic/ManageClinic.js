import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from '../../../store/actions';
import { lang } from 'moment/moment';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        });
    }

    onChangeSelectedImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSaveClinic = async () => {
        console.log(this.state)
        let res = await createClinic(this.state)
        if (res) {
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }
    }

    render() {
        let { language } = this.props;
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>quan li phong kham</div>
                <div className='all-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label className='pb-3'>ten phong kham</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='pb-3'>anh phong kham</label><br />
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.onChangeSelectedImage(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label className='pb-3'>dia chi phong kham</label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12 pt-3'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty"
                            onClick={() => this.handleSaveClinic()}>
                            save
                        </button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
