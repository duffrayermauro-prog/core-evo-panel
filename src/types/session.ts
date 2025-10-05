export type SessionStatus = 'online' | 'pending' | 'offline';

export interface Session {
  id: string;
  name: string;
  status: SessionStatus;
  qrCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SessionStatusResponse {
  status: SessionStatus;
  message?: string;
}

export interface QRCodeResponse {
  qrCode: string;
  base64?: string;
}
