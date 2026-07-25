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
  // Auth
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

  async getProfile() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Blogs
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

  async getBlogById(id) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
    return res.json();
  },

  async getMyBlogs(params = {}) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.limit) query.append("limit", params.limit);

    const res = await fetch(`${API_BASE_URL}/blogs/my-blogs?${query.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async createBlog(blogData) {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(blogData),
    });
    return res.json();
  },

  async updateBlog(id, blogData) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(blogData),
    });
    return res.json();
  },

  async deleteBlog(id) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },

  async toggleLikeBlog(id) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}/like`, {
      method: "POST",
      headers: getHeaders(),
    });
    return res.json();
  },

  // Comments
  async getComments(blogId) {
    const res = await fetch(`${API_BASE_URL}/comments/${blogId}`);
    return res.json();
  },

  async addComment(blogId, content) {
    const res = await fetch(`${API_BASE_URL}/comments/${blogId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ content }),
    });
    return res.json();
  },

  async deleteComment(commentId) {
    const res = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },
};
