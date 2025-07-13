import axios from 'axios';
import qs from 'qs';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': `${import.meta.env.VITE_API_TOKEN}`
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
});

const apiService = {
    get: async <T>(url: string, params?: object): Promise<T> => {
        const response = await apiClient.get<T>(url, {params});
        return response.data;
    },
};

export default apiService;