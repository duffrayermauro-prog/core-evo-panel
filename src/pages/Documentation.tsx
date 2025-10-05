import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Webhook, Zap, Key, Database, Shield } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';

export default function Documentation() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-core mb-2">Documentação</h1>
          <p className="text-muted-foreground">
            Guia completo de integrações do Evolution Manager CORE Edition
          </p>
        </div>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="api" className="gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">API REST</span>
            </TabsTrigger>
            <TabsTrigger value="webhook" className="gap-2">
              <Webhook className="w-4 h-4" />
              <span className="hidden sm:inline">Webhooks</span>
            </TabsTrigger>
            <TabsTrigger value="zapier" className="gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Zapier</span>
            </TabsTrigger>
            <TabsTrigger value="auth" className="gap-2">
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">Autenticação</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Database</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>

          {/* API REST Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  API REST - Evolution API
                </CardTitle>
                <CardDescription>
                  Endpoints disponíveis para gerenciar sessões do WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Configuração Base</h3>
                  <CodeBlock
                    language="typescript"
                    code={`// Configure o endpoint base em Configurações
const API_BASE_URL = "http://localhost:8080";

// Ou use seu domínio personalizado
const API_BASE_URL = "https://sua-api.exemplo.com";`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Listar Sessões</h3>
                  <CodeBlock
                    language="bash"
                    code={`GET /api/sessions

# Exemplo de resposta:
{
  "sessions": [
    {
      "id": "session1",
      "name": "Atendimento 1",
      "status": "online",
      "qrcode": null
    }
  ]
}`}
                  />
                  <CodeBlock
                    language="typescript"
                    code={`// JavaScript/TypeScript
const response = await fetch('http://localhost:8080/api/sessions');
const data = await response.json();
console.log(data.sessions);`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Criar Nova Sessão</h3>
                  <CodeBlock
                    language="bash"
                    code={`POST /api/sessions/add
Content-Type: application/json

{
  "name": "MinhaSessionNova"
}

# Resposta:
{
  "success": true,
  "sessionId": "MinhaSessionNova"
}`}
                  />
                  <CodeBlock
                    language="typescript"
                    code={`// JavaScript/TypeScript
const response = await fetch('http://localhost:8080/api/sessions/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'MinhaSessionNova'
  })
});
const data = await response.json();`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Obter QR Code</h3>
                  <CodeBlock
                    language="bash"
                    code={`GET /api/sessions/:id/qr

# Exemplo: GET /api/sessions/session1/qr
# Resposta:
{
  "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Verificar Status</h3>
                  <CodeBlock
                    language="bash"
                    code={`GET /api/sessions/:id/status

# Resposta:
{
  "status": "online",
  "connected": true
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Remover Sessão</h3>
                  <CodeBlock
                    language="bash"
                    code={`DELETE /api/sessions/:id/delete

# Resposta:
{
  "success": true,
  "message": "Sessão removida com sucesso"
}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhook" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="w-5 h-5 text-primary" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure webhooks para receber eventos em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Configurar Webhook</h3>
                  <CodeBlock
                    language="bash"
                    code={`POST /api/webhook/config
Content-Type: application/json

{
  "url": "https://seu-dominio.com/webhook",
  "events": ["message", "status", "qr"]
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Eventos Disponíveis</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "message": "Nova mensagem recebida",
  "status": "Mudança de status da sessão",
  "qr": "Novo QR Code gerado",
  "connection": "Status de conexão alterado"
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Exemplo de Payload</h3>
                  <CodeBlock
                    language="json"
                    code={`{
  "event": "message",
  "sessionId": "session1",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "from": "5511999999999@c.us",
    "body": "Olá, tudo bem?",
    "type": "text"
  }
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Implementar Endpoint</h3>
                  <CodeBlock
                    language="typescript"
                    code={`// Node.js/Express exemplo
app.post('/webhook', (req, res) => {
  const { event, sessionId, data } = req.body;
  
  console.log('Evento recebido:', event);
  console.log('Sessão:', sessionId);
  console.log('Dados:', data);
  
  // Processar evento
  switch(event) {
    case 'message':
      handleNewMessage(data);
      break;
    case 'status':
      handleStatusChange(data);
      break;
    case 'qr':
      handleNewQR(data);
      break;
  }
  
  res.status(200).send('OK');
});`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Zapier Tab */}
          <TabsContent value="zapier" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Integração Zapier
                </CardTitle>
                <CardDescription>
                  Conecte com milhares de aplicativos via Zapier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Configurar Zap</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Crie um novo Zap no Zapier</li>
                    <li>Escolha "Webhooks by Zapier" como trigger</li>
                    <li>Selecione "Catch Hook"</li>
                    <li>Copie a URL do webhook fornecida</li>
                    <li>Configure no Evolution Manager</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Enviar Dados para Zapier</h3>
                  <CodeBlock
                    language="typescript"
                    code={`// Exemplo de envio para Zapier
const zapierWebhook = "https://hooks.zapier.com/hooks/catch/xxxxx/yyyyy/";

const sendToZapier = async (data: any) => {
  try {
    const response = await fetch(zapierWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        sessionId: data.sessionId,
        event: data.event,
        message: data.message,
        from: data.from
      })
    });
    
    console.log('Enviado para Zapier com sucesso');
  } catch (error) {
    console.error('Erro ao enviar para Zapier:', error);
  }
};`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Casos de Uso</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Enviar mensagens para Slack quando receber WhatsApp</li>
                    <li>Adicionar contatos ao Google Sheets automaticamente</li>
                    <li>Criar tarefas no Trello para cada nova mensagem</li>
                    <li>Enviar emails via Gmail para notificações importantes</li>
                    <li>Salvar mensagens no Notion ou Airtable</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Autenticação Tab */}
          <TabsContent value="auth" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  Autenticação
                </CardTitle>
                <CardDescription>
                  Proteja sua API com autenticação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">API Key</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Adicione o header de autenticação
