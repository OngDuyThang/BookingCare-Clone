import actionTypes from './actionTypes';
import {
    getAllCode, createNewUser, getAllUsers, deleteUser, editUser, getTopDoctorHome
    , getAllDoctors, saveInfoDoctor, getDetailInfoDoctor, getDoctorExtraInfo, getAllSpecialty,
    getAllClinic
} from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let result = await getAllCode('GENDER');
            if (result) {
                dispatch(fetchGenderSuccess(result.result));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let result = await getAllCode('POSITION');
            if (result) {
                dispatch(fetchPositionSuccess(result.result));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let result = await getAllCode('ROLE');
            if (result) {
                dispatch(fetchRoleSuccess(result.result));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const addNewUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let result = await createNewUser(userData);
            if (result) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED,
})

export const getUsers = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let result = await getAllUsers(inputId);
            if (result) {
                dispatch(getUserSuccess(result.users));
            } else {
                dispatch(getUserFailed());
            }
        } catch (e) {
            dispatch(getUserFailed());
        }
    }
}

export const getUserSuccess = (users) => ({
    type: actionTypes.GET_USER_SUCCESS,
    data: users,
})

export const getUserFailed = () => ({
    type: actionTypes.GET_USER_FAILED,
})

export const deleteOneUser = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let result = await deleteUser(inputId);
            if (result) {
                dispatch(deleteUserSuccess());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editUserMode = (inputData) => {
    return (dispatch, getState) => {
        try {
            dispatch(editUserModeSuccess(inputData));
        } catch (e) {
            dispatch(editUserModeFailed());
        }
    }
}

export const editUserModeSuccess = (inputData) => ({
    type: actionTypes.EDIT_MODE_SUCCESS,
    data: inputData,
})

export const editUserModeFailed = () => ({
    type: actionTypes.EDIT_MODE_FAILED,
})

export const turnEditMode = () => {
    return (dispatch, getState) => {
        dispatch(turnEditModeSuccess());
    }
}

export const turnEditModeSuccess = () => ({
    type: actionTypes.TURN_EDIT_MODE,
})

export const editOneUser = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let result = await editUser(inputData);
            if (result) {
                dispatch(editUserSuccess());
            } else {
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const getTopDoctor = (inputLimit) => {
    return async (dispatch, getState) => {
        try {
            let result = await getTopDoctorHome(inputLimit);
            if (result) {
                dispatch(getTopDoctorSuccess(result.doctors));
            } else {
                dispatch(getTopDoctorFailed());
            }
        } catch (e) {
            dispatch(getTopDoctorFailed());
        }
    }
}

export const getTopDoctorSuccess = (doctors) => ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    data: doctors
})

export const getTopDoctorFailed = () => ({
    type: actionTypes.GET_TOP_DOCTOR_FAILED,
})

export const showAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let result = await getAllDoctors();
            if (result) {
                dispatch(showAllDoctorsSuccess(result.doctors));
            } else {
                dispatch(showAllDoctorsFailed());
            }
        } catch (e) {
            dispatch(showAllDoctorsFailed());
        }
    }
}

export const showAllDoctorsSuccess = (doctors) => ({
    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
    data: doctors
})

export const showAllDoctorsFailed = () => ({
    type: actionTypes.GET_ALL_DOCTOR_FAILED,
})

export const saveDetailDoctor = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let result = await saveInfoDoctor(inputData);
            if (result) {
                dispatch(saveDetailDoctorSuccess());
            } else {
                dispatch(saveDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(saveDetailDoctorFailed());
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
})

export const getInfoDoctor = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let result = await getDetailInfoDoctor(inputData);
            if (result) {
                dispatch(getInfoDoctorSuccess(result));
            } else {
                dispatch(getInfoDoctorFailed());
            }
        } catch (e) {
            dispatch(getInfoDoctorFailed());
        }
    }
}

export const getInfoDoctorSuccess = (doctor) => ({
    type: actionTypes.GET_INFO_DOCTOR_SUCCESS,
    data: doctor
})

export const getInfoDoctorFailed = () => ({
    type: actionTypes.GET_INFO_DOCTOR_FAILED,
})

export const showAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let result = await getAllCode('TIME');
            if (result) {
                dispatch(showAllScheduleSuccess(result.result));
            } else {
                dispatch(showAllScheduleFailed());
            }
        } catch (e) {
            dispatch(showAllScheduleFailed());
        }
    }
}

export const showAllScheduleSuccess = (schedules) => ({
    type: actionTypes.GET_SCHEDULE_TIME_SUCCESS,
    data: schedules
})

export const showAllScheduleFailed = () => ({
    type: actionTypes.GET_SCHEDULE_TIME_FAILED,
})

export const getRequireInfo = () => {
    return async (dispatch, getState) => {
        try {
            let price = await getAllCode('PRICE');
            let payment = await getAllCode('PAYMENT');
            let province = await getAllCode('PROVINCE');
            let specialty = await getAllSpecialty();
            let clinic = await getAllClinic();
            if (price && payment && province && specialty && clinic) {
                let info = {
                    resPrice: price.result,
                    resPayment: payment.result,
                    resProvince: province.result,
                    resSpecialty: specialty.data,
                    resClinic: clinic.data,
                }
                dispatch(getRequireInfoSuccess(info));
            } else {
                dispatch(getRequireInfoFailed());
            }
        } catch (e) {
            dispatch(getRequireInfoFailed());
        }
    }
}

export const getRequireInfoSuccess = (info) => ({
    type: actionTypes.GET_REQUIRE_INFO_SUCCESS,
    data: info,
})

export const getRequireInfoFailed = () => ({
    type: actionTypes.GET_REQUIRE_INFO_FAILED,
})

