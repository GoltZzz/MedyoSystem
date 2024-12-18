import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor to include auth token
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Handle unauthorized error (e.g., redirect to login)
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

// Inventory API endpoints
api.getInventory = () => api.get("/inventory");
api.addInventoryItem = (item) => api.post("/inventory", item);
api.updateInventoryItem = (id, item) => api.put(`/inventory/${id}`, item);
api.deleteInventoryItem = (id) => api.delete(`/inventory/${id}`);
api.getCategories = () => api.get("/inventory/categories"); // Get categories

// Category API endpoints
api.addCategory = (category) => api.post("/inventory/categories", category); // Add a new category
api.updateCategory = (oldName, category) =>
	api.put("/inventory/categories", { oldName, newName: category }); // Update an existing category
api.deleteCategory = (name) => api.delete(`/inventory/categories/${name}`); // Delete a category

export default api;
