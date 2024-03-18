import Axios from "axios";

class ApiService {
    constructor() {
        this.axios = Axios.create();
        this.authInterceptor = this.authInterceptor.bind(this);
        this.axios.interceptors.response.use(null, this.authInterceptor);
        this.get = this.axios.get.bind(this.axios);
        this.post = this.axios.post.bind(this.axios);
    }

    async register(username, password, dateOfBirth, homeAddress, phoneNumber) {
        return this.axios.post(
            `${import.meta.env.VITE_API}/api/patient/register`,
            {
                username,
                password,
                dateOfBirth,
                homeAddress,
                phoneNumber,
            }
        );
    }

    async login(username, password) {
        console.log(import.meta.env.VITE_API);
        const response = await this.axios.post(
            `${import.meta.env.VITE_API}/api/patient/login`,
            {
                username,
                password,
            }
        );
        const { token } = response.data; // Change this line
        this.setAccessToken(token);
        return token;
    }

    // Admin API
    async user() {
        return this.axios.get(`${import.meta.env.VITE_API}/api/admin/users`);
    }

    async role() {
        return this.axios.get(`${import.meta.env.VITE_API}/api/admin/access`);
    }

    async createUser() {
        return this.axios.post(`${import.meta.env.VITE_API}/api/admin/users`);
    }

    async updateUser() {
        return this.axios.put(`${import.meta.env.VITE_API}/api/admin/users`);
    }

    async deleteUser() {
        return this.axios.delete(`${import.meta.env.VITE_API}/api/admin/users`);
    }

    async updateRole() {
        return this.axios.post(`${import.meta.env.VITE_API}/api/admin/access`);
    }

    async revokeAccess() {
        return this.axios.put(`${import.meta.env.VITE_API}/api/admin/access`);
    }

    async restoreAccess() {
        return this.axios.post(`${import.meta.env.VITE_API}/api/admin/restore`);
    }

    // Doctor API

    async viewAppDoctor() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/appointments`
        );
    }

    async updateAppStatus(appointmentId) {
        return this.axios.put(
            `${
                import.meta.env.VITE_API
            }/api/doctor/appointments/${appointmentId}`
        );
    }

    async cancelAppDoctor(appointmentId) {
        return this.axios.delete(
            `${
                import.meta.env.VITE_API
            }/api/doctor/appointments/${appointmentId}`
        );
    }

    async viewRecDoctor() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/patient-records`
        );
    }

    async viewHeal() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/healthIssue`
        );
    }

    async diagnose(patientRecordId) {
        return this.axios.put(
            `${
                import.meta.env.VITE_API
            }/api/doctor/patient-records/${patientRecordId}/health-status`
        );
    }

    async updateHeal() {
        return this.axios.post(
            `${import.meta.env.VITE_API}/api/doctor/healthIssue`
        );
    }

    async removeHeal() {
        return this.axios.delete(
            `${import.meta.env.VITE_API}/api/doctor/healthIssue`
        );
    }

    async viewPresDoctor() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/viewPrescriptions`
        );
    }

    async createPres(patientId) {
        return this.axios.post(
            `${
                import.meta.env.VITE_API
            }/api/doctor/createPrescription/${patientId}`
        );
    }

    async updatePres(id) {
        return this.axios.put(
            `${import.meta.env.VITE_API}/api/doctor/prescription/${id}`
        );
    }

    async cancelPres(id) {
        return this.axios.delete(
            `${import.meta.env.VITE_API}/api/doctor/prescription/${id}`
        );
    }

    // Patient API

    async viewAppPatient() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/appointments`
        );
    }

    async viewDoctor() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/doctors`
        );
    }

    async viewRecPatient() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/myRecords`
        );
    }

    async book(doctorId) {
        return this.axios.post(
            `${import.meta.env.VITE_API}/api/patient/appointments/${doctorId}`
        );
    }

    async updateApp(appointmentId) {
        return this.axios.put(
            `${
                import.meta.env.VITE_API
            }/api/patient/appointments/${appointmentId}`
        );
    }

    async cancelAppPatient(appointmentId) {
        return this.axios.delete(
            `${
                import.meta.env.VITE_API
            }/api/patient/appointments/${appointmentId}`
        );
    }

    async viewPresPatient() {
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/prescriptions`
        );
    }

    async authInterceptor(error) {
        error.config.retries = error.config.retries || {
            count: 0,
        };

        if (this.isUnAuthorizedError(error) && this.shouldRetry(error.config)) {
            await this.updateAccessToken(); // refresh the access token
            error.config.retries.count += 1;

            return this.axios.request(error.config); // if succeed re-fetch the original request with the updated accessToken
        }
        return Promise.reject(error);
    }

    isUnAuthorizedError(error) {
        return error.config && error.response && error.response.status === 401;
    }

    shouldRetry(config) {
        return config.retries.count < 3;
    }

    setAccessToken(accessToken) {
        this.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`; // assign all requests to use new accessToken
    }
}

export const apiService = new ApiService();
