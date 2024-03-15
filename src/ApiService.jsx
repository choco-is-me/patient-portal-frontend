// ApiService.js
import Axios from "axios";

class ApiService {
    constructor() {
        this.axios = Axios.create();
        this.axios.interceptors.response.use(null, this.authInterceptor);

        this.get = this.axios.get.bind(this.axios);
        this.post = this.axios.post.bind(this.axios);
    }

    async login(username, password) {
        const response = await this.axios.post(
            "https://localhost:3000/api/patient/login",
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
        return this.axios.get(`https://localhost:3000/api/admin/users`);
    }

    async role() {
        return this.axios.get(`https://localhost:3000/api/admin/access`);
    }

    async createUser() {
        return this.axios.post(`https://localhost:3000/api/admin/users`);
    }

    async updateUser() {
        return this.axios.put(`https://localhost:3000/api/admin/users`);
    }

    async deleteUser() {
        return this.axios.delete(`https://localhost:3000/api/admin/users`);
    }

    async updateRole() {
        return this.axios.post(`https://localhost:3000/api/admin/access`);
    }

    async revokeAccess() {
        return this.axios.put(`https://localhost:3000/api/admin/access`);
    }

    async restoreAccess() {
        return this.axios.post(`https://localhost:3000/api/admin/restore`);
    }

    // Doctor API

    async viewAppDoctor() {
        return this.axios.get(`https://localhost:3000/api/doctor/appointments`);
    }

    async updateAppStatus(appointmentId) {
        return this.axios.put(
            `https://localhost:3000/api/doctor/appointments/${appointmentId}`
        );
    }

    async cancelAppDoctor(appointmentId) {
        return this.axios.delete(
            `https://localhost:3000/api/doctor/appointments/${appointmentId}`
        );
    }

    async viewRecDoctor() {
        return this.axios.get(
            `https://localhost:3000/api/doctor/patient-records`
        );
    }

    async viewHeal() {
        return this.axios.get(`https://localhost:3000/api/doctor/healthIssue`);
    }

    async diagnose(patientRecordId) {
        return this.axios.put(
            `https://localhost:3000/api/doctor/patient-records/${patientRecordId}/health-status`
        );
    }

    async updateHeal() {
        return this.axios.post(`https://localhost:3000/api/doctor/healthIssue`);
    }

    async removeHeal() {
        return this.axios.delete(
            `https://localhost:3000/api/doctor/healthIssue`
        );
    }

    async viewPresDoctor() {
        return this.axios.get(
            `https://localhost:3000/api/doctor/viewPrescriptions`
        );
    }

    async createPres(patientId) {
        return this.axios.post(
            `https://localhost:3000/api/doctor/createPrescription/${patientId}`
        );
    }

    async updatePres(id) {
        return this.axios.put(
            `https://localhost:3000/api/doctor/prescription/${id}`
        );
    }

    async cancelPres(id) {
        return this.axios.delete(
            `https://localhost:3000/api/doctor/prescription/${id}`
        );
    }

    // Patient API

    async viewAppPatient() {
        return this.axios.get(
            `https://localhost:3000/api/patient/appointments`
        );
    }

    async viewDoctor() {
        return this.axios.get(`https://localhost:3000/api/patient/doctors`);
    }

    async viewRecPatient() {
        return this.axios.get(`https://localhost:3000/api/patient/myRecords`);
    }

    async book(doctorId) {
        return this.axios.post(
            `https://localhost:3000/api/patient/appointments/${doctorId}`
        );
    }

    async updateApp(appointmentId) {
        return this.axios.put(
            `https://localhost:3000/api/patient/appointments/${appointmentId}`
        );
    }

    async cancelAppPatient(appointmentId) {
        return this.axios.delete(
            `https://localhost:3000/api/patient/appointments/${appointmentId}`
        );
    }

    async viewPresPatient() {
        return this.axios.get(
            `https://localhost:3000/api/patient/prescriptions`
        );
    }

    // Auth Interceptor
    async updateAccessToken() {
        const { accessToken } = await this.axios.post(
            `https://localhost:3000/refresh-token`,
            {}
        );
        this.setAccessToken(accessToken);
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
