import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { getAllUsers, createNewUser, deleteUser, editUser } from '../../../services/userService';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenCreate: false,
            isOpenEdit: false,
            editData: {}
        };
    }

    async componentDidMount() {
        await this.props.getUsers('ALL');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usersRedux !== this.props.usersRedux) {
            let usersRedux = this.props.usersRedux;
            this.setState({
                arrUsers: usersRedux,
            })
        }
    }

    onClickDelete = async (inputId) => {
        if (!this.props.isEditModeRedux) {
            await this.props.deleteUser(inputId);
            await this.props.getUsers('ALL');
        }
    }

    onClickEditMode = (inputData) => {
        this.props.editUserMode(inputData);
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container mt-3">
                <div className="users-table">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.onClickEditMode(item)}><i className="far fa-edit"></i></button>
                                                <button className="btn-delete" onClick={() => this.onClickDelete(item.id)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin.users,
        isEditModeRedux: state.admin.isEditMode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (inputId) => dispatch(actions.getUsers(inputId)),
        deleteUser: (inputId) => dispatch(actions.deleteOneUser(inputId)),
        editUserMode: (inputId) => dispatch(actions.editUserMode(inputId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
