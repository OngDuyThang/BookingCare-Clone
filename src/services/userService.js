import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUser = (inputData) => {
    return axios.post('/api/create-new-user', inputData);
}

const deleteUser = (inputId) => {
    return axios.delete('/api/delete-user', { data: { id: inputId } });
}

const editUser = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCode = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHome = (inputLimit) => {
    return axios.get(`/api/top-doctor-home?limit=${inputLimit}`);
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveInfoDoctor = (inputData) => {
    return axios.post(`/api/save-info-doctors`, inputData);
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkSchedule = (inputData) => {
    return axios.post(`/api/bulk-create-schedule`, inputData);
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const getDoctorExtraInfo = (doctorId) => {
    return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`);
}

const getProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}

const createSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getDetailSpecialty = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getDetailClinic = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const getAllPatient = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCode,
    getTopDoctorHome,
    getAllDoctors,
    saveInfoDoctor,
    getDetailInfoDoctor,
    saveBulkSchedule,
    getScheduleByDate,
    getDoctorExtraInfo,
    getProfileDoctor,
    postPatientAppointment,
    postVerifyAppointment,
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialty,
    createClinic,
    getAllClinic,
    getDetailClinic,
    getAllPatient,
    postSendRemedy
}