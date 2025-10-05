import axios, { AxiosInstance } from 'axios';

const DEFAULT_API_URL = 'http://localhost:8080';
const API_URL_KEY = 'evolution_api_url';
const API_KEY = 'core12345'; // mesma chave usada no container Evolution

class EvolutionAPI {
  private api: AxiosInstance;

  constructor() {
    const baseURL = this.getApiUrl();
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        apikey: API_KEY,
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

  // 🔥 Novos endpoints compatíveis com Evolution v2.3.1
  async getInstances() {
    const response = await this.api.get('/instance/list');
    return response.data;
  }

  async createInstance(name: string) {
    const response = await this.api.post('/instance/create', { name });
    return respons
