const API_URL_KEY = 'evolution_api_url';

function getApiUrl(): string {
  // Prioridade: 1. Variável de ambiente, 2. localStorage
  const envUrl = import.meta.env.VITE_EVOLUTION_API_URL;
  const storedUrl = localStorage.getItem(API_URL_KEY);
  return envUrl || storedUrl || '';
}

export function hasApiUrl(): boolean {
  return !!getApiUrl();
}

export function setApiUrl(url: string): void {
  localStorage.setItem(API_URL_KEY, url);
}

export async function getSessions() {
  const baseUrl = getApiUrl();
  if (!baseUrl) throw new Error('URL da API não configurada');
  
  const res = await fetch(`${baseUrl}/api/sessions`);
  if (!res.ok) throw new Error('Falha ao carregar sessões');
  return res.json();
}

export async function createSession(name: string) {
  const baseUrl = getApiUrl();
  if (!baseUrl) throw new Error('URL da API não configurada');
  
  const res = await fetch(`${baseUrl}/api/sessions/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Erro ao criar sessão');
  return res.json();
}

export async function deleteSession(id: string) {
  const baseUrl = getApiUrl();
  if (!baseUrl) throw new Error('URL da API não configurada');
  
  const res = await fetch(`${baseUrl}/api/sessions/${id}/delete`, { 
    method: 'DELETE' 
  });
  if (!res.ok) throw new Error('Erro ao excluir sessão');
  return res.json();
}

export async function getQRCode(id: string) {
  const baseUrl = getApiUrl();
  if (!baseUrl) throw new Error('URL da API não configurada');
  
  const res = await fetch(`${baseUrl}/api/sessions/${id}/qr`);
  if (!res.ok) throw new Error('Erro ao obter QR Code');
  return res.json();
}

export async function getSessionStatus(id: string) {
  const baseUrl = getApiUrl();
  if (!baseUrl) throw new Error('URL da API não configurada');
  
  const res = await fetch(`${baseUrl}/api/sessions/${id}/status`);
  if (!res.ok) throw new Error('Erro ao obter status');
  return res.json();
}