GET /api/sessions
Authorization: Bearer YOUR_API_KEY_HERE

# Exemplo com curl:
curl -H "Authorization: Bearer YOUR_API_KEY_HERE" \\
  http://localhost:8080/api/sessions`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">JavaScript com Auth</h3>
                  <CodeBlock
                    language="typescript"
                    code={`const API_KEY = "sua-api-key-aqui";

const fetchWithAuth = async (endpoint: string, options = {}) => {
  return fetch(\`\${API_BASE_URL}\${endpoint}\`, {
    ...options,
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// Uso:
const sessions = await fetchWithAuth('/api/sessions');
const data = await sessions.json();`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Boas Práticas</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Nunca exponha sua API key no código frontend</li>
                    <li>Use variáveis de ambiente para armazenar keys</li>
                    <li>Implemente rate limiting para prevenir abuso</li>
                    <li>Rotacione suas keys periodicamente</li>
                    <li>Use HTTPS sempre em produção</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Integração com Database
                </CardTitle>
                <CardDescription>
                  Conecte com bancos de dados para persistir informações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">PostgreSQL</h3>
                  <CodeBlock
                    language="typescript"
                    code={`import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'evolution_db',
  user: 'your_user',
  password: 'your_password',
  port: 5432,
});

// Salvar mensagem
async function saveMessage(sessionId: string, message: any) {
  const query = \`
    INSERT INTO messages (session_id, from_number, body, timestamp)
    VALUES ($1, $2, $3, $4)
  \`;
  
  await pool.query(query, [
    sessionId,
    message.from,
    message.body,
    new Date()
  ]);
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">MongoDB</h3>
                  <CodeBlock
                    language="typescript"
                    code={`import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('evolution');
const messages = db.collection('messages');

// Salvar mensagem
async function saveMessage(sessionId: string, message: any) {
  await messages.insertOne({
    sessionId,
    from: message.from,
    body: message.body,
    timestamp: new Date(),
    type: message.type
  });
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Schema Exemplo</h3>
                  <CodeBlock
                    language="sql"
                    code={`-- PostgreSQL Schema
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) REFERENCES sessions(id),
  from_number VARCHAR(50),
  body TEXT,
  type VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT false
);

CREATE INDEX idx_messages_session ON messages(session_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segurança Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Melhores práticas de segurança para sua aplicação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">CORS Configuration</h3>
                  <CodeBlock
                    language="typescript"
                    code={`// Express.js exemplo
import cors from 'cors';

app.use(cors({
  origin: ['https://seu-dominio.com'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Rate Limiting</h3>
                  <CodeBlock
                    language="typescript"
                    code={`import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requests por IP
  message: 'Muitas requisições deste IP'
});

app.use('/api/', limiter);`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Validação de Dados</h3>
                  <CodeBlock
                    language="typescript"
                    code={`import { z } from 'zod';

const sessionSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter ao menos 3 caracteres')
    .max(50, 'Nome muito longo')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Use apenas letras, números, _ e -')
});

// Validar dados
try {
  const validData = sessionSchema.parse(req.body);
  // Processar dados validados
} catch (error) {
  res.status(400).json({ error: error.errors });
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Checklist de Segurança</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>✓ Use HTTPS em produção</li>
                    <li>✓ Implemente autenticação e autorização</li>
                    <li>✓ Valide e sanitize todas as entradas</li>
                    <li>✓ Configure CORS adequadamente</li>
                    <li>✓ Use rate limiting para prevenir abuso</li>
                    <li>✓ Mantenha dependências atualizadas</li>
                    <li>✓ Log de eventos de segurança</li>
                    <li>✓ Não exponha informações sensíveis em erros</li>
                    <li>✓ Use variáveis de ambiente para secrets</li>
                    <li>✓ Implemente monitoramento e alertas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Headers de Segurança</h3>
                  <CodeBlock
                    language="typescript"
                    code={`import helmet from 'helmet';

// Express.js
app.use(helmet());

// Ou configure manualmente:
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
