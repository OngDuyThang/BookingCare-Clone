import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    editData: {},
    isEditMode: false,
    topDoctors: [],
    allDoctors: [],
    infoDoctor: {},
    allSchedules: [],
    requiredInfo: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.GET_USER_SUCCESS:
            state.users = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.EDIT_MODE_SUCCESS:
            state.editData = action.data;
            state.isEditMode = true;
            return {
                ...state,
            }
        case actionTypes.EDIT_MODE_FAILED:
            state.editData = {};
            return {
                ...state,
            }
        case actionTypes.TURN_EDIT_MODE:
            state.isEditMode = false;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.GET_INFO_DOCTOR_SUCCESS:
            state.infoDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_INFO_DOCTOR_FAILED:
            state.infoDoctor = {};
            return {
                ...state,
            }
        case actionTypes.GET_SCHEDULE_TIME_SUCCESS:
            state.allSchedules = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_SCHEDULE_TIME_FAILED:
            state.allSchedules = [];
            return {
                ...state,
            }
        case actionTypes.GET_REQUIRE_INFO_SUCCESS:
            state.requiredInfo = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_REQUIRE_INFO_FAILED:
            state.requiredInfo = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;