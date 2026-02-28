import axios from "axios";

export type JobStatus = "PENDING" | "PROCESSING" | "COMPLETED";

export interface Job {
  _id: string;
  title: string;
  description: string;
  status: JobStatus;
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const api = {
  getJobs: () => axios.get<Job[]>(`${API_BASE}/jobs`),
  getJob: (id: string) => axios.get<Job>(`${API_BASE}/jobs/${id}`),
  createJob: (data: { title: string; description: string }) =>
    axios.post<Job>(`${API_BASE}/jobs`, data),
};

