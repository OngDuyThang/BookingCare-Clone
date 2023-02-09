import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUser, deleteUser, editUser } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

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
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }

    handleAddButton = () => {
        this.setState({
            isOpenCreate: true,
        })
    }

    toggleCreate = () => {
        this.setState({
            isOpenCreate: !this.state.isOpenCreate,
        })
    }

    handleCreateNewUser = async (data) => {
        try {
            await createNewUser(data);
            await this.getAllUsers();
            this.setState({
                isOpenCreate: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            await this.getAllUsers();
        } catch (e) {
            console.log(e);
        }
    }

    handleEditButton = (data) => {
        this.setState({
            isOpenEdit: true,
            editData: data,
        });
    }

    toggleEdit = () => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit
        })
    }

    handleEditUser = async (data) => {
        try {
            await editUser(data);
            await this.getAllUsers();
            this.setState({
                isOpenEdit: false,
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenCreate}
                    toggle={this.toggleCreate}
                    handleCreateNewUser={this.handleCreateNewUser}
                />
                {
                    this.state.isOpenEdit &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEdit}
                        toggle={this.toggleEdit}
                        editData={this.state.editData}
                        handleEditUser={this.handleEditUser}
                    />
                }
                <div>
                    <button className="btn btn-primary my-3 mx-3 px-2"
                        onClick={() => this.handleAddButton()}><i class="fas fa-plus mx-1"></i>Add new user</button>
                </div>
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
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditButton(item)}><i className="far fa-edit"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
