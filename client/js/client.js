import { API_BASE_URL } from './config.js';

/**
 * Универсальный запрос к API.
 * @param {string} path - путь относительно базового URL, например '/tasks'
 * @param {object} options - { method, body, headers, signal }
 * @returns {Promise<any>} - распарсенный JSON ответа (или null для 204)
 */
export async function apiRequest(path, options = {}) {
    const {
        method = 'GET',
        body = null,
        headers = {},
        signal = null
    } = options;

    const url = `${API_BASE_URL}${path}`;

    const fetchOptions = {
        method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            ...headers
        },
        signal
    };

    if (body !== null && body !== undefined) {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);

    if (response.status === 204) return null;

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const message = data?.message || `Ошибка ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}