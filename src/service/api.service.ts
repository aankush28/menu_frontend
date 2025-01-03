import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = '/api'; // Replace with your actual API base URL

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the service methods
const apiService = {
  // Create (POST)
  create: async <T>(endpoint: string, data: T): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Error while creating resource');
      }
      throw new Error('Unknown error occurred while creating resource');
    }
  },
  // Read (GET)
  fetchAll: async (endpoint: string): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error((error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || 'Error while fetching data');
      }
      throw new Error('Unknown error occurred while fetching data');
    }
  },
  fetchById: async (endpoint: string, id: string): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error((error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || 'Error while fetching data by ID');
      }
      throw new Error('Unknown error occurred while fetching data by ID');
    }
  },  // Update (PUT)
  update: async <T>(endpoint: string, id: string, data: T): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.put(`${endpoint}/${id}`, data);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error((error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || 'Error while updating resource');
      }
      throw new Error('Unknown error occurred while updating resource');
    }
  },  // Delete (DELETE)
  delete: async (endpoint: string, id: string): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${id}`);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error((error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || 'Error while deleting resource');
      }
      throw new Error('Unknown error occurred while deleting resource');
    }
  },
};
export default apiService;
