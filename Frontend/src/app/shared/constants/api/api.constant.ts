import { environment } from '../../../../environments/environment';

const { endpoint, localEndpoint } = environment;

export const API = {
    REGISTER: `${endpoint}auth/signup`,
    LOGIN: `${endpoint}auth/login`,
    FOODTYPE: `${localEndpoint}foodTypeSelection.json`,
    COLLEGE: `${localEndpoint}colleges.json`,
    REGISTER_PARTICIPANT: `${endpoint}dashboard/register`
}