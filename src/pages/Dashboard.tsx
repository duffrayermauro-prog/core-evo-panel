import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import { SessionCard } from '@/components/SessionCard';
import { QRCodeModal } from '@/components/QRCodeModal';
import { NewSessionModal } from '@/components/NewSessionModal';
import { Button } from '@/components/ui/button';
import { Session } from '@/types/session';
import { evolutionAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await evolutionAPI.getSessions();
      setSessions(data);
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      toast.error('Erro ao carregar sessões. Verifique a conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleViewQR = async (session: Session) => {
    setSelectedSession(session);
    setShowQRModal(true);
    setQrLoading(true);
    
    try {
      const data = await evolutionAPI.getQRCode(session.id);
      setQrCode(data.qrCode || data.base64);
      toast.success('QR Code carregado com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar QR Code:', error);
      toast.error('Erro ao carregar QR Code');
      setQrCode(null);
    } finally {
      setQrLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await evolutionAPI.deleteSession(sessionId);
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast.success('Sessão removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover sessão:', error);
      toast.error('Erro ao remover sessão');
    }
  };

  const handleCreateSession = async (name: string) => {
    try {
      setCreatingSession(true);
      const newSession = await evolutionAPI.createSession(name);
      setSessions([...sessions, newSession]);
      toast.success('Sessão criada com sucesso!');
      setShowNewSessionModal(false);
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
      toast.error('Erro ao criar sessão');
    } finally {
      setCreatingSession(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient-core">Dashboard</h1>
          <p className="text-muted-foreground">Gerencie suas sessões do Evolution API</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={loadSessions}
            disabled={loading}
            className="border-muted text-muted-foreground hover:bg-muted"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button
            size="lg"
            onClick={() => setShowNewSessionModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Sessão
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-core flex items-center justify-center">
            <Plus className="w-10 h-10 text-background" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Nenhuma sessão encontrada</h2>
          <p className="text-muted-foreground mb-6">Crie sua primeira sessão para começar</p>
          <Button
            size="lg"
            onClick={() => setShowNewSessionModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar Primeira Sessão
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onViewQR={handleViewQR}
              onDelete={handleDeleteSession}
            />
          ))}
        </div>
      )}

      <QRCodeModal
        open={showQRModal}
        onOpenChange={setShowQRModal}
        session={selectedSession}
        qrCode={qrCode}
        loading={qrLoading}
      />

      <NewSessionModal
        open={showNewSessionModal}
        onOpenChange={setShowNewSessionModal}
        onCreateSession={handleCreateSession}
        loading={creatingSession}
      />
    </div>
  );
}
