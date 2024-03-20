import Axios from "axios";

class ApiService {
    constructor() {
        this.axios = Axios.create({
            withCredentials: true,
        });
        this.authInterceptor = this.authInterceptor.bind(this);
        this.axios.interceptors.response.use(null, this.authInterceptor);
        this.get = this.axios.get.bind(this.axios);
        this.post = this.axios.post.bind(this.axios);
        this.put = this.axios.put.bind(this.axios);
        this.delete = this.axios.delete.bind(this.axios);
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
        const response = await this.axios.post(
            `${import.meta.env.VITE_API}/api/patient/login`,
            {
                username,
                password,
            }
        );
        const { token } = response.data;
        this.setAccessToken(token);
        return token;
    }

    // Admin API
    async user(token) {
        this.setAccessToken(token);
        const response = await this.axios.get(
            `${import.meta.env.VITE_API}/api/admin/users`
        );
        return response.data;
    }

    async role(token) {
        this.setAccessToken(token);
        const response = await this.axios.get(
            `${import.meta.env.VITE_API}/api/admin/access`
        );
        return response.data;
    }

    async createUser(username, password, role, token) {
        this.setAccessToken(token);
        return this.axios.post(`${import.meta.env.VITE_API}/api/admin/users`, {
            username,
            password,
            role,
        });
    }

    async updateUser(_id, username, password, role, token) {
        this.setAccessToken(token);
        return this.axios.put(`${import.meta.env.VITE_API}/api/admin/users`, {
            _id,
            username,
            password,
            role,
        });
    }

    async deleteUser(_id, token) {
        this.setAccessToken(token);
        return this.axios.delete(
            `${import.meta.env.VITE_API}/api/admin/users`,
            {
                data: {
                    _id,
                },
            }
        );
    }

    async updateRole(userId, role, token) {
        this.setAccessToken(token);
        return this.axios.post(`${import.meta.env.VITE_API}/api/admin/access`, {
            userId,
            role,
        });
    }

    async revokeAccess(userId, permission, token) {
        this.setAccessToken(token);
        return this.axios.put(`${import.meta.env.VITE_API}/api/admin/access`, {
            userId,
            permission,
        });
    }

    async restoreAccess(userId, permission, token) {
        this.setAccessToken(token);
        return this.axios.post(
            `${import.meta.env.VITE_API}/api/admin/restore`,
            {
                userId,
                permission,
            }
        );
    }

    // Doctor API

    async viewAppDoctor(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/appointments`
        );
    }

    async updateAppStatus(appointmentId, token) {
        this.setAccessToken(token);
        return this.axios.put(
            `${
                import.meta.env.VITE_API
            }/api/doctor/appointments/${appointmentId}`
        );
    }

    async cancelAppDoctor(appointmentId, token) {
        this.setAccessToken(token);
        return this.axios.delete(
            `${
                import.meta.env.VITE_API
            }/api/doctor/appointments/${appointmentId}`
        );
    }

    async viewRecDoctor(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/patient-records`
        );
    }

    async viewHeal(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/healthIssue`
        );
    }

    async diagnose(patientRecordId, token) {
        this.setAccessToken(token);
        return this.axios.put(
            `${
                import.meta.env.VITE_API
            }/api/doctor/patient-records/${patientRecordId}/health-status`
        );
    }

    async updateHeal(token) {
        this.setAccessToken(token);
        return this.axios.post(
            `${import.meta.env.VITE_API}/api/doctor/healthIssue`
        );
    }

    async removeHeal(token) {
        this.setAccessToken(token);
        return this.axios.delete(
            `${import.meta.env.VITE_API}/api/doctor/healthIssue`
        );
    }

    async viewPresDoctor(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/doctor/viewPrescriptions`
        );
    }

    async createPres(patientId, token) {
        this.setAccessToken(token);
        return this.axios.post(
            `${
                import.meta.env.VITE_API
            }/api/doctor/createPrescription/${patientId}`
        );
    }

    async updatePres(id, token) {
        this.setAccessToken(token);
        return this.axios.put(
            `${import.meta.env.VITE_API}/api/doctor/prescription/${id}`
        );
    }

    async cancelPres(id, token) {
        this.setAccessToken(token);
        return this.axios.delete(
            `${import.meta.env.VITE_API}/api/doctor/prescription/${id}`
        );
    }

    // Patient API

    async viewAppPatient(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/appointments`
        );
    }

    async viewDoctor(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/doctors`
        );
    }

    async viewRecPatient(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/myRecords`
        );
    }

    async book(doctorId, token) {
        this.setAccessToken(token);
        return this.axios.post(
            `${import.meta.env.VITE_API}/api/patient/appointments/${doctorId}`
        );
    }

    async updateApp(appointmentId, token) {
        this.setAccessToken(token);
        return this.axios.put(
            `${
                import.meta.env.VITE_API
            }/api/patient/appointments/${appointmentId}`
        );
    }

    async cancelAppPatient(appointmentId, token) {
        this.setAccessToken(token);
        return this.axios.delete(
            `${
                import.meta.env.VITE_API
            }/api/patient/appointments/${appointmentId}`
        );
    }

    async viewPresPatient(token) {
        this.setAccessToken(token);
        return this.axios.get(
            `${import.meta.env.VITE_API}/api/patient/prescriptions`
        );
    }

    async authInterceptor(error) {
        error.config.retries = error.config.retries || {
            count: 0,
        };

        if (this.isUnAuthorizedError(error) && this.shouldRetry(error.config)) {
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
