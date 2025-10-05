import axios, { AxiosInstance } from 'axios';

const DEFAULT_API_URL = 'http://localhost:8080';
const API_URL_KEY = 'evolution_api_url';

class EvolutionAPI {
  private api: AxiosInstance;

  constructor() {
    const baseURL = this.getApiUrl();
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getApiUrl(): string {
    return localStorage.getItem(API_URL_KEY) || DEFAULT_API_URL;
  }

  setApiUrl(url: string): void {
    localStorage.setItem(API_URL_KEY, url);
    this.api.defaults.baseURL = url;
  }

  async getSessions() {
    const response = await this.api.get('/api/sessions');
    return response.data;
  }

  async createSession(name: string) {
    const response = await this.api.post('/api/sessions/add', { name });
    return response.data;
  }

  async getSessionStatus(id: string) {
    const response = await this.api.get(`/api/sessions/${id}/status`);
    return response.data;
  }

  async getQRCode(id: string) {
    const response = await this.api.get(`/api/sessions/${id}/qr`);
    return response.data;
  }

  async deleteSession(id: string) {
    const response = await this.api.delete(`/api/sessions/${id}/delete`);
    return response.data;
  }
}

export const evolutionAPI = new EvolutionAPI();
