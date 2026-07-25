const API_BASE_URL = "http://localhost:5000/api/v1";


const getHeaders = (isJson = true) => {
    const headers = {};
    if (isJson) {
        headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem("token");
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};




export const api = {
    async login(credentials) {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(credentials),
        });
        return res.json();
    },
    async register(userData) {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        return res.json();
    },

    async getBlogs(params = {}) {
        const query = new URLSearchParams();
        if (params.category && params.category !== "All") {
            query.append("category", params.category);
        }
        if (params.search) {
            query.append("search", params.search);
        }
        if (params.page) {
            query.append("page", params.page);
        }
        if (params.limit) {
            query.append("limit", params.limit);
        }

        const res = await fetch(`${API_BASE_URL}/blogs?${query.toString()}`);
        return res.json();
    },


};