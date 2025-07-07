import { Employee } from '@/types/employee';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

export const listEmployees = () =>
  api.get<Employee[]>('/employee').then(res => res.data);

export const getEmployee = (id: number) =>
  api.get<Employee>(`/employee/${id}`).then(res => res.data);

export const createEmployee = (emp: Omit<Employee, 'id'>) =>
  api.post<Employee>('/employee', emp).then(res => res.data);

export const updateEmployee = (id: number, emp: Partial<Employee>) =>
  api.put<Employee>(`/employee/${id}`, emp).then(res => res.data);

export const deleteEmployee = (id: number) =>
  api.delete(`/employee/${id}`).then(res => res.status === 200);
