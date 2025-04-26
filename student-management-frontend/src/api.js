import axios from 'axios';

const API_URL = 'https://student-management-backend-9vgm.onrender.com/api';

export const fetchStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
