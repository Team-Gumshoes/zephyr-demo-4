import axios from 'axios';

const API_BASE_URL =  "https://alloraiapi-gateway-production.up.railway.app" //process.env.NX_PUBLIC_API_BASE_URL || 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

if (process.env.NX_PUBLIC_TEST_SLOW_API === "true") {
  apiClient.interceptors.request.use(req => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(req)
      }, 1500)
    })
  })
}


// TODO come back to auth strategy later - will use Supabase


// // Request interceptor for adding auth tokens
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Response interceptor for handling errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem('authToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   },
// );

export default apiClient;
